import { generateID } from "../utils.js";
import Observable from "../framework/observable.js";
import { UpdateType, UserAction } from "../const.js";

export default class TasksModel extends Observable{
    #tasksApiService = null;
    #boardtasks = [];
    #isLoaded = false;

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
          const tasks = await this.#tasksApiService.tasks;
          this.#boardtasks = tasks;
        } catch(err) {
          this.#boardtasks = [];
        }
        this.#isLoaded = true;
        this._notify(UpdateType.INIT);
    }
     
     

    get tasks() {
        return this.#boardtasks;
    }

    get isLoaded() {
        return this.#isLoaded;
    }

    async addTask(title) {
        const newTask = {
          id: generateID(),
          title,
          status: 'backlog',
        };
        try {
          const createdTask = await this.#tasksApiService.addTask(newTask);
          this.#boardtasks.push(createdTask);
          this._notify(UserAction.ADD_TASK, createdTask);
          return createdTask;
        } catch (err) {
          console.error('Ошибка при добавлении задачи на сервер:', err);
          throw err;
        }
    }     

    async clearTrashBin() {
        const trashBinTasks = this.#boardtasks.filter(task => task.status === 'trash-bin');

        try {
            await Promise.all(trashBinTasks.map(task => this.#tasksApiService.deleteTask(task.id)));

            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash-bin');
            this._notify(UserAction.DELETE_TASK, {status: 'trash-bin'});
        } catch (err) {
            console.error('Ошибка при удалении задач из корзины на сервере:', err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus, insertIndex = 0) {
        const taskIndex = this.#boardtasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) return;

        const task = this.#boardtasks[taskIndex];
        const previousStatus = task.status;

        let count = 0;
        let insertPos = this.#boardtasks.length;

        for (let i = 0; i < this.#boardtasks.length; i++) {
            if (this.#boardtasks[i].status === newStatus) {
                if (count === insertIndex) {
                    insertPos = i;
                    break;
                }
                count++;
            }
        }

        const [movedTask] = this.#boardtasks.splice(taskIndex, 1);
        movedTask.status = newStatus;

        if (taskIndex < insertPos) {
            insertPos -= 1;
        }
        this.#boardtasks.splice(insertPos, 0, movedTask);

        try {
            const updatedTask = await this.#tasksApiService.updateTask(task);
            Object.assign(task, updatedTask);
            this._notify(UserAction.UPDATE_TASK, updatedTask);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи на сервере:', err);
            task.status = previousStatus;
            throw err;
        }
    }
}
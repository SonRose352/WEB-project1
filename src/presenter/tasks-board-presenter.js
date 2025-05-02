import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardTaskComponent from "../view/boardtask-component.js";
import TrashBinEmptyingButtonComponent from "../view/trash-bin-emptying-button.js";
import StubTaskComponent from "../view/stub-task-component.js";
import LoadingViewComponent from "../view/loading-view-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel, UserAction } from "../const.js";

export default class TaskBoardPresenter {

    #boardContainer = null;
    #tasksModel = null;

    #boardTaskComponent = new BoardTaskComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));
        this.#renderBoard();
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #handleModelEvent(event, payload) {
        switch (event) {
            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                break;
        }
    }

    #clearBoard() {
        this.#boardTaskComponent.element.innerHTML = '';
    }

    #renderBoard() {
        render(this.#boardTaskComponent, this.#boardContainer, RenderPosition.BEFOREEND);

        Object.values(Status).forEach(status => {
            this.#renderTasksList(status);
        });
    }

    #renderTasksList(status) {
        const filteredTasks = this.tasks.filter(task => task.status === status);

        const taskListComponent = new TaskListComponent(StatusLabel[status], status, this.#handleTaskDrop.bind(this));
        render(taskListComponent, this.#boardTaskComponent.element);

        const taskListElement = taskListComponent.taskListElement;

        if (!this.#tasksModel.isLoaded) {
            this.#renderLoadingView(taskListElement);
        } else {
            if (filteredTasks.length === 0) {
                this.#renderStubTask(taskListElement);
            } else {
                filteredTasks.forEach(task => {
                    this.#renderTask(task, taskListElement);
                });
            }
    
            if (status === Status.TRASHBIN) {
                this.#renderTrashBinButton(taskListComponent.element);
            }
        }
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent(task);
        render(taskComponent, container, RenderPosition.BEFOREEND);
    }

    #renderStubTask(container) {
        const stubTaskComponent = new StubTaskComponent();
        render(stubTaskComponent, container, RenderPosition.BEFOREEND);
    }

    #renderTrashBinButton(container) {
        const hasTrashTasks = this.tasks.some(task => task.status === Status.TRASHBIN);
    const trashBinButtonComponent = new TrashBinEmptyingButtonComponent({
        onClick: this.#handleClearTrashBin.bind(this),
        isDisabled: !hasTrashTasks
    });
    render(trashBinButtonComponent, container, RenderPosition.BEFOREEND);
    }

    #renderLoadingView(container) {
        const loadingView = new LoadingViewComponent();
        render(loadingView, container, RenderPosition.BEFOREEND);
    }

    async createTask() {
        const taskTitle = document.querySelector('.add-new-task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.add-new-task-input').value = '';
        } catch (err) {
            console.error('Ошибка при создании задачи', err);
        }

        document.querySelector('.add-new-task-input').value = '';
    }

    async #handleClearTrashBin() {
        try {
            await this.#tasksModel.clearTrashBin();
        } catch (err) {
            console.error('Ошибка при очистке корзины', err);
        }
    }

    async #handleTaskDrop(taskId, newStatus, insertIndex) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus, insertIndex);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи:', err);
        }
    }

    async init() {

        await this.#tasksModel.init();

        this.#clearBoard();
        this.#renderBoard();

    }
}
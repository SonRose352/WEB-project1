import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardTaskComponent from "../view/boardtask-component.js";
import TrashBinEmptyingButtonComponent from "../view/trash-bin-emptying-button.js";
import StubTaskComponent from "../view/stub-task-component.js";
import { render, RenderPosition } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";

export default class TaskBoardPresenter {

    #boardContainer = null;
    #tasksModel = null;

    #boardTaskComponent = new BoardTaskComponent();

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelChange.bind(this));
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    #handleModelChange() {
        this.#clearBoard();
        this.#renderBoard();
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
        onClick: this.clearTrashBin.bind(this),
        isDisabled: !hasTrashTasks
    });
    render(trashBinButtonComponent, container, RenderPosition.BEFOREEND);
    }

    createTask() {
        const taskTitle = document.querySelector('.add-new-task-input').value.trim();
        if (!taskTitle) {
            return;
        }

        this.#tasksModel.addTask(taskTitle);

        document.querySelector('.add-new-task-input').value = '';
    }

    clearTrashBin() {
        this.#tasksModel.clearTrashBin();
        this.#tasksModel._notifyObservers();
    }

    #handleTaskDrop(taskId, newStatus, insertIndex) {
        this.#tasksModel.updateTaskStatus(taskId, newStatus, insertIndex);
    }

    init() {

        this.#renderBoard();

    }
}
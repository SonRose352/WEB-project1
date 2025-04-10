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

    #boardTasks = [];

    constructor({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    #renderBoard() {
        render(this.#boardTaskComponent, this.#boardContainer, RenderPosition.BEFOREEND);

        Object.values(Status).forEach(status => {
            this.#renderTasksList(status);
        });
    }

    #renderTasksList(status) {
        const filteredTasks = this.#boardTasks.filter(task => task.status === status);

        const taskListComponent = new TaskListComponent(StatusLabel[status], status);
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
        const trashBinButtonComponent = new TrashBinEmptyingButtonComponent();
        render(trashBinButtonComponent, container, RenderPosition.BEFOREEND);
    }

    init() {

        this.#boardTasks = [...this.#tasksModel.tasks];

        this.#renderBoard();

    }
}
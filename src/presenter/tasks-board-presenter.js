import TaskListComponent from "../view/task-list-component.js";
import TaskComponent from "../view/task-component.js";
import BoardTaskComponent from "../view/boardtask-component.js";
import TrashBinEmptyingButtonComponent from "../view/trash-bin-emptying-button.js";
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

    init() {

        this.#boardTasks = [...this.#tasksModel.getTasks()];

        render(this.#boardTaskComponent, this.#boardContainer, RenderPosition.BEFOREEND);

        const tasksByStatus = {
            [Status.BACKLOG]: [],
            [Status.INPROGRESS]: [],
            [Status.COMPLETE]: [],
            [Status.TRASHBIN]: []
        };

        this.#boardTasks.forEach(task => {
            tasksByStatus[task.status].push(task);
        });

        for (const [status, tasks] of Object.entries(tasksByStatus)) {
            const taskListComponent = new TaskListComponent(StatusLabel[status], status);
            render(taskListComponent, this.#boardTaskComponent.getElement());

            const taskListElement = taskListComponent.getTaskListElement();

            tasks.forEach(task => {
                const taskComponent = new TaskComponent(task);
                render(taskComponent, taskListElement, RenderPosition.BEFOREEND);
            });

            if (status === Status.TRASHBIN) {
                const trashBinButtonComponent = new TrashBinEmptyingButtonComponent();
                render(trashBinButtonComponent, taskListComponent.getElement(), RenderPosition.BEFOREEND);
            }
        }
    }
}
import { render, RenderPosition } from "./framework/render.js";
import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/task-model.js";

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

const bodyContainer = document.querySelector('.board-app');

const tasksModel = new TasksModel();
const taskBoardPresenter = new TaskBoardPresenter({boardContainer: bodyContainer, tasksModel: tasksModel});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent({onClick: handleNewTaskButtonClick}), bodyContainer, RenderPosition.BEFOREEND);

taskBoardPresenter.init();

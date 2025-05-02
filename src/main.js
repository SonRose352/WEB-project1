import { render, RenderPosition } from "./framework/render.js";
import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import TaskBoardPresenter from "./presenter/tasks-board-presenter.js";
import TasksModel from "./model/task-model.js";
import TasksApiService from "./tasks-api-service.js";

function handleNewTaskButtonClick() {
    taskBoardPresenter.createTask();
}

const bodyContainer = document.querySelector('.board-app');

const END_POINT = 'https://681512d132debfe95dbac0ae.mockapi.io';
const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent({onClick: handleNewTaskButtonClick}), bodyContainer, RenderPosition.BEFOREEND);

const taskBoardPresenter = new TaskBoardPresenter({boardContainer: bodyContainer, tasksModel: tasksModel});
taskBoardPresenter.init();

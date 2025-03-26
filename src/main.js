import HeaderComponent from "./view/header-component.js";
import FormAddTaskComponent from "./view/form-add-task-component.js";
import { render, RenderPosition } from "./framework/render.js";

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-new-task');

render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer, RenderPosition.AFTERBEGIN);
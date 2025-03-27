import { createElement } from "../framework/render.js";

function createTaskComponentTemplate(taskText) {
    return (
        `
        <li class="list-task">${taskText}</li>
        `
    );
}

export default class TaskComponent {
    constructor(task) {
        this.task = task;
    }

    getTemplate() {
        return createTaskComponentTemplate(this.task.text);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    removeElement() {
        this.element = null;
    }
}
import { createElement } from "../framework/render.js";

function createTaskListComponentTemplate(title, status) {
    return `
        <div class="tasks-list boardtask-${status}">
            <h4>${title}</h4>
            <ul class="list"></ul>
        </div>
    `;
}

export default class TaskListComponent {

    constructor(title, status) {
        this.title = title;
        this.status = status;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }

        return this.element;
    }

    getTaskListElement() {
        return this.getElement().querySelector('.list');
    }

    removeElement() {
        this.element = null;
    }
}
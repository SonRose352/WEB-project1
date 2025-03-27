import { createElement } from "../framework/render.js";
import TaskComponent from "./task-component.js";

function createTaskListComponentTemplate() {
    return `
        <div class="${this.className} tasks-list">
            <h4>${this.title}</h4>
            <ul class="list"></ul>
        </div>
    `;
}

export default class TaskListComponent {
    constructor({ title, className, tasks }) {
        this.title = title;
        this.className = className;
        this.tasks = tasks;
    }

    getTemplate() {
        return createTaskListComponentTemplate.call(this);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.renderTasks();
        }
        return this.element;
    }

    renderTasks() {
        const listContainer = this.element.querySelector('.list');
        this.tasks.forEach(task => {
            const taskItem = new TaskComponent(task);
            listContainer.appendChild(taskItem.getElement());
        });
    }

    removeElement() {
        this.element = null;
    }
}
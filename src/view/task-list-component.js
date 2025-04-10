import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTaskListComponentTemplate(title, status) {
    return `
        <div class="tasks-list boardtask-${status}">
            <h4>${title}</h4>
            <ul class="list"></ul>
        </div>
    `;
}

export default class TaskListComponent extends AbstractComponent {

    constructor(title, status) {
        super();
        this.title = title;
        this.status = status;
    }

    get template() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

    get taskListElement() {
        return this.element.querySelector('.list');
    }

}
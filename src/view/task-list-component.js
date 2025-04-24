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

    constructor(title, status, onTaskDrop) {
        super();
        this.title = title;
        this.status = status;
        this.#setDropHandler(onTaskDrop);
    }

    get template() {
        return createTaskListComponentTemplate(this.title, this.status);
    }

    get taskListElement() {
        return this.element.querySelector('.list');
    }

    #setDropHandler(onTaskDrop) {
        const container = this.element;

        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const taskElements = Array.from(this.taskListElement.querySelectorAll('.list-task'));
            const dropY = event.clientY;

            let insertIndex = 0;
            let found = false;

            for (let i = 0; i < taskElements.length; i++) {
                const taskEl = taskElements[i];
                const rect = taskEl.getBoundingClientRect();
                const middleY = rect.top + rect.height / 2;

                if (dropY < middleY) {
                    insertIndex = i;
                    found = true;
                    break;
                }
            }

            if (!found) {
                insertIndex = taskElements.length;
            }

            onTaskDrop(taskId, this.status, insertIndex);
        });
    }

}
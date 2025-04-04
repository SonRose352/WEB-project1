import { createElement } from "../framework/render.js";

function createBoardTaskComponentTemplate() {
    return `
        <section class="boardtask">
        
        </section>
    `;
}

export default class BoardTaskComponent {
    
    getTemplate() {
        return createBoardTaskComponentTemplate();
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
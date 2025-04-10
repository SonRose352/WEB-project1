import { AbstractComponent } from "../framework/view/abstract-component.js";

function createBoardTaskComponentTemplate() {
    return `
        <section class="boardtask">
        
        </section>
    `;
}

export default class BoardTaskComponent extends AbstractComponent {

    get template() {
        return createBoardTaskComponentTemplate();
    }

}
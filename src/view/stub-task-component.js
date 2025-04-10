import { AbstractComponent } from "../framework/view/abstract-component.js";

function createStubTaskComponentTemplate() {
    return (
        `
        <li class="list-task list-stub-task">Перетащите карточку</li>
        `
    );
}

export default class StubTaskComponent extends AbstractComponent {
    
    constructor() {
        super();
    }

    get template() {
        return createStubTaskComponentTemplate();
    }

}
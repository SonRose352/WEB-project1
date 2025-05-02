import { AbstractComponent } from "../framework/view/abstract-component.js";

function createNoTaskTemplate() {
    return (
        `
        <li class="board__no-tasks">Loading...</li>
        `
    );
}

export default class LoadingViewComponent extends AbstractComponent {

    get template() {
        return createNoTaskTemplate();
    }

}
import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTrashBinEmptyingButtonTemplate() {
    return (
        `
          <button>✕ Очистить</button>
        `
    );
}

export default class TrashBinEmptyingButtonComponent extends AbstractComponent {

  get template() {
    return createTrashBinEmptyingButtonTemplate();
  }

}
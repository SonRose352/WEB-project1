import { createElement } from "../framework/render.js";

function createTrashBinEmptyingButtonTemplate() {
    return (
        `
          <button>✕ Очистить</button>
        `
    );
}

export default class TrashBinEmptyingButtonComponent {
  getTemplate() {
    return createTrashBinEmptyingButtonTemplate();
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
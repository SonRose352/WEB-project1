import { AbstractComponent } from "../framework/view/abstract-component.js";

function createTrashBinEmptyingButtonTemplate() {
    return (
        `
          <button>✕ Очистить</button>
        `
    );
}

export default class TrashBinEmptyingButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createTrashBinEmptyingButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

}
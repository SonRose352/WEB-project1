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
  #isDisabled = false;

  constructor({onClick, isDisabled}) {
    super();
    this.#handleClick = onClick;
    this.#isDisabled = isDisabled;
    this.element.disabled = isDisabled;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createTrashBinEmptyingButtonTemplate();
  }

  updateState(isDisabled) {
    this.#isDisabled = isDisabled;
    this.element.disabled = isDisabled;
    this.#updateStyles();
    this.rerender();
  }

  #updateStyles() {
    this.element.style.opacity = this.#isDisabled ? '0.5' : '1';
    this.element.style.cursor = this.#isDisabled ? 'not-allowed' : 'pointer';
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

}
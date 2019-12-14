import {createElement} from "../utils";

const extraFilmsTemplate = (title) => {
  const className = `films-list--extra`;
  return (
    `<section class="${className}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class Extra {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return extraFilmsTemplate(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this.element = null;
  }
}

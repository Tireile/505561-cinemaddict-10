import {createElement} from "../utils";

const createFilmsListTemplate = () => {
  return (
    `<section class="films-list">
            <div class="films-list__container"></div>
        </section>`
  );
};

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

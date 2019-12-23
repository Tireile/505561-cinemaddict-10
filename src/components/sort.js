import AbstractComponent from "./abstract-component";

export const SortType = {
  BY_DATE: `by-date`,
  BY_RATING: `by-rating`,
  DEFAULT: `default`
};

const createSortTemplate = () => {
  return `<ul class="sort">
          <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" data-sort-type="${SortType.BY_DATE}" class="sort__button">Sort by date</a></li>
          <li><a href="#" data-sort-type="${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
        </ul>`;
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }
  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const nodeList = this.getElement().querySelectorAll(`a`);
      nodeList.forEach(element => {
        element.classList.remove(`sort__button--active`);
      });
      evt.target.classList.add(`sort__button--active`);
      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(this._currentSortType);
    });
  }
}

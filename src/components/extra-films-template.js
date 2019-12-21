import AbstractComponent from "./abstract-component";

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

export default class Extra extends AbstractComponent {
  constructor(title) {
    super();
    this._title = title;
  }

  getTemplate() {
    return extraFilmsTemplate(this._title);
  }
}

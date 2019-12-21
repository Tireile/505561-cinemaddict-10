import AbstractComponent from "./abstract-component";

const genresRender = (genres) => {
  const genreElements = [];
  genres.forEach((item) => genreElements.push(item));
  return genreElements[0];
};

const commentsRender = (comments) => {
  return (comments.length === 1) ? `${comments.length} comment` : `${comments.length} comments`;
};

const createFilmCardTemplate = (card) => {
  const {filmName, releaseDate: {year}, duration, genres, poster, description, comments, rating} = card;
  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">
          ${genresRender(genres)}
        </span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">
        ${commentsRender(comments)}
      </a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class FilmCard extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createFilmCardTemplate(this._card);
  }
}

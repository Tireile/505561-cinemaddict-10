'use strict';

const FILM_CARDS_COUNT = 5;

const createUserProfileCard = () => {
  return `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

const createStatisticTemplate = () => {
  return `<nav class="main-navigation">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
  <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
</nav>`;
};

const createFilterTemplate = () => {
  return `<ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>`;
};

const createFilmsTemplate = () => {
  return `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    
          <div class="films-list__container"></div>
          </section>
          </section>`;
};

const topRatedFilmsTemplate = () => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>

    <div class="films-list__container">
      ${createFilmCardTemplate()}
      ${createFilmCardTemplate()}
    </div>
  </section>
  `;
};

const mostCommentedFilmTemplate = () => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>

    <div class="films-list__container">
    ${createFilmCardTemplate()}
    ${createFilmCardTemplate()}
    </div>
  </section>`;
};

const createFilmCardTemplate = () => {
  return `<article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>`;
};

const createFilmDetales = () => {
  return `<div class="film-details__poster">
    <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">

    <p class="film-details__age">18+</p>
    </div>
    <div class="film-details__info">
    <div class="film-details__info-head">
        <div class="film-details__title-wrap">
        <h3 class="film-details__title">The Great Flamarion</h3>
        <p class="film-details__title-original">Original: The Great Flamarion</p>
        </div>

        <div class="film-details__rating">
        <p class="film-details__total-rating">8.9</p>
        <p class="film-details__user-rating">Your rate 9</p>
        </div>
    </div>

    <table class="film-details__table">
        <tr class="film-details__row">
        <td class="film-details__term">Director</td>
        <td class="film-details__cell">Anthony Mann</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Writers</td>
        <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Actors</td>
        <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Release Date</td>
        <td class="film-details__cell">30 March 1945</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Runtime</td>
        <td class="film-details__cell">1h 18m</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Country</td>
        <td class="film-details__cell">USA</td>
        </tr>
        <tr class="film-details__row">
        <td class="film-details__term">Genres</td>
        <td class="film-details__cell">
            <span class="film-details__genre">Drama</span>
            <span class="film-details__genre">Film-Noir</span>
            <span class="film-details__genre">Mystery</span></td>
        </tr>
    </table>

    <p class="film-details__film-description">
        The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
    </p>
    </div>`;
};

const createShowMoreButton = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createUserProfileCard());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createStatisticTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createFilmDetales());
render(siteMainElement, createFilmsTemplate());

const filmListElement = siteMainElement.querySelector(`.films-list__container`);

new Array(FILM_CARDS_COUNT)
  .fill(``)
  .forEach(() => render(filmListElement, createFilmCardTemplate()));

const filmElement = siteMainElement.querySelector(`.films-list`);
render(filmElement, createShowMoreButton());

const extraFilmElement = siteMainElement.querySelector(`.films`);
render(extraFilmElement, topRatedFilmsTemplate());
render(extraFilmElement, mostCommentedFilmTemplate());

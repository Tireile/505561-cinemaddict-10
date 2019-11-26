import {createUserProfileCard} from "./components/profile";
import {createStatisticTemplate} from "./components/statistic";
import {createFilterTemplate} from "./components/filter";
import {createFilmsTemplate} from "./components/films";
import {topRatedFilmsTemplate} from "./components/top-rated-films";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetales} from "./components/film-detales";
import {createShowMoreButton} from "./components/show-more-btn";
import {mostCommentedFilmTemplate} from "./components/most-commented-films";

const FILM_CARDS_COUNT = 5;

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

const filmMenuElement = siteMainElement.querySelector(`.films-list`);
const filmListElement = filmMenuElement.querySelector(`.films-list__container`);

new Array(FILM_CARDS_COUNT)
  .fill(``)
  .forEach(() => render(filmListElement, createFilmCardTemplate()));

render(filmMenuElement, createShowMoreButton());

const extraFilmElement = siteMainElement.querySelector(`.films`);
render(extraFilmElement, topRatedFilmsTemplate());
render(extraFilmElement, mostCommentedFilmTemplate());

const filmContainerElement = [...extraFilmElement.querySelectorAll(`.films-list--extra`)];

filmContainerElement.forEach((item) => {
  const extraFilmCardElement = item.querySelector(`.films-list__container`);
  new Array(2)
    .fill(``)
    .forEach(() => render(extraFilmCardElement, createFilmCardTemplate()));
});

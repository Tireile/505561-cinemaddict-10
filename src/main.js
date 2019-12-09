import {createUserProfileCard} from "./components/profile";
import {createStatisticTemplate} from "./components/statistic";
import {createFilterTemplate} from "./components/filter";
import {createFilmsTemplate} from "./components/films";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetales} from "./components/film-details";
import {createShowMoreButton} from "./components/show-more-btn";
import {extraFilmsTemplate} from "./components/extra-films-template";
import {generateCards} from "./mock/card";
import {generateFilters} from "./mock/filter";

const FILM_CARDS_COUNT = 12;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const handleFilmCardClick = (card) => {
  render(siteMainElement, createFilmDetales(card));
  const filmDetalesElement = siteMainElement.querySelector(`.film-details`);
  document.querySelector(`.film-details__close-btn`).addEventListener(`click`, () => filmDetalesElement.remove());
};

const renderFilmCards = (cards, start, end) => {
  cards
    .slice(start, end)
    .forEach((card, index) => {
      render(filmListElement, createFilmCardTemplate(card));
      const cardElement = document.querySelectorAll(`.film-card`)[index + start];
      cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
    });
};

const cards = generateCards(FILM_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, createUserProfileCard(cards));

const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters(cards);

render(siteMainElement, createStatisticTemplate(filters));
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createFilmsTemplate());

const filmMenuElement = siteMainElement.querySelector(`.films-list`);
const filmListElement = filmMenuElement.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;

renderFilmCards(cards, 0, SHOWING_CARDS_COUNT_ON_START);

render(filmMenuElement, createShowMoreButton());

const showMoreButton = filmMenuElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;

  renderFilmCards(cards, prevCardCount, showingCardsCount);

  if (showingCardsCount >= cards.length) {
    showMoreButton.remove();
  }
});

const extraFilmElement = siteMainElement.querySelector(`.films`);
render(extraFilmElement, extraFilmsTemplate(`Top Rated`));
render(extraFilmElement, extraFilmsTemplate(`Most Commented`));


// const filmContainerElement = [...extraFilmElement.querySelectorAll(`.films-list--extra`)];

const getTopRatedFilms = (cardsArray) => {
  const sortedCards = cardsArray.slice().sort((a, b) => a.rating - b.rating);
  sortedCards.splice(0, sortedCards.length - 2);
  return sortedCards;
};

const getTopCommentsFilms = (cardsArray) => {
  const sortedCards = cardsArray.slice().sort((a, b) => a.comments.length - b.comments.length);
  sortedCards.splice(0, sortedCards.length - 2);
  return sortedCards;
};

const top = [
  getTopRatedFilms(cards),
  getTopCommentsFilms(cards)
];

const filmContainerElement = extraFilmElement.querySelectorAll(`.films-list--extra .films-list__container`);

filmContainerElement.forEach((item, index) => {
  top[index].forEach((card) => {
    render(item, createFilmCardTemplate(card));
    const cardElement = item.querySelector(`.film-card:last-child`);
    cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
  });
});

// const tail = (list) => list[list.length - 1];

// const topRatedElement = filmContainerElement[0].querySelector(`.films-list__container`);
// const topRatedCards = getTopRatedFilms(cards);
// topRatedCards.forEach((card) => {
//   render(topRatedElement, createFilmCardTemplate(card));
//   const cardElement = tail(topRatedElement.querySelectorAll(`.film-card`));
//   cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
// });

// const topCommentedElement = filmContainerElement[1].querySelector(`.films-list__container`);
// const topCommentsCards = getTopCommentsFilms(cards);
// topCommentsCards.forEach((card) => {
//   render(topCommentedElement, createFilmCardTemplate(card));
//   const cardElement = tail(topCommentedElement.querySelectorAll(`.film-card`));
//   cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
// });

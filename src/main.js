import ProfileComponent from "./components/profile";
import StatisticComponent from "./components/statistic";
import FilterComponent from "./components/filter";
import FilmsComponent from "./components/films";
import FilmCardComponent from "./components/film-card";
import DetailsComponent from "./components/film-details";
import ShowMoreButtonComponent from "./components/show-more-btn";
import ExtraComponent from "./components/extra-films-template";
import {generateCards} from "./mock/card";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const FILM_CARDS_COUNT = 12;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const handleFilmCardClick = (card) => {
  const detailsComponent = new DetailsComponent(card);
  render(siteMainElement, detailsComponent.getElement(), RenderPosition.BEFOREEND);
  detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    detailsComponent.getElement().remove();
    detailsComponent.removeElement();
  });
};

const renderFilmCards = (cards, start, end) => {
  cards
    .slice(start, end)
    .forEach((card, index) => {
      render(filmListElement, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND);
      const cardElement = document.querySelectorAll(`.film-card`)[index + start];
      cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
    });
};

const cards = generateCards(FILM_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, new ProfileComponent(cards).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters(cards);

render(siteMainElement, new StatisticComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterComponent().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsComponent().getElement(), RenderPosition.BEFOREEND);

const filmMenuElement = siteMainElement.querySelector(`.films-list`);
const filmListElement = filmMenuElement.querySelector(`.films-list__container`);

let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
renderFilmCards(cards, 0, showingCardsCount);

const showMoreButtonComponent = new ShowMoreButtonComponent();
render(filmMenuElement, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

showMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevCardCount = showingCardsCount;
  showingCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;

  renderFilmCards(cards, prevCardCount, showingCardsCount);
  if (showingCardsCount >= cards.length) {
    showMoreButtonComponent.getElement().remove();
    showMoreButtonComponent.removeElement();
  }
});

const extraFilmElement = siteMainElement.querySelector(`.films`);
render(extraFilmElement, new ExtraComponent(`Top Rated`).getElement(), RenderPosition.BEFOREEND);
render(extraFilmElement, new ExtraComponent(`Most Commented`).getElement(), RenderPosition.BEFOREEND);

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
    render(item, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND);
    const cardElement = item.querySelector(`.film-card:last-child`);
    cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
  });
});

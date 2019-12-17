import ProfileComponent from "./components/profile";
import StatisticComponent from "./components/statistic";
import SortComponent from "./components/sort";
import FilmsComponent from "./components/films";
import FilmsListComponent from "./components/films-list";
import FilmCardComponent from "./components/film-card";
import NoCardsComponent from "./components/no-cards";
import DetailsComponent from "./components/film-details";
import ShowMoreButtonComponent from "./components/show-more-btn";
import ExtraComponent from "./components/extra-films-template";
import {generateCards} from "./mock/card";
import {generateFilters} from "./mock/filter";
import {render, RenderPosition} from "./utils";

const FILM_CARDS_COUNT = 0;
const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;

const handleFilmCardClick = (card) => {

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      removeFilmDetails();
    }
  };

  const removeFilmDetails = () => {
    siteMainElement.removeChild(detailsComponent.getElement());
    detailsComponent.removeElement();
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const detailsComponent = new DetailsComponent(card);
  render(siteMainElement, detailsComponent.getElement(), RenderPosition.BEFOREEND);
  document.addEventListener(`keydown`, onEscKeyDown);
  detailsComponent.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
    removeFilmDetails();
  });
};

const renderFilmCards = (cards, start, end) => {
  cards
    .slice(start, end)
    .forEach((card, index) => {
      render(filmsContainer, new FilmCardComponent(card).getElement(), RenderPosition.BEFOREEND);
      const cardElement = document.querySelectorAll(`.film-card`)[index + start];
      cardElement.addEventListener(`click`, () => {
        handleFilmCardClick(card);
      });
    });
};

const cards = generateCards(FILM_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`header`);
render(siteHeaderElement, new ProfileComponent(cards).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);

const filters = generateFilters(cards);

render(siteMainElement, new StatisticComponent(filters).getElement(), RenderPosition.BEFOREEND);

const filmsElement = new FilmsComponent();
const filmsListElement = new FilmsListComponent();

render(siteMainElement, filmsElement.getElement(), RenderPosition.BEFOREEND);
render(filmsElement.getElement(), filmsListElement.getElement(), RenderPosition.BEFOREEND);

const filmList = siteMainElement.querySelector(`.films-list`);
const filmsContainer = filmsListElement.getElement().querySelector(`.films-list__container`);


const areThereAnyFilms = cards.length === 0;

if (areThereAnyFilms) {
  render(filmList, new NoCardsComponent().getElement(), RenderPosition.AFTERBEGIN);
} else {
  render(filmsElement.getElement(), new SortComponent().getElement(), RenderPosition.AFTERBEGIN);

  let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
  renderFilmCards(cards, 0, showingCardsCount);

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

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
}

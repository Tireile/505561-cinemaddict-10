import FilmCardComponent from "../components/film-card";
import DetailsComponent from "../components/film-details";
import SortComponent, {SortType} from "../components/sort";
import FilmsListComponent from "../components/films-list";
import ExtraComponent from "../components/extra-films-template";
import NoCardsComponent from "../components/no-cards";
import ShowMoreButtonComponent from "../components/show-more-btn";
import {render, remove, RenderPosition} from "../utils/render";


const SHOWING_CARDS_COUNT_ON_START = 5;
const SHOWING_CARDS_COUNT_BY_BUTTON = 5;


export default class PageController {
  constructor(container) {
    this._container = container;
    this._filmCardComponent = new FilmCardComponent();
    this._filmsListComponent = new FilmsListComponent();
    this._extraComponentTopRated = new ExtraComponent(`Top Rated`);
    this._extraComponentMostCommented = new ExtraComponent(`Most Commented`);
    this._noCardsComponent = new NoCardsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._sortComponent = new SortComponent();
  }

  render(cards) {

    const handleFilmCardClick = (card) => {

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          removeFilmDetails();
        }
      };

      const removeFilmDetails = () => {
        container.removeChild(detailsComponent.getElement());
        detailsComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      const detailsComponent = new DetailsComponent(card);
      render(container, detailsComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      detailsComponent.setClickHandler(removeFilmDetails);
    };

    const renderFilmCards = (filmCards, start, end) => {
      filmCards
        .slice(start, end)
        .forEach((card, index) => {
          const filmCardComponent = new FilmCardComponent(card);
          render(filmsContainer, filmCardComponent, RenderPosition.BEFOREEND);
          const cardElement = document.querySelectorAll(`.film-card`)[index + start];
          cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
        });
    };

    const renderShowMoreButton = () => {
      if (showingCardsCount >= cards.length) {
        return;
      }

      render(filmList, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
      this._showMoreButtonComponent.getElement().addEventListener(`click`, () => {
        const prevCardCount = showingCardsCount;
        showingCardsCount += SHOWING_CARDS_COUNT_BY_BUTTON;

        renderFilmCards(cards, prevCardCount, showingCardsCount);

        if (showingCardsCount >= cards.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();

    const areThereNoFilms = cards.length === 0;

    if (areThereNoFilms) {
      render(container, this._noCardsComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    render(container, this._filmsListComponent, RenderPosition.BEFOREEND);
    const filmList = document.querySelector(`.films-list`);
    const filmsContainer = document.querySelector(`.films-list__container`);
    render(filmList, this._sortComponent, RenderPosition.AFTERBEGIN);

    let showingCardsCount = SHOWING_CARDS_COUNT_ON_START;
    renderFilmCards(cards, 0, showingCardsCount);

    renderShowMoreButton();


    render(container, this._extraComponentTopRated, RenderPosition.BEFOREEND);
    render(container, this._extraComponentMostCommented, RenderPosition.BEFOREEND);

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

    const filmContainerElement = container.querySelectorAll(`.films-list--extra .films-list__container`);
    filmContainerElement.forEach((item, index) => {
      top[index].forEach((card) => {
        render(item, new FilmCardComponent(card), RenderPosition.BEFOREEND);
        const cardElement = item.querySelector(`.film-card:last-child`);
        cardElement.addEventListener(`click`, () => handleFilmCardClick(card));
      });
    });

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.BY_DATE:
          sortedCards = cards.slice().sort((a, b) => a.releaseDate.year - b.releaseDate.year);
          break;
        case SortType.BY_RATING:
          sortedCards = cards.slice().sort((a, b) => a.rating - b.rating);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardsCount);
          break;
      }

      filmsContainer.innerHTML = ``;
      renderFilmCards(sortedCards, 0, sortedCards.length);

      if (sortType === SortType.DEFAULT) {
        renderShowMoreButton();
      } else {
        remove(this._showMoreButtonComponent);
      }
    });
  }
}

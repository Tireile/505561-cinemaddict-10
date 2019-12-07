const filterNames = {
  "All movies": (cards) => allMoviesCount(cards),
  "Watchlist": (cards) => watchlistCount(cards),
  "History": (cards) => historyMoviesCount(cards),
  "Favorites": (cards) => favoritesMoviesCount(cards),
  "Stats": ``
};

const allMoviesCount = (cards) => cards.length;

const watchlistCount = (cards) => {
  let count = 0;
  cards.forEach((card) => (card.isWatchlist ? count++ : count));
  return count;
};

const historyMoviesCount = (cards) => {
  let count = 0;
  cards.forEach((card) => (card.isViewed ? count++ : count));
  return count;
};

const favoritesMoviesCount = (cards) => {
  let count = 0;
  cards.forEach((card) => (card.isFavorite ? count++ : count));
  return count;
};

export const generateFilters = (cards) => Object.keys(filterNames).map((key) => {
  const countFn = filterNames[key];
  return {
    name: key,
    count: (typeof countFn !== `string`
    ) ? countFn(cards) : countFn
  };
});

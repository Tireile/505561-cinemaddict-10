import AbstractComponent from "./abstract-component";

const profileRank = (count) => {
  let rank = `newbie`;
  if (count > 0 && count <= 5) {
    rank = `movies buff`;
  } else if (count > 5 && count <= 10) {
    rank = `movies master`;
  } else {
    rank = `God of movies`;
  }
  return rank;
};

const watchlistCount = (cards) => {
  const count = cards.reduce((accumulator, card) => {
    accumulator += card.isWatchlist ? 1 : 0;
  }, 0);
  return profileRank(count);
};

const createUserProfileCard = (cards) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">
        ${watchlistCount(cards)}
      </p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class Profile extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createUserProfileCard(this._cards);
  }
}

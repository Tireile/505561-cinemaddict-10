const autors = [
    `Ramirez Scotland`,
    `Andrea Brown`,
    `Emmanuella Johnson`,
    `Islay Jimenez`,
    `Sean Arnold`,
    `Michelle Morrison`,
    `Andrina Bennett`,
    `Emil Reyes`,
    `Marvin O'Brien`,
    `Wilma O'Reilly`
]

const smiles = [
    `./images/emoji/smile.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/angry.png`,
]

const commentText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`

const generateDescription = (content) => content.split(`.`).map((item) => `${item}.`).filter(() => Math.random() > 0.5).slice(0, 1).join(` `);

const getRandomArrayItem = (array) => {
    const randomIndex = getRandomIntegerNumber(0, array.length);
    return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
    return min + Math.floor(max * Math.random());
};

const formatDate = (date) => {
    const formatDueDate = Object.fromEntries(
        new Intl.DateTimeFormat(`en-US`, {
            hourCycle: `h12`,
            day: `2-digit`,
            month: `long`,
            hour: `numeric`,
            minute: `numeric`
        })
            .formatToParts(date)
            .map((el) => [el.type, el.value])
    );
    return formatDueDate;
};

const getRandomDate = () => {
    const targetDate = new Date();
    const sign = Math.random() > 0.5 ? -2 : -1;
    const diffValue = sign * getRandomIntegerNumber(0, 7);

    targetDate.setDate(targetDate.getDate() + diffValue);
    return targetDate;
};

const createDate = (date) => {
    const formatDueDate = formatDate(date);
    const { day, dayPeriod, hour, minute, month } = formatDueDate;
    const today = new Date();
    return `${date.getDate() === today.getDate() ? `${day} ${month}` : `Today`} ${hour}:${minute}${dayPeriod}`

}

const createReleaseDate = (releaseDate) => {
    const { month, day, year } = releaseDate;
    return `${day} ${month} ${year}`;
};

const renderGenres = (genres) => {
    const genresList = Array.from(genres);
    const genresSpan = (genresList) => {
        const result = [];
        genresList.map((item) => result.push(`<span class="film-details__genre">${item}</span>`));
        return result.join(`\n`);
    }
    return `<tr class="film-details__row">
        <td class="film-details__term">${genresList.length > 1 ? `Genres` : `Genre`}</td>
        <td class="film-details__cell">
        ${genresSpan(genresList)}
        </td>
      </tr>`
}

const renderFilmDetails = (filmDetails) => {
    const result = [];
    filmDetails.forEach((key, value) => {
        result.push(value != "Genres" ?
            `<tr class="film-details__row">
            <td class="film-details__term">${value}</td>
            <td class="film-details__cell">${key}</td>
        </tr>`: `${renderGenres(key)}`)
    })
    return result;
}

const getComments = () => {
    return {
        autor: getRandomArrayItem(autors),
        notice: generateDescription(commentText),
        smile: getRandomArrayItem(smiles),
        date: createDate(getRandomDate())
    }
}

const generateComments = (comments) => {
    const result = [];
    new Array(comments)
        .fill(` `)
        .forEach(() => {
            const comment = getComments()
            const { autor, notice, smile, date } = comment;
            result.push(`<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src=${smile} width="55" height="55" alt="emoji">
    </span>
    <div>
      <p class="film-details__comment-text">${notice}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${autor}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`)
        }
        )
    return result.join(`\n`);
}

export const createFilmDetales = (card) => {
    const { filmName, poster, fullDescription, duration, rating, isAdult, director, writers, actors, releaseDate, country, genres, comments, isFavorite, isViewed, isWatchlist } = card;
    const filmDetails = new Map()
    filmDetails
        .set("Director", director)
        .set("Writers", writers)
        .set("Actors", actors)
        .set("Release Date", createReleaseDate(releaseDate))
        .set("Runtime", duration)
        .set("Country", country)
        .set("Genres", genres);


    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="">
  
            <p class="film-details__age">${isAdult ? `18+` : ``}</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmName}</h3>
                <p class="film-details__title-original">Original: ${filmName}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
  
            <table class="film-details__table">
            ${renderFilmDetails(filmDetails)}
            </table>
  
            <p class="film-details__film-description">
              ${fullDescription}
            </p>
          </div>
        </div>
  
        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
  
          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>
  
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments}</span></h3>
  
          <ul class="film-details__comments-list">
          ${generateComments(comments)}
          </ul>
  
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
              <label class="film-details__emoji-label" for="emoji-gpuke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

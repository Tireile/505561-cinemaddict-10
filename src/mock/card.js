const filmsList = [
  `Ужасный канибал`,
  `Больное воображение IV`,
  `Человек-слепень`,
  `Сашкина греча`,
  `Old man with young girl`,
  `Turbo ultra super film`,
  `Безрукий боксер`,
  `Soldiers vs Cops`,
  `Богач и 3 доширака`,
  `Demons inside demon`,
  `Story about nothing`,
  `God on wolf`,
  `King of flies`,
  `Bad bum which became a lord`,
  `Погоня на самокатах`
];

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const genres = [
  `Comedy`,
  `Mystery`,
  `Drama`,
  `Cartoon`,
  `Western`,
  `Musical`,
  `Horror`
];

const years = [1969, 1971, 1988, 1991, 1996, 1999, 2001, 2005, 2006, 2009, 2011, 2013, 2015, 2018, 2019];
const months = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31
};

const directors = [
  `Hunter Henderson`,
  `Ashton Ward`,
  `Richard Miller`,
  `Ethan Harris`,
  `Nicholas Hernandez`,
  `Jonathan Allen`,
  `Noah Walker`,
  `Chase Ross`,
  `Elijah Ross`,
  `Jordan Howard`,
  `Jake Flores`,
  `Xavier Lopez`,
  `Robert Adams`,
  `Jacob Stewart`,
  `David Sanders`
];

const writers = [
  `Steven Ross`,
  `Joseph Jackson`,
  `Sebastian Bell`,
  `Carter Phillips`,
  `Luke Moore`,
  `Ryan Brown`,
  `Logan Jenkins`,
  `Luis Scott`,
  `Victoria Thomas`,
  `Julia Rogers`,
  `Amelia Rivera`,
  `Haley Diaz`,
  `Sophia Nelson`,
  `Trinity Long`,
  `Natalie Hayes`,
  `Maria Wilson`,
  `Kaylee Martinez`,
  `Vanessa Wood`,
  `Patrick Diaz`,
  `Brian Young`
];

const actors = [
  `Cody Kelly`,
  `Christopher Jenkins`,
  `Kevin Mitchell`,
  `Cody Simmons`,
  `Isaiah Kelly`,
  `Christopher Morris`,
  `Ryan Rodriguez`,
  `Dominic Ward`,
  `Nathaniel Smith`,
  `Jeremiah Scott`,
  `Jennifer Sanchez`,
  `Rebecca Miller`,
  `Arianna Anderson`,
  `Madeline Martin`,
  `Michelle Washington`,
  `Diana Sanders`,
  `Rachel Gray`,
  `Ella Green`,
  `Paige Wood`,
  `Erin Diaz`
];

const countries = [`USA`, `England`, `Austria`, `Japan`, `France`, `Spain`, `Canada`];

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const generateDescription = (content) => content.split(`.`).map((item) => `${item}.`).filter(() => Math.random() > 0.5).slice(1, 3).join(` `);

const generateFullDescription = (content) => {
  const fullDescription = [];
  content.split(`.`).map((item) => {
    return (Math.random() > 0.5) ?
      fullDescription.unshift(`${item}.`) :
      fullDescription.push(`${item}.`);
  });
  return fullDescription.join(` `);
};

const generateDuration = () => {
  const durationValue = {hours: [1, 3], minutes: [0, 60]};
  const values = Object.keys(durationValue).map((key) => getRandomIntegerNumber(...durationValue[key]));
  return `${values[0]}h${values[1]}m`;
};

const generateRating = () => {
  return `${getRandomIntegerNumber(0, 10)}.${(Math.ceil((getRandomIntegerNumber(0, 10)) * 100) / 100)}`;
};

const generatePeople = (people) => people.map(() => getRandomArrayItem(people)).filter(() => Math.random() > 0.5).slice(0, 3).join(`, `);

const generateReleaseDate = (monthsList, yearsList) => {
  const month = getRandomArrayItem(Object.keys(months));
  return {
    month,
    day: getRandomIntegerNumber(1, monthsList[month]),
    year: getRandomArrayItem(yearsList)
  };
};

const generateGenres = (genresList) =>
  genresList.filter(() => Math.random() > 0.3).slice(1, 3);

const generateCard = () => {
  return {
    filmName: getRandomArrayItem(filmsList),
    poster: getRandomArrayItem(posters),
    description: generateDescription(description),
    fullDescription: generateFullDescription(description),
    duration: generateDuration(),
    rating: generateRating(),
    isAdult: Math.random() > 0.8,
    director: getRandomArrayItem(directors),
    writers: generatePeople(writers),
    actors: generatePeople(actors),
    releaseDate: generateReleaseDate(months, years),
    country: getRandomArrayItem(countries),
    genres: new Set(generateGenres(genres)),
    comments: getRandomIntegerNumber(0, 10),
    isFavorite: Math.random() > 0.5,
    isViewed: Math.random() > 0.5,
    isWatchlist: Math.random() > 0.5,
  };
};

const generateCards = (count) => new Array(count).fill(``).map(generateCard);

export {generateCard, generateCards};

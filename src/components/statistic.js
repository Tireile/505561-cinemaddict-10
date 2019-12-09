const createFilterMarkup = (filter, isStats) => {
  const {name, count} = filter;
  const hashtagName = name.toLowerCase().split(` `).filter((key) => key[0]).join();
  return `<a href="#${hashtagName}" class="main-navigation__item ${isStats ? `main-navigation__item--additional` : ``}">${name} 
            ${isStats ? `` :
    `<span class="main-navigation__item-count">${count}
            </span>`}
            
          </a>`;
};

export const createStatisticTemplate = (filters) => {
  const filtersMarkup = filters
    .map((item, i) => createFilterMarkup(item, i === filters.length - 1))
    .join(`\n`);
  return `<nav class="main-navigation">
  ${filtersMarkup}
  </nav>`;
};

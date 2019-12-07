export const extraFilmsTemplate = (title, specificator) => {
  const className = `films-list--extra films-list--${specificator}`;
  return (
    `<section class="${className}">
      <h2 class="films-list__title">${title}</h2>
      <div class="films-list__container">
      </div>
    </section>`
  );
};

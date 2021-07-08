export const $ = (selectors) => {
  return document.querySelector(selectors);
};

export const $$ = (selectors) => {
  return document.querySelectorAll(selectors);
};

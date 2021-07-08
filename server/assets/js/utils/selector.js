export const $ = (selectors, $el = document) => {
  return $el.querySelector(selectors);
};

export const $$ = (selectors, $el = document) => {
  return $el.querySelectorAll(selectors);
};

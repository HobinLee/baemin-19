import { $ } from "./selector.js";

export const showLoadingSpinner = () => {
  $("#spinner").style.display = "block";
};

export const hideLoadingSpinner = () => {
  $("#spinner").style.display = "none";
};

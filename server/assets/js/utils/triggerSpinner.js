import { $ } from "./selector.js";

export const showLoadingSpinner = ($spinner = $(".spinner")) => {
  $spinner.style.display = "block";
};

export const hideLoadingSpinner = () => {
  $(".spinner").style.display = "none";
};

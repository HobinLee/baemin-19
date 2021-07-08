import { logout } from "./api/api.js";
import { $ } from "./utils/selector.js";

(function() {
  function setScreenSize() {
    let vh = window.innerHeight;
  
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setScreenSize();

  const $logoutBtn = $('.logout-btn');

  $logoutBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const { httpStatus } = await logout();

    if (httpStatus === "OK") {
      window.location.href = "/";
    }
  });
  
  window.addEventListener('resize', () => setScreenSize())
})();
(function() {
  function setScreenSize() {
    let vh = window.innerHeight;
  
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setScreenSize();
  
  window.addEventListener('resize', () => setScreenSize())
})();
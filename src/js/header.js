const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  // console.log(currentPageName);

  if (
    currentPageName === '/index.html' ||
    currentPageName === '/books-project/index.html'
  ) {
    menuHomeEl.classList.add('current');
    return;
  }
  menuShoppingEl.classList.add('current');
};

setCurrentPage();

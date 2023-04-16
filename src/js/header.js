const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');
const authorisedUserBtn = document.querySelector('.user-btn-js');
const logOutBtn = document.querySelector('.log-out-btn-js');

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

const handleUserBtnClick = () => {
  logOutBtn.classList.toggle('is-hidden');
};

authorisedUserBtn.addEventListener('click', handleUserBtnClick);

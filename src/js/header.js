const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  console.log(currentPageName);

  if (currentPageName === '/index.html') {
    console.log('Ми на домашній сторінці');
    menuHomeEl.classList.add('current');
    return;
  }
  menuShoppingEl.classList.add('current');
  console.log('Ми на shopping-list');
};

setCurrentPage();

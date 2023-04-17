import openCloseIcon from '../images/icons.svg';


// ВИДІЛЕННЯ ЖОВТИМ НАЗВУ ПОТОЧНОЇ СТОРІНКИ (меню в хедері)
const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;

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





//   ВІДКРИТТЯ/ЗАКРИТТЯ МОДАЛКИ ДЛЯ МОБ. ВЕРСІЇ

const modalBoxEl = document.querySelector(".data-modal");
const openModalBtnEl = document.querySelector(".js-open-menu");
const iconHrefEl = document.querySelector(".icon-href");


  openModalBtnEl.addEventListener("click", toggleModal);

  function toggleModal() {
  if (modalBoxEl.classList.contains('is-hidden')) {
    modalBoxEl.classList.remove('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-x-close`);
    return;
  } else {
    modalBoxEl.classList.add('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-burger`);
  }
}



// ВИДІЛЕННЯ ЖОВТИМ, НАЗВУ ПОТОЧНОЇ СТОРІНКИ (меню в МОДАЛЦІ)

const dropMenuHomeEl = document.querySelector('.drop-menu__home');
const dropMenuShoppingEl = document.querySelector('.drop-menu__shopping');

const dropSetCurrentPage = () => {
const dropCurrentPageName = window.location.pathname;

  if (
    dropCurrentPageName === '/index.html' ||
    dropCurrentPageName === '/books-project/index.html'
  ) {
    dropMenuHomeEl.classList.add('current');
    return;
  }
  dropMenuShoppingEl.classList.add('current');
};

dropSetCurrentPage();



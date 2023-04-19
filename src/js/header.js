import openCloseIcon from '../images/icons.svg';

// ВІДПРИТТЯ/ЗАКРИТТЯ КНОПОК АВТОРИЗАЦІЇ

const userBtnEl = document.querySelector('.user-btn-js');
const logOutBtnEl = document.querySelector('.log-out-btn-js');
const logInBtnEl = document.querySelector('.drop-auth__modal-open-js');

const handleUserBtnClick = () => {
  logOutBtnEl.classList.toggle('is-hidden');
};

userBtnEl.addEventListener('click', handleUserBtnClick);
logInBtnEl.addEventListener('click', toggleModal);

// ВИДІЛЕННЯ ЖОВТИМ НАЗВУ ПОТОЧНОЇ СТОРІНКИ (меню в хедері)
const menuHomeEl = document.querySelector('.menu__home');
const menuShoppingEl = document.querySelector('.menu__shopping');

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  // console.log(currentPageName);

  if (
    currentPageName === '/shopping-list.html' ||
    currentPageName === '/books-project/shopping-list.html'
  ) {
     menuShoppingEl.classList.add('current');
    return;
  }
 menuHomeEl.classList.add('current');
};

  
  //   if (
//     // currentPageName === '/index.html' ||
//     // currentPageName === '/books-project/index.html'
//   ) {
//     menuHomeEl.classList.add('current');
//     return;
//   }
//   menuShoppingEl.classList.add('current');
// };
  
  
setCurrentPage();

//   ВІДКРИТТЯ/ЗАКРИТТЯ МОДАЛКИ ДЛЯ МОБ. ВЕРСІЇ

const modalBoxEl = document.querySelector('.data-modal');
const openModalBtnEl = document.querySelector('.js-open-menu');
const iconHrefEl = document.querySelector('.icon-href');

// const mobbEl = document.querySelector('.mob-header');

openModalBtnEl.addEventListener('click', toggleModal);

function toggleModal() {
  if (modalBoxEl.classList.contains('is-hidden')) {
    modalBoxEl.classList.remove('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-x-close`);
    document.body.classList.add('modal-open');

    return;
  } else {
    modalBoxEl.classList.add('is-hidden');
    iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-burger`);
    document.body.classList.remove('modal-open');
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

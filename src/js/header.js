import openCloseIcon from '../images/icons.svg';


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





//   <!-- МОДАЛЬНЕ  ВІКНО МЕНЮ  -->


const modalBoxEl = document.querySelector(".data-modal");

const openModalBtnEl = document.querySelector(".js-open-menu");

const iconHrefEl = document.querySelector(".icon-href");

const authModalOpenEl = document.querySelector(".auth__modal-open-js.mobile");


  openModalBtnEl.addEventListener("click", toggleModal);

//   function toggleModal() {
//   if (modalBoxEl.classList.contains('is-hidden')) {
//     modalBoxEl.classList.remove('is-hidden');
//     iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-x-close`);

    
//     return;
//   } else {
//     modalBoxEl.classList.add('is-hidden');
//     iconHrefEl.setAttribute('href', `${openCloseIcon}#icon-burger`);
//   }
// }


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






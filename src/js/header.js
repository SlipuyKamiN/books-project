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

<<<<<<< HEAD




//   <!-- МОДАЛЬНЕ  ВІКНО МЕНЮ  -->



  






const modalBoxEl = document.querySelector(".data-modal");

const openModalBtnEl = document.querySelector(".js-open-menu");

const iconBurgerEl = document.querySelector(".icon-burger");

const iconHrefEl = document.querySelector(".icon-href");

const iconXCloseEl = document.querySelector(".icon-x-close");


  openModalBtnEl.addEventListener("click", toggleModal);

    function toggleModal() {
      modalBoxEl.classList.toggle("is-hidden");
    
  
      iconHrefEl.setAttribute('href', "./icons.adfc4680.svg#icon-x-close");

    }










      //  відкриття/закриття  модального меню

// const openModalBtnEl = document.querySelector(".js-open-menu");
// const closeModalBtnEl = document.querySelector(".js-close-menu");
// const iconBurgerEl = document.querySelector(".icon-burger");

// const modalBoxEl = document.querySelector(".data-modal");

  // openModalBtnEl.addEventListener("click", toggleModal);
  // closeModalBtnEl.addEventListener("click", toggleModal);
  
  //   function toggleModal() {
  //     modalBoxEl.classList.toggle("is-hidden");
  //   }

    

//   openModalBtnEl.addEventListener("click", toggleModal);

  
//     function toggleModal() {
//       modalBoxEl.classList.toggle("is-hidden");

//       openModalBtnEl.innerHTML = `<button class="modal__btn-close js-close-menu is-hidden ">
//     <svg class="icon-x-close" width="28" height="28">
//       <use href="./images/icons.svg#icon-x-close"></use>
//     </svg>
//   </button>`;
//     }
=======
const handleUserBtnClick = () => {
  logOutBtn.classList.toggle('is-hidden');
};

authorisedUserBtn.addEventListener('click', handleUserBtnClick);
>>>>>>> main



// // classList.add("curretn");

// const showCurrent = (evetn) => {
//     menuShoppingEl.classList.add("current");
// }

// menuShoppingEl.addEventListener("click", showCurrent);

const menuHomeEl = document.querySelector(".menu__home");
const menuShoppingEl = document.querySelector(".menu__shopping");

const setCurrentPage = () => {
  const currentPageName = window.location.pathname;
  console.log(currentPageName);

    if (currentPageName === '/index.html') {
        console.log('Ми на домашній сторінці');
        menuHomeEl.classList.add("current");
        return;
    } 
        menuShoppingEl.classList.add("current");
        console.log('Ми на shopping-list');
        // return
    

};

setCurrentPage();



//  кнопка  Sing-in  выдкриває модалку

const btnSignUpEl = document.querySelector(".btn-sign-up");

// /partials/g-auth-modal.html


const openAuthModal = (evetn) => {
    
}

btnSignUpEl.addEventListener("click", openAuthModal);
















// const setCurrentPage = () => {
//   const currentPageName = window.location.pathname;
//   console.log(currentPageName);

//     if (currentPageName === '/index.html') {
//         console.log('Ми на домашній сторінці');
//         menuHomeEl.classList.add("current");
//         return;
//     } else if (currentPageName ===  '/shopping-list.html'){
//         menuShoppingEl.classList.add("current");
//         console.log('Ми на shopping-list');
//         // return
//     }

// };

// setCurrentPage();
// const switchDayNight = document.querySelector('.mode-switch');
// const books = document.querySelectorAll('.book-name, .category-books__name, .load-more-js, .main__title-js, .category-books__title + .category-books__author');

// function checkDarkModeStatus() {
//   if (localStorage.getItem('darkMode') === 'true') {
//     addDarkTheme();
//     switchDayNight.checked = true;
//   } else {
//     removeDarkTheme();
//     switchDayNight.checked = false;
//   }
// }

// switchDayNight.addEventListener('change', () => {
//   if (switchDayNight.checked) {
//     addDarkTheme();
//   } else {
//     removeDarkTheme();
//   }
//   localStorage.setItem('darkMode', switchDayNight.checked);
// });

// function addDarkTheme() {
//   document.body.classList.add('dark');
//   books.forEach(book => {
//     book.style.color = '$white-color';
//   });
// }

// function removeDarkTheme() {
//   document.body.classList.remove('dark');
//   document.body.style.backgroundColor = '#f6f6f6';
//   document.querySelector('header').style.backgroundColor = '#FFFFFF';

//   bookNameArray.forEach(book => {
//     book.style.color = 'rgba(17, 17, 17, 0.6)';
//   });
// }

// checkDarkModeStatus();



// const modeSwitch = document.querySelector('.mode-switch');
// const body = document.querySelector('body');


// const savedMode = localStorage.getItem('selectedMode');
// if (savedMode) {
//   body.classList = savedMode;
//   modeSwitch.checked = savedMode === 'dark' ? true : false;
// } else {
//   body.classList = 'light';
// }

// modeSwitch.addEventListener('change', function() {
//   const selectedMode = this.checked ? 'dark' : 'light';
//   body.classList = selectedMode;

  
//   localStorage.setItem('selectedMode', selectedMode);
// });
// import openDayNightIcon from '../images/icons.svg';

// function useLogoIcon() {
//   if (modalBoxEl.classList.contains('is-hidden')) {
//     modalBoxEl.classList.remove('is-hidden');
//     iconHrefEl.setAttribute('href', `${useDayIcon}#icon-logo`);
//     return;
//   } else {
//     modalBoxEl.classList.add('is-hidden');
//     iconHrefEl.setAttribute('href', `${useDarkIcon}#icon-full-logo--dark-theme`);
//   }
// }

// const modeSwitch = document.querySelector('.mode-switch');
// const body = document.querySelector('body');

// const savedMode = localStorage.getItem('selectedMode');
// if (savedMode) {
//   body.classList = savedMode;
//   modeSwitch.checked = savedMode === 'dark' ? true : false;
// } else {
//   body.classList = 'light';
// }

const modeSwitch = document.querySelector('.mode-switch');
const body = document.querySelector('body');
const logoIcon = document.querySelector('.header__logo-icon use');

const savedMode = localStorage.getItem('selectedMode');
if (savedMode) {
body.classList = savedMode;
modeSwitch.checked = savedMode === 'dark' ? true : false;
} else {
body.classList = 'light';
}

modeSwitch.addEventListener('change', function() {
const selectedMode = this.checked ? 'dark' : 'light';
body.classList = selectedMode;

// change the logo icon based on the selected mode
if (selectedMode === 'dark') {
logoIcon.setAttribute('href', './images/icons.svg#icon-full-logo--dark-theme');
} else {
logoIcon.setAttribute('href', './images/icons.svg#icon-full-logo');
}

localStorage.setItem('selectedMode', selectedMode);
});
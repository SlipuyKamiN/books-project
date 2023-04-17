import spritePath from '../images/icons.svg';
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

const modeSwitch = document.querySelector('.mode-switch');
const body = document.querySelector('body');
const logoIcon = document.querySelector('.header__logo-icon use');

const savedMode = localStorage.getItem('selectedMode');
if (savedMode) {
  body.classList = savedMode;
  modeSwitch.checked = savedMode === 'dark' ? true : false;
  if (savedMode === 'dark') {
    logoIcon.setAttribute('href', `${spritePath}#icon-full-logo--dark-theme`);
  }
} else {
  body.classList = 'light';
}

modeSwitch.addEventListener('change', function () {
  const selectedMode = this.checked ? 'dark' : 'light';
  body.classList = selectedMode;

  if (selectedMode === 'dark') {
    logoIcon.setAttribute('href', `${spritePath}#icon-full-logo--dark-theme`);
  } else {
    logoIcon.setAttribute('href', `${spritePath}#icon-full-logo`);
  }

  localStorage.setItem('selectedMode', selectedMode);
});

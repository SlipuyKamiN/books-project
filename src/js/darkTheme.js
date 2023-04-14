const switchDayNight = document.querySelector('.mode-switch');
const books = document.querySelectorAll('.book-name, .category-books__name, .load-more-js, .main__title-js, .category-books__title + .category-books__author');

function checkDarkModeStatus() {
  if (localStorage.getItem('darkMode') === 'true') {
    addDarkTheme();
    switchDayNight.checked = true;
  } else {
    removeDarkTheme();
    switchDayNight.checked = false;
  }
}

switchDayNight.addEventListener('change', () => {
  if (switchDayNight.checked) {
    addDarkTheme();
  } else {
    removeDarkTheme();
  }
  localStorage.setItem('darkMode', switchDayNight.checked);
});

function addDarkTheme() {
  document.body.classList.add('dark');
  books.forEach(book => {
    book.style.color = '$white-color';
  });
}

function removeDarkTheme() {
  document.body.classList.remove('dark');
  books.forEach(book => {
    book.style.color = '$text-gray-color';
  });
}

checkDarkModeStatus();



// const modeSwitch = document.querySelector('.mode-switch');
// const body = document.querySelector('body');

// // Set the initial mode based on the saved value in localStorage, or use the default mode
// const savedMode = localStorage.getItem('selectedMode');
// if (savedMode) {
//   body.classList = savedMode;
//   modeSwitch.checked = savedMode === 'dark' ? true : false;
// } else {
//   body.classList = 'light';
// }

// // Add an event listener to the mode switch
// modeSwitch.addEventListener('change', function() {
//   const selectedMode = this.checked ? 'dark' : 'light';
//   body.classList = selectedMode;

//   // Save the selected mode in localStorage
//   localStorage.setItem('selectedMode', selectedMode);
// });
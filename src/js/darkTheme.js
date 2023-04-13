
const switchDayNight = document.querySelector('.mode-switch');
const bookNameArray = document.querySelectorAll('.book-name');

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
  document.body.style.backgroundColor = '#202024';
  document.querySelector('header').style.backgroundColor = '#111111';

  bookNameArray.forEach((book) => {
    book.style.color = 'rgba(255, 255, 255, 0.6)';
  });
}

function removeDarkTheme() {
  document.body.classList.remove('dark');
  document.body.style.backgroundColor = '#D0D0D0';
  document.querySelector('header').style.backgroundColor = '#FFFFFF';

  bookNameArray.forEach((book) => {
    book.style.color = 'rgba(17, 17, 17, 0.6)';
  });
}

checkDarkModeStatus();

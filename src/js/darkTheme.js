import spritePath from '../images/icons.svg';

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

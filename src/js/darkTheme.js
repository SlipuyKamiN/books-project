const modeSwitch = document.querySelector('.mode-switch');
const body = document.querySelector('body');

// Set the initial mode based on the saved value in localStorage, or use the default mode
const savedMode = localStorage.getItem('selectedMode');
if (savedMode) {
  body.classList = savedMode;
  modeSwitch.checked = savedMode === 'dark' ? true : false;
} else {
  body.classList = 'light';
}

// Add an event listener to the mode switch
modeSwitch.addEventListener('change', function() {
  const selectedMode = this.checked ? 'dark' : 'light';
  body.classList = selectedMode;

  // Save the selected mode in localStorage
  localStorage.setItem('selectedMode', selectedMode);
});
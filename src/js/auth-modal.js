import debounce from 'lodash.debounce';

const refs = {
  openAuthorizationBtn: document.querySelector('button.auth__modal-open-js'),
  openAuthorizationBtnDropMenu: document.querySelector(
    'button.drop-auth__modal-open-js'
  ),
  closeAuthorizationBtn: document.querySelector('button.auth__modal-close-js'),
  modalAuthorization: document.querySelector('div.auth__modal-js'),
  buttonSignUp: document.querySelector('.form__btn-sign-up'),
  buttonSignIn: document.querySelector('.form__btn-sign-in'),
  buttonSubmit: document.querySelector('.form__btn-submit'),
  formInputs: document.querySelector('div.form__render'),
  inputName: document.querySelector('.form__input-name'),
  inputMail: document.querySelector('.form__input-mail'),
  inputPassword: document.querySelector('.form__input-password'),
};

refs.openAuthorizationBtn.addEventListener('click', openModal);
refs.openAuthorizationBtnDropMenu.addEventListener('click', openModal);
refs.closeAuthorizationBtn.addEventListener('click', closeModal);

function openModal() {
  refs.modalAuthorization.classList.remove('is-hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', handleEscKeyPress);
  window.addEventListener('click', handleBackDropClick);
}

function closeModal() {
  refs.modalAuthorization.classList.add('is-hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', handleEscKeyPress);
  window.removeEventListener('click', handleBackDropClick);
}

refs.buttonSignIn.addEventListener('click', onButtonSignIn);
refs.buttonSignUp.addEventListener('click', onButtonSignUp);

function onButtonSignIn() {
  refs.buttonSignUp.classList.remove('active');
  refs.buttonSignIn.classList.add('active');
  refs.buttonSubmit.textContent = 'Sign in';
  refs.formInputs.innerHTML = '';
}

function onButtonSignUp() {
  refs.buttonSignIn.classList.remove('active');
  refs.buttonSignUp.classList.add('active');
  refs.buttonSubmit.textContent = 'Sign up';
  refs.formInputs.innerHTML = `<div class="form__field">
          <input
            type="text"
            class="form__input form__input-name"
            name="name"
            pattern="[a-zA-Z\u0400-\u04ff]{3,30}"
            required
          />
          <label for="name" class="form__label form__label-name">Name</label>
        </div>`;
  refs.inputName = document.querySelector('.form__input-name');
  refs.inputName.addEventListener('input', debounce(onInput, 300));
}

refs.inputName.addEventListener('input', debounce(onInput, 300));
refs.inputMail.addEventListener('input', debounce(onInput, 300));
refs.inputPassword.addEventListener('input', debounce(onInput, 300));

function onInput(e) {
  if (e.target.value) {
    e.target.nextElementSibling.classList.add('checked');
  } else {
    e.target.nextElementSibling.classList.remove('checked');
  }
}

function handleEscKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function handleBackDropClick(e) {
  if (e.target === refs.modalAuthorization) {
    closeModal();
  }
}

const refs = {
  openAuthorizationBtn: document.querySelector('button.auth__modal-open-js'),
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

refs.openAuthorizationBtn.addEventListener('click', toggleModal);
refs.closeAuthorizationBtn.addEventListener('click', toggleModal);

function toggleModal() {
  refs.modalAuthorization.classList.toggle('is-hidden');
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
}

refs.inputName.addEventListener('input', onInput);
refs.inputMail.addEventListener('input', onInput);
refs.inputPassword.addEventListener('input', onInput);

function onInput(e) {
  if (e.target.value) {
    e.target.nextElementSibling.classList.add('checked');
  } else {
    e.target.nextElementSibling.classList.remove('checked');
  }
}

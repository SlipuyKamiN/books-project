const openAuthorizationBtn = document.querySelector('[data-auth-modal-open]');
console.log(openAuthorizationBtn);
const closeAuthorizationBtn = document.querySelector('[data-auth-modal-close]');
const modalAuthorization = document.querySelector('[data-auth-modal]');

openAuthorizationBtn.addEventListener('click', toggleModal);
closeAuthorizationBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modalAuthorization.classList.toggle('is-hidden');
}

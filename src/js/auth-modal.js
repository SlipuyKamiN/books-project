const openAuthorizationBtn = document.querySelector('[data-modal-open]');
const closeAuthorizationBtn = document.querySelector('[data-modal-close]');
const modalAuthorization = document.querySelector('[data-modal]');

openAuthorizationBtn.addEventListener('click', toggleModal);
closeAuthorizationBtn.addEventListener('click', toggleModal);

function toggleModal() {
  modalAuthorization.classList.toggle('is-hidden');
}

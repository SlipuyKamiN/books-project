import { fetchBooks } from '../js/fetchBooks';
import renderModal from '../templates/modal.hbs';

const globalRefs = {
  modal: document.querySelector('.modal-js'),
};

const BOOKS_DATA_KEY = 'books-data';
const IsUserLogged = true; // change to real object from autorization block
const bookArray = [];
const currentStorage = JSON.parse(localStorage.getItem(BOOKS_DATA_KEY));

const imgSrcs = {
  amazonSrcX1: require('../images/modal/image-1@1x.png'),
  amazonSrcX2: require('../images/modal/image-1@2x.png'),
  appleBooksSrcX1: require('../images/modal/image-2@1x.png'),
  appleBooksSrcX2: require('../images/modal/image-2@2x.png'),
  barnesAndNobleSrcX1: require('../images/modal/image-3@1x.png'),
  barnesAndNobleSrcX2: require('../images/modal/image-3@2x.png'),
};

if (currentStorage) {
  bookArray.push(...currentStorage);
} else {
  localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify([]));
}

export async function handleModalWindow(bookId) {
  // globalRefs.modal.innerHTML = globalRefs.modal.classList.remove('is-hidden');

  try {
    const bookData = await fetchBooks.getBookById(bookId);
   
    const amazonUrl = bookData.buy_links.find(
      book => book.name === 'Amazon'
    ).url;
    const appleBooksUrl = bookData.buy_links.find(
      book => book.name === 'Apple Books'
    ).url;
    const barnesAndNobleUrl = bookData.buy_links.find(
      book => book.name === 'Barnes and Noble'
    ).url;

    globalRefs.modal.innerHTML = globalRefs.modal.classList.remove('is-hidden');

    globalRefs.modal.innerHTML = renderModal({
      ...bookData,
      amazonUrl,
      appleBooksUrl,
      barnesAndNobleUrl,
      ...imgSrcs,
    });

    const refs = {
      addBtn: document.querySelector('.modal__add-btn-js'),
      removeBlock: document.querySelector('.modal__remove-block-js'),
      removeBtn: document.querySelector('.modal__remove-btn-js'),
      closeModalBtn: document.querySelector('.modal__close-btn-js'),
    };

    refs.removeBlock.classList.add('visually-hidden');

    if (!IsUserLogged) {
      refs.addBtn.classList.add('visually-hidden');
    }

    const isBookInStorage = bookArray.find(book => book._id === bookData._id);
    const bookIndex = bookArray.indexOf(isBookInStorage);

    if (isBookInStorage) {
      refs.addBtn.classList.add('visually-hidden');
      refs.removeBlock.classList.remove('visually-hidden');
    }

    window.addEventListener('keydown', handleEscKeyPress);
    window.addEventListener('click', handleBackDropClick);
    refs.addBtn.addEventListener('click', handleAddBtnClick);
    refs.removeBtn.addEventListener('click', handleRemoveBtnClick);
    refs.closeModalBtn.addEventListener('click', handleCloseModalBtnClick);

    function handleCloseModalBtnClick() {
      closeModal();
      removeListeners();
      clearInterface();
    }

    function handleAddBtnClick() {
      bookArray.push(bookData);

      localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));

      refs.addBtn.classList.add('visually-hidden');
      refs.removeBlock.classList.remove('visually-hidden');
    }

    function handleRemoveBtnClick() {
      bookArray.splice(bookIndex, 1);

      localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));

      refs.addBtn.classList.remove('visually-hidden');
      refs.removeBlock.classList.add('visually-hidden');
    }

    function handleEscKeyPress(evt) {
      const isEsc = evt.code === 'Escape';
      if (isEsc) {
        closeModal();
        removeListeners();
        clearInterface();
      }
    }

    function handleBackDropClick(evt) {
      if (evt.target === globalRefs.modal) {
        closeModal();
        removeListeners();
        clearInterface();
      }
    }

    function closeModal() {
      globalRefs.modal.classList.add('is-hidden');
    }

    function removeListeners() {
      window.removeEventListener('keydown', handleEscKeyPress);
      window.removeEventListener('click', handleBackDropClick);
    }

    function clearInterface() {
      globalRefs.modal.innerHTML = "";
    }

  } catch (error) {
    console.log(error);
  }
}

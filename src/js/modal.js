import { fetchBooks } from '../js/fetchBooks';
import renderModal from '../templates/modal.hbs';

const openModalEl = document.querySelector('.modal__open-modal-js');
openModalEl.addEventListener('click', () => { 
    modalEl.classList.toggle('is-hidden');
});

const modalEl = document.querySelector('.modal-js');

const BOOKS_DATA_KEY = "books-data";


let bookArray = [];
const currentStorage = JSON.parse(localStorage.getItem(BOOKS_DATA_KEY));

if (currentStorage) {
    bookArray.push([...currentStorage]);
}
console.log(currentStorage);
console.log(bookArray);

// localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify([]));

export function openModal(bookId) {

    fetchBookById(bookId);   

}

async function fetchBookById(bookId) {
    try {
        const bookData = await fetchBooks.getBookById(bookId);

        bookArray.push(bookData);
        console.log(bookArray);
        // console.log(bookData);
        // console.log(bookData.buy_links);

        const amazonUrl = bookData.buy_links.find((book) => book.name === "Amazon").url;
        const appleBooksUrl = bookData.buy_links.find((book) => book.name === "Apple Books").url;
        const barnesAndNobleUrl = bookData.buy_links.find((book) => book.name === "Barnes and Noble").url;

        modalEl.innerHTML = renderModal({
            ...bookData,
            amazonUrl: amazonUrl,
            appleBooksUrl: appleBooksUrl,
            barnesAndNobleUrl: barnesAndNobleUrl,
        });
      
        const addBtnEl = document.querySelector('.modal__add-btn-js');
        const removeBtnEl = document.querySelector('.modal__remove-btn-js');
        const closeModalBtn = document.querySelector('.modal__close-btn-js');

        addBtnEl.addEventListener('click', handleAddBtnClick);
        removeBtnEl.addEventListener('click', handleRemoveBtnClick);
        closeModalBtn.addEventListener('click', handleCloseModalBtnClick);

        function handleCloseModalBtnClick() {
            modalEl.classList.toggle('is-hidden');
        }

        function handleAddBtnClick() { 
            localStorage.setItem(BOOKS_DATA_KEY, JSON.stringify(bookArray));
        }

        function handleRemoveBtnClick() {
            console.log("remove");
            localStorage.removeItem(BOOKS_DATA_KEY);
        }

     
    } catch (error) {
        console.log(error);
    }

}


openModal('643282b1e85766588626a080');

openModal('643282b1e85766588626a0ba');  


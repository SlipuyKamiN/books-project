import { fetchBooks } from '../js/fetchBooks';
import renderModal from '../templates/modal.hbs';



const modalEl = document.querySelector('.modal-js');

export function openModal(bookId) {

    fetchBookById(bookId);   

}

async function fetchBookById(bookId) {
    try {
        const bookData = await fetchBooks.getBookById(bookId);
        console.log(bookData);

        modalEl.innerHTML = renderModal(bookData);
        

    } catch (error) {
        console.log(error);
    }

}


openModal('643282b1e85766588626a080');
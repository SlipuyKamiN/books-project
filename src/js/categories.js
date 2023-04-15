import transformer from 'parcel-transformer-hbs';
import { fetchBooks } from '../js/fetchBooks';
import { makeMarkupGategory, showAllCategories } from './home/allCategories';
import { handleImgClick } from './home/allCategories';
// import { checkLengthBookTitle } from './home/allCategories';
import { addEventListenerForBook } from './home/allCategories';

const listEl = document.querySelector('.categories-list-js');
const mainListEl = document.querySelector('.main__list-js');
const mainTitle = document.querySelector('.main__title-js');
const allCategoriesBtn = document.querySelector('.all-categories-btn');

const createCategoryList = async () => {
  const categoriesList = await fetchBooks.getCategoriesList();

  const makeNewButtons = categoriesList
    .map(
      category =>
        `<li class= 'categories-list__button'> <button>${category.list_name}</button> </li>`
    )
    .join('');
  listEl.insertAdjacentHTML('beforeend', makeNewButtons);
};
createCategoryList();

allCategoriesBtn.addEventListener('click', showAllCategories);

export const drawCategory = async name => {
  const books = await fetchBooks.getBooksByCategory(name);
  const markup = makeMarkupGategory(books);
  const titleArr = name.split(' ');
  const titleFirstPart = titleArr.slice(0, titleArr.length - 1).join(' ');
  const titleLastPart = titleArr.slice(titleArr.length - 1).join();
  mainTitle.innerHTML = `${titleFirstPart}<span class="main__title--color-purple"> ${titleLastPart}</span>`;
  mainListEl.innerHTML = markup;
  mainListEl.classList.add('card-set');
  const bookCategoryEl = document.querySelector('.category-books__item');
  bookCategoryEl.addEventListener('click', handleImgClick);
};

listEl.addEventListener('click', markup);

let previ = '';

function markup(ev) {
  let title = ev.target.textContent;
  drawCategory(title);

  if (previ !== '') {
    previ.style.textTransform = 'none';
  }
  ev.target.style.textTransform = 'uppercase';
  previ = ev.target;
}

const handleImgClick = event => {
  idBook = event.target.dataset.id;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  handleModalWindow(idBook);
};

// checkLengthBookTitle();
// addEventListenerForBook();

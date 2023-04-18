import Notiflix from 'notiflix';
import { fetchBooks } from '../js/fetchBooks';
import { makeMarkupGategory, showAllCategories } from './home/allCategories';
import { addEventListenerForBook } from './home/allCategories';
import { addEventListenerForBook } from './home/allCategories';
import { showAllCategories } from './home/allCategories';
import { Spiner } from './spiner-loader';

const listEl = document.querySelector('.categories-list-js');
const mainListEl = document.querySelector('.main__list-js');
const mainTitle = document.querySelector('.main__title-js');
const allCategoriesBtn = document.querySelector('.all-categories-btn');
let title = '';

allCategoriesBtn.classList.add('selected-categories');

const spiner = new Spiner();

const createCategoryList = async () => {
  try {
    const categoriesList = await fetchBooks.getCategoriesList();

    const makeNewButtons = categoriesList
      .map(
        category =>
          `<li class= 'categories-list__item '> <button class= 'categories-list__button'>${category.list_name}</button> </li>`
      )
      .join('');
    listEl.insertAdjacentHTML('beforeend', makeNewButtons);
  } catch (error) {
    console.log(error);
  }
};

createCategoryList();

const validationQuery = query => {
  if (query.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there was an error on the server. Please try again.'
    );
    return;
  }
};

export const drawCategory = async name => {
  spiner.show();

  const books = await fetchBooks.getBooksByCategory(name);
  const markup = makeMarkupGategory(books);
  const titleArr = name.split(' ');
  const titleFirstPart = titleArr.slice(0, titleArr.length - 1).join(' ');
  const titleLastPart = titleArr.slice(titleArr.length - 1).join();
  mainTitle.innerHTML = `${titleFirstPart}<span class="main__title--color-purple"> ${titleLastPart}</span>`;
  mainListEl.innerHTML = markup;
  mainListEl.classList.add('card-set');
  const bookCategoryEl = document.querySelectorAll('.category-books__item');
  addEventListenerForBook(bookCategoryEl);
  allCategoriesBtn.classList.remove('selected-categories');

  spiner.hide();
};

listEl.addEventListener('click', markup);

function markup(ev) {
  if (ev.target.nodeName !== 'BUTTON') {
    return;
  }

  clearSelectedCategories();

  if (ev.target === allCategoriesBtn) {
    allCategoriesBtn.classList.add('selected-categories');
    showAllCategories();
    return;
  }
  title = ev.target.textContent;
  drawCategory(title);
  ev.target.classList.add('selected-categories');
}

const clearSelectedCategories = () => {
  for (let i = 0; i < listEl.children.length; i += 1) {
    const category = listEl.children[i];

    category.firstElementChild.classList.remove('selected-categories');
  }
};

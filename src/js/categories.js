import transformer from 'parcel-transformer-hbs';
import { fetchBooks } from '../js/fetchBooks';
import { makeMarkupGategory } from './home/allCategories';
import { handleImgClick } from './home/allCategories';

const listEl = document.querySelector('.categories-list-js');
const mainListEl = document.querySelector('.main__list-js');
const mainTitle = document.querySelector('.main__title-js');

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

const drawCategory = async name => {
  const books = await fetchBooks.getBooksByCategory(name);
  const markup = makeMarkupGategory(books);
  const titleArr = name.split(' ');
  const titleFirstPart = titleArr.slice(0, titleArr.length - 1).join(' ');
  const titleLastPart = titleArr.slice(titleArr.length - 1).join();
  mainTitle.innerHTML = `${titleFirstPart}<span class="main__title--color-purple"> ${titleLastPart}</span>`;
  mainListEl.innerHTML = markup;
  mainListEl.classList.add('card-set');
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

console.log(handleImgClick());

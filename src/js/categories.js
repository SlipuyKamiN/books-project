import transformer from 'parcel-transformer-hbs';
import { fetchBooks } from '../js/fetchBooks';

const listEl = document.querySelector('.categories-list-js');

const func = async () => {
  const categoriesList = await fetchBooks.getCategoriesList();

  const makeNewButtons = categoriesList
    .map(
      category =>
        `<li class= 'categories-list__button'> <button> ${category.list_name}</button> </li>`
    )
    .join('');
  listEl.insertAdjacentHTML('beforeend', makeNewButtons);
};
func();

listEl.addEventListener('click', markup);

let previ = '';

function markup(ev) {
  let title = ev.target.textContent;
  const mainTitleEl = document.querySelector('.main__title');
  const titleArr = title.split(' ');
  const titleFirstPart = titleArr.slice(0, titleArr.length - 1).join(' ');
  const titleLastPart = titleArr.slice(titleArr.length - 1).join();
  console.log(titleFirstPart, titleLastPart);
  mainTitleEl.innerHTML = `${titleFirstPart}<span class="main__title--color-purple"> ${titleLastPart}</span>`;

  if (previ !== '') {
    previ.style.textTransform = 'none';
  }
  ev.target.style.textTransform = 'uppercase';
  previ = ev.target;
}

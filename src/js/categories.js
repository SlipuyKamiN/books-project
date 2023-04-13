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

function markup(ev) {
  let title = ev.target.textContent;
  const mainTitleEl = document.querySelector('.main__title');
  mainTitleEl.textContent = `${title}`;
}

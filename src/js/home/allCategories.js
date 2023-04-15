import { fetchBooks } from '../fetchBooks';
import { handleModalWindow } from '../modal';

const mainTitleEl = document.querySelector('.main__title-js');
const mainWraperEl = document.querySelector('.main__list-js');
let idBook = 0;

export const showAllCategories = () => {
  mainTitleEl.innerHTML =
    ' Best Sellers <span class="main__title--color-purple">Books</span>';
  feachAllCategories();
};

showAllCategories();

const makeMarkupAllCategories = categories => {
  return categories
    .map(category => {
      return `
           <li class='all-categories__item'>
           <h3 class='category-books__title'>${category.list_name}</h3>
            <ul class='category-books__list-js card-set'>
           ${makeMarkupGategory(category.books)}
           </ul>
           <button class="load-more-js" type="button">see more</button>
           </li>   
      `;
    })
    .join('');
};

export const makeMarkupGategory = category => {
  return category
    .map(book => {
      return `
        <li class='category-books__item card-set__item'>
         <a href="/" class='category-books__link'>
          <img
            class='category-books__img'
            src='${book.book_image}'
            alt='book'
            data-id="${book._id}"
           loading="lazy"
          />
          <div class='category-books__wrapper'>
          <p class='category-books__text'>quick view</p>
          </div>
          </a>
          <p class='category-books__name' >${checkLengthBookTitle(
            book.title
          )}</p>
          <p class='category-books__author'>${book.author}</p>
        </li>
      `;
    })
    .join('');
};

async function feachAllCategories() {
  try {
    const categories = await fetchBooks.getBestSellers();
    mainWraperEl.innerHTML = makeMarkupAllCategories(categories);

    const seeMoreBtnEl = document.querySelectorAll('.load-more-js');
    const bookslinkEl = document.querySelectorAll('.category-books__link');

    seeMoreBtnEl.forEach(el => {
      el.addEventListener('click', handleSeeMoreBtnClick);
    });

    bookslinkEl.forEach(el => {
      el.addEventListener('click', handleImgClick);
    });
  } catch (error) {
    console.log(error);
  }
}

const handleImgClick = event => {
  event.preventDefault();
  idBook = event.target.dataset.id;

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  handleModalWindow(idBook);
};

const handleSeeMoreBtnClick = event => {
  event.target.classList.add('visually-hidden');
};

export const checkLengthBookTitle = title => {
  if (title.length > 19) {
    return `${title.slice(0, 18)}...`;
  }

  return title;
};

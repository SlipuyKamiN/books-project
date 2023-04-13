import { fetchBooks } from '../fetchBooks';
import { handleModalWindow } from '../modal';

const mainTitleEl = document.querySelector('.main__title-js');
const mainWraperEl = document.querySelector('.main__list-wrapper-js');
let idBook = 0;

export const showAllCategories = () => {
  mainTitleEl.innerHTML =
    ' Best Sellers <span class="main__title--color-purple">Books</span>';
  feachAllCategories();
};
showAllCategories();

const makeMarkupAllCategories1 = categories => {
  return categories
    .map(category => {
      return `
           <li class='all-categories__item'>
           <h3 class='category-books__title'>${category.list_name}</h3>
            <ul class='categoty-books__list-js card-set'>
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
          <img
            class='category-books__img'
            src='${book.book_image}'
            alt='book'
            data-id="${book._id}"
           loading="lazy"
          />
          <p class='category-books__name' >${book.title}</p>
          <p class='category-books__author'>${book.author}</p>
        </li>
      `;
    })
    .join('');
};

const makeMarkupAllCategories = categories => {
  return `<ul class='all-categories__list'>
           ${makeMarkupAllCategories1(categories)} 
         </ul>
    `;
};

async function feachAllCategories() {
  try {
    const categories = await fetchBooks.getBestSellers();
    mainWraperEl.innerHTML = makeMarkupAllCategories(categories);

    const seeMoreBtnEl = document.querySelectorAll('.load-more-js');
    const booksListEl = document.querySelectorAll('.categoty-books__list-js');

    seeMoreBtnEl.forEach(el => {
      el.addEventListener('click', handleSeeMoreBtnClick);
    });

    booksListEl.forEach(el => {
      el.addEventListener('click', handleImgClick);
    });
  } catch (error) {
    console.log(error);
  }
}

const handleImgClick = event => {
  idBook = event.target.dataset.id;
  console.log(idBook);

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  handleModalWindow(idBook);
};
const handleSeeMoreBtnClick = event => {
  event.target.classList.add('visually-hidden');
};

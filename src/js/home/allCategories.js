import Notiflix from 'notiflix';
import { fetchBooks } from '../fetchBooks';
import { handleModalWindow } from '../modal';
import { drawCategory } from '../categories';

const mainTitleEl = document.querySelector('.main__title-js');
const mainWraperEl = document.querySelector('.main__list-js');
let currentRenderWidth = window.innerWidth;
let amountRenderBooks = 0;
let idBook = 0;
let title = 0;

const currentWindowWidth = () => {
  if (currentRenderWidth < 768) {
    amountRenderBooks = 1;
  } else if (currentRenderWidth >= 768 && currentRenderWidth < 1440) {
    amountRenderBooks = 3;
  } else {
    amountRenderBooks = 5;
  }
};

const validationQuery = query => {
  if (query.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there was an error on the server. Please try again.'
    );
    return;
  }

  for (let i = 0; i < query.length; i += 1) {
    const element = query[i];
    if (element.books.length === 0) {
      const fff = document.querySelector('.category-books__title');
      console.log(fff);
      Notiflix.Notify.info(
        `Sorry, but no books found by category ${element.list_name}.`
      );
    }
  }
};

const makeMarkupAllCategories = categories => {
  return categories
    .map(category => {
      return `
           <li class='all-categories__item'>
           <h4 class='category-books__title'>${category.list_name}</h4>
            <ul class='category-books__list-js card-set'>
           ${makeMarkupGategory(category.books)}
           </ul>
           <button class="load-more-js" type="button" data-category="${
             category.list_name
           }">see more</button>
           </li>
      `;
    })
    .join('');
};

export const makeMarkupGategory = category => {
  return trimArrayBooks(category)
    .map(book => {
      return `
      <li class='category-books__item'>
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
        <h3 class='category-books__name' >${checkLengthBookTitle(
          book.title,
          18
        )}</h3>
        <p class='category-books__author'>${checkLengthBookTitle(
          book.author,
          29
        )}</p>
      </li>
    `;
    })
    .join('');
};

async function feachAllCategories() {
  try {
    const categories = await fetchBooks.getBestSellers();
    validationQuery(categories);
    mainWraperEl.innerHTML = makeMarkupAllCategories(categories);

    const seeMoreBtnEl = document.querySelectorAll('.load-more-js');
    const bookCategoryEl = document.querySelectorAll('.category-books__item');

    addEventListenerForBook(bookCategoryEl);
    addEventListenerForBtn(seeMoreBtnEl);
  } catch (error) {
    console.log(error);
  }
}

export const showAllCategories = () => {
  mainTitleEl.innerHTML =
    ' Best Sellers <span class="main__title--color-purple">Books</span>';
  feachAllCategories();
};

const handleImgClick = event => {
  event.preventDefault();
  idBook = event.target.dataset.id;

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  handleModalWindow(idBook);
};

const handleSeeMoreBtnClick = event => {
  title = event.target.dataset.category;

  setCurrentCategory(title);
  drawCategory(title);
};

export const checkLengthBookTitle = (title, length) => {
  if (title.length > length) {
    return `${title.slice(0, length)}...`;
  }

  return title;
};

export const addEventListenerForBook = book => {
  book.forEach(el => {
    el.addEventListener('click', handleImgClick);
  });
};

const addEventListenerForBtn = category => {
  category.forEach(el => {
    el.addEventListener('click', handleSeeMoreBtnClick);
  });
};

const setCurrentCategory = title => {
  const categoriesListChildren = document.querySelector(
    '.categories-list-js'
  ).children;
  for (let i = 0; i < categoriesListChildren.length; i += 1) {
    const category = categoriesListChildren[i];

    category.firstElementChild.classList.remove('selected-categories');

    if (category.textContent.trim() === title.trim()) {
      category.firstElementChild.classList.add('selected-categories');
    }
  }
};

const trimArrayBooks = category => {
  if (amountRenderBooks === 1) {
    category.splice(1, 4);
  } else if (amountRenderBooks === 3) {
    category.splice(3, 2);
  } else {
    category;
  }
  return category;
};

currentWindowWidth();
showAllCategories();

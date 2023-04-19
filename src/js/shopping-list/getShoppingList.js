const shoppingList = document.querySelector('.shopping-main__list-js');
const emptyList = document.querySelector('.empty-list');

let dataBooks = localStorage.getItem('books-data');

try {
  dataBooks = JSON.parse(dataBooks);
} catch (error) {
  console.log(error);
}

const renderShoppingList = dataBooks => {
  if (Array.isArray(dataBooks)) {
    const cardMarkup = createCardMarkup(dataBooks);
    shoppingList.insertAdjacentHTML('beforeend', cardMarkup);
    shoppingList.addEventListener('click', removeCardMarkup);
  } else {
    shoppingList.classList.add('visually-hidden');
    emptyList.classList.remove('visually-hidden');
  }
};

// pagination
const renderPage = selectedPage => {
  // console.log(dataBooks);
  selectedPage = Number(selectedPage);
  let firstBookOnPage = null;

  selectedPage === 1
    ? (firstBookOnPage = selectedPage - 1)
    : (firstBookOnPage = (selectedPage - 1) * 3);

  const booksPerPage = dataBooks.slice(firstBookOnPage, firstBookOnPage + 3);
  // console.dir(booksPerPage);
  renderShoppingList(booksPerPage);
};

// const handleSelectPageBtn = event => {
//   const selectedPage = event.target.textContent;
// };

renderPage('1');
// pagination

function createCardMarkup(dataBooks) {
  if (!dataBooks || dataBooks.length === 0) {
    shoppingList.classList.add('visually-hidden');
  }
  if (dataBooks.length > 0) {
    emptyList.classList.add('visually-hidden');
    shoppingList.classList.remove('visually-hidden');

    return dataBooks
      .map(book => {
        const amazonUrl = book.buy_links.find(
          link => link.name === 'Amazon'
        ).url;
        const appleBooksUrl = book.buy_links.find(
          link => link.name === 'Apple Books'
        ).url;
        const barnesAndNobleUrl = book.buy_links.find(
          link => link.name === 'Barnes and Noble'
        ).url;

        const descriptionlength = book.description.length > 0;
        const style = descriptionlength ? 'margin-bottom: 20px' : '';

        return `<li class="shopping__item shopping__item-mobile" data-id=${
          book._id
        }>
            <button type="button" data-action='delete' value="remove" class="shopping-button shopping-button-js">
              <svg class="shopping-button__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
            </button>
      <div class='shopping-mobale' >
            <div class="flex-box-mobale" style='${style}'>
                <figure class="shopping__box">
                  <picture>
                    <img
                      src="${book.book_image}"
                      alt="book"
                      class="shopping__img"
                      loading="lazy"
                    />
                  </picture>
                  <figcaption class='shopping__author shopping__author-mobile'>${
                    book.author
                  }</figcaption>
                </figure>
                <div class="flex-box__text-mobale">
                  <h2 class="shopping__title">${book.title}</h2>
                  <p class="shopping__titleText">${book.list_name}</p>
                  <div class='shops-box shops-box-mobile'>
                    <ul class="shops-list">
                    <li>
                      <a
                        class="shops-list__link amazon"
                        href="${amazonUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <img class='shops-list__img' srcset="
          ${require('../../images/modal/image-1@1x.png')} 48w,
          ${require('../../images/modal/image-1@2x.png')} 96w,
        "
        sizes="48px" src="${require('../../images/modal/image-1@1x.png')}" width="48" height="15" />
                      </a>
                    </li>
                    <li>
                      <a
                        class="shops-list__link"
                        href="${appleBooksUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <img class='shops-list__img' srcset="
          ${require('../../images/modal/image-2@1x.png')} 28w,
          ${require('../../images/modal/image-2@2x.png')} 56w,
        "
        sizes="28px" src="${require('../../images/modal/image-2@1x.png')}" width="28" height="27" />
                      </a>
                    </li>
                    <li>
                      <a
                        class="shops-list__link"
                        href="${barnesAndNobleUrl}"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                      <img class='shops-list__img' srcset="
          ${require('../../images/modal/image-3@1x.png')} 32w,
          ${require('../../images/modal/image-3@2x.png')} 64w,
        "
        sizes="32px" src="${require('../../images/modal/image-3@1x.png')}" width="32" height="30" />
                      </a>
                    </li>
                  </ul>
                  </div>
                  </div>
                </div>
                <p  class='shopping__text shopping__text-mobale' >${
                  book.description
                }</p>
            </div>
      </div>

      <div class='shopping-tablet'>
        <div class='flex-box-tablet'>
                    <img
                      src="${book.book_image}"
                      alt="book"
                      class="shopping__img"
                      loading="lazy"
                    />
            <div class="flex-box__text-tablet">
                  <div class='flex-box__information'>
                    <h2 class="shopping__title">${book.title}</h2>
                    <p class="shopping__titleText">${book.list_name}</p>
                    <p class='shopping__text'>${book.description}</p>
                  </div>
                  <div class="shopping-box-tablet">
                    <p class='shopping__author'>${book.author}</p>
                    <ul class="shops-list">
                      <li>
                        <a
                          class="shops-list__link amazon"
                          href="${amazonUrl}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        <img class='shops-list__img' srcset="
                        ${require('../../images/modal/image-1@1x.png')} 48w,
                        ${require('../../images/modal/image-1@2x.png')} 96w,
                        "
                        sizes="48px" src="${require('../../images/modal/image-1@1x.png')}" width="48" height="15" />
                        </a>
                      </li>
                      <li>
                        <a
                          class="shops-list__link"
                          href="${appleBooksUrl}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        <img class='shops-list__img' srcset="
                        ${require('../../images/modal/image-2@1x.png')} 28w,
                        ${require('../../images/modal/image-2@2x.png')} 56w,
                        "
                        sizes="28px" src="${require('../../images/modal/image-2@1x.png')}" width="28" height="27" />
                        </a>
                      </li>
                      <li>
                        <a
                          class="shops-list__link"
                          href="${barnesAndNobleUrl}"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        <img class='shops-list__img' srcset="
                        ${require('../../images/modal/image-3@1x.png')} 32w,
                        ${require('../../images/modal/image-3@2x.png')} 64w,
                        "
                        sizes="32px" src="${require('../../images/modal/image-3@1x.png')}" width="32" height="30" />
                        </a>
                      </li>
                    </ul>
                  </div>
            </div> 
        </div>
      </div>
      </li>`;
      })
      .join('');
  }
}

function removeCardMarkup(event) {
  if (event.target.dataset.action !== 'delete') {
    return;
  }

  const parentNode = event.target.closest('.shopping__item');
  const bookToRemoveId = parentNode.dataset.id;

  dataBooks = dataBooks.filter(book => book._id !== bookToRemoveId);

  saveToLocalStorage();
  parentNode.remove();
  if (!dataBooks || dataBooks.length === 0) {
    emptyList.classList.remove('visually-hidden');
  }
  if (dataBooks.length > 0) {
    emptyList.classList.add('visually-hidden');
  }
}

function saveToLocalStorage() {
  localStorage.setItem('books-data', JSON.stringify(dataBooks));
}

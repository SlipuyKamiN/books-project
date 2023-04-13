const shoppingList = document.querySelector('.shopping-main__list-js');
const button = document.querySelector('.shopping-button-js');

let dataBooks = localStorage.getItem('books-data');
dataBooks = JSON.parse(dataBooks);

const cardMarkup = createCardMarkup(dataBooks);

shoppingList.insertAdjacentHTML('beforeend', cardMarkup);
shoppingList.addEventListener('click', removeCardMarkup);

// const mediaQuery = window.matchMedia('(max-width: 375px)');
// mediaQuery.addListener(createCardMarkup);

function createCardMarkup(dataBooks) {
  if (!dataBooks || dataBooks.length === 0) {
    return ` <div>
          <p class="shopping-empty"> This page is empty, add some books and proceed to order.</p>
          <picture>
                <!-- desktop -->
                <source
                  media="(min-width:1440px)"
                  srcset=""
                  type="image/webp"
                />
                <source
                  media="(min-width:1440px)"
                  srcset=""
                  type="image/jpg"
                />
                <!-- tablet -->
                <source
                  media="(min-width:768px)"
                  srcset=""
                  type="image/webp"
                />
                <source
                  media="(min-width:768px)"
                  srcset=""
                  type="image/jpg"
                />
                <!-- phone -->
                <source
                  media="(max-width:767px)"
                  srcset=""
                  type="image/webp"
                />
                <source
                  media="(max-width:767px)"
                  srcset=""
                  type="image/jpg"
                />
                <img
                  src="../images/shopingImg/mob1.jpg"
                  alt="books"
                  width="265"
                  height="198"
                  loading="lazy"
                />
              </picture>
          </div > `;
  }
  if (dataBooks.length > 0) {
    return dataBooks
      .map(book => {
        return `<li class="shopping__item" id=${book._id}>
        <button type="button" data-action='delete' value="remove" class="shopping-button shopping-button-js">
          <svg class="shopping-button__icon" width="16" height="16">
            <use href="./images/icons.svg#icon-delete"></use>
          </svg>
        </button>
        <div class="flex-box">
          <figure class="shopping__box">
            <picture>
              <img
                src="${book.book_image}"
                alt=""
                
                class="shopping__img"
                loading="lazy"
              />
            </picture>
            <figcaption class='shopping__author'>${book.author}</figcaption>
          </figure>

          <div class="flex-box__text">
            <h2 class="shopping__title">${book.title}</h2>
            <p class="shopping__titleText">Hardcover fiction</p>

            <ul class="shops-list">
              <li>
                <a
                  class="shops-list__link"
                  href=""
                  aria-label=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </li>
              <li>
                <a
                  class="shops-list__link"
                  href=""
                  aria-label=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </li>
              <li>
                <a
                  class="shops-list__link"
                  href=""
                  aria-label=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p class="shopping__text">
          ${book.description}
        </p>
      </li>
    `;
      })
      .join('');
  }
}

function removeCardMarkup(event) {
  if (event.target.dataset.action !== 'delete') {
    return;
  }

  const parentNode = event.target.closest('.shopping__item');
  const bookToRemoveId = parentNode.id;

  dataBooks = dataBooks.filter(book => book._id !== bookToRemoveId);

  saveToLocalStorage();
  parentNode.remove();
}

function saveToLocalStorage() {
  localStorage.setItem('books-data', JSON.stringify(dataBooks));
}

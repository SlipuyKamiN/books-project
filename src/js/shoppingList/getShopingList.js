const ulList = document.querySelector('.shopping-list-js');
const button = document.querySelector('shopping-button-js');

let dataBooks = localStorage.getItem('dataBooks');
dataBooks = JSON.parse(dataBooks);

const cardMarkup = createCardMarkup(dataBooks);

ulList.insertAdjacentHTML('beforeend', cardMarkup);
ulList.addEventListener('click', removeCardMarkup);

// const mediaQuery = window.matchMedia('(max-widts: 375px)');
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
                width="98"
                height="139"
                class="shopping__img"
                loading="lazy"
              />
            </picture>
            <figcaption>${book.author}</figcaption>
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

  const parenNode = event.target.closest('.shopping__item');
  const id = parenNode.id;

  dataBooks = dataBooks.filter(book => book._id !== id);

  saveToLocalStorage();
  parenNode.remove();
}

function saveToLocalStorage() {
  localStorage.setItem('dataBooks', JSON.stringify(dataBooks));
}

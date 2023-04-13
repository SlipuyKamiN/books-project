const shoppingList = document.querySelector('.shopping-main__list-js');
const button = document.querySelector('.shopping-button-js');
const emptyList = document.querySelector('.empty-list');

let dataBooks = localStorage.getItem('books-data');
dataBooks = JSON.parse(dataBooks);

const cardMarkup = createCardMarkup(dataBooks);

shoppingList.insertAdjacentHTML('beforeend', cardMarkup);
shoppingList.addEventListener('click', removeCardMarkup);

// const mediaQuery = window.matchMedia('(max-width: 375px)');
// mediaQuery.addListener(createCardMarkup);

const needWidth = window.matchMedia('(max-width: 375px)').matches;
// const desktopMarkup = Тут шаблон для ПК;
// const mobileMarkup = Тут шаблон для мобілки;
// const func = needWidth => {
//   if (!needWidth) {
//     // рендеримо mobileMarkup
//     document.body.style.backgroundColor = 'yellow';
//   } else {
//     // рендеримо desktopMarkup
//     document.body.style.backgroundColor = 'tomato';
//   }
// };
// console.log(needWidth);
// func(needWidth);

function createCardMarkup(dataBooks) {
  if (!dataBooks || dataBooks.length === 0) {
    shoppingList.classList.add('visually-hidden');
  }
  if (dataBooks.length > 0) {
    emptyList.classList.add('visually-hidden');
    shoppingList.classList.remove('visually-hidden');

    // if (window.matchMedia('(max-width: 375px)').matches) {
    return dataBooks
      .map(book => {
        return `<li class="shopping__item" id=${book._id}>
        <button type="button" data-action='delete' value="remove" class="shopping-button shopping-button-js">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
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
    // } else {
    //   return dataBooks
    //     .map(book => {
    //       return `<li class="shopping__item" id=${book._id}>
    //     <button type="button" data-action='delete' value="remove" class="shopping-button shopping-button-js">
    //       <svg class="shopping-button__icon" width="16" height="16">
    //         <use href="./images/icons.svg#icon-delete"></use>
    //       </svg>
    //     </button>
    //     <div class="flex-box">

    //       <div class="flex-box__text">
    //         <h2 class="shopping__title">${book.title}</h2>
    //         <p class="shopping__titleText">Hardcover fiction</p>

    //         <ul class="shops-list">
    //           <li>
    //             <a
    //               class="shops-list__link"
    //               href=""
    //               aria-label=""
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               class="shops-list__link"
    //               href=""
    //               aria-label=""
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               class="shops-list__link"
    //               href=""
    //               aria-label=""
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>

    //     <p class="shopping__text">
    //       ${book.description}
    //     </p>
    //   </li>
    // `;
    //     })
    //     .join('');
    // }
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

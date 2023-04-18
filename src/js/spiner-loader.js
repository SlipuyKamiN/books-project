export class Spiner {
  bookSpinerEl = document.querySelector('.spiner-js');

  show() {
    this.bookSpinerEl.classList.remove('is-hidden');
  }

  hide() {
    this.bookSpinerEl.classList.add('is-hidden');
  }

  getEl() {
    return this.bookSpinerEl;
  }
}

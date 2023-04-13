import { fundArray } from './suupport/fund-array';
import { markupCardFund } from './suupport/markup-support';

const supportListEl = document.querySelector('.support__list');
let position = 0;

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const markupSetFunds = fundArray
  .map((el, i) => {
    position = addLeadingZero(i + 1);

    return markupCardFund(el, position);
  })
  .join('');

supportListEl.innerHTML = markupSetFunds;

export const markupCardFund = (
  { title, url, img, img2 },
  position
) => `<li class="support__list-item swiper-slide">
  <p class="support__number">${position}</p>
  <a class="support__link" href="${url}" target="_blank" rel="noopener noreferrer nofollow">
    <img
      srcset="${img} 1x, ${img2} 2x"
      src="${img}"
      alt="${title}"
      width="149"
      loading="lazy"
    />
  </a>
</li>`;

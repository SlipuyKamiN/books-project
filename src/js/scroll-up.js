import throttle from 'lodash.throttle';

const offset = 100;
const scrollUp = document.querySelector('.scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// updateDashoffset
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;
  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener(
  'scroll',
  throttle(() => {
    updateDashoffset();
    if (getTop() > offset) {
      scrollUp.classList.add('scroll-up--active');
    } else {
      scrollUp.classList.remove('scroll-up--active');
    }
  }, 50)
);

// click
scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});



const offset = 100;
const scrollUp = document.querySelector(".scroll-up");
const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
const pathLength = scrollUpSvgPath.getTotalLength();


scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";



const getTop = () => window.pageYOffset || document.documentElement.scrollTop;


// updateDashoffset
const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height);
    scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};


// onScroll
window.addEventListener("scroll", () => {
    updateDashoffset();
    if (getTop() > offset) {
        scrollUp.classList.add("scroll-up--active");
    } else {
        scrollUp.classList.remove("scroll-up--active");
}
});


// click
scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     весь  попередный код
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//     window.onload = () => {
//     window.onscroll = function (e) {
//         let winY = window.scrollY;
//         if (winY > 300) {
//             progressBar();
//             scrollbarAnimation();
//             winY = null;
//         }
//     };
//     const scrollBtn = document.querySelector('.isShowBtn');
//     window.onscroll = () => {
//         if (window.scrollY > 400) {
//             scrollBtn.classList.remove('isShowBtn_hide');
//         } else if (window.scrollY < 400) {
//             scrollBtn.classList.add('isShowBtn_hide');
//         }
//     };
//     scrollBtn.onclick = () => {
//         window.scrollTo(0, 0);
//     }
// };



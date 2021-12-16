const hamburgerBtn = document.querySelector('.header__hamburger');
const headerNav = document.querySelector('.header__nav');
const layout = document.querySelector('.header__layout');

hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
     layout.classList.toggle('open');
    headerNav.classList.toggle('open');
})
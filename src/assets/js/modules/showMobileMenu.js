const showMobileMenu = () => {
  const btn = document.querySelector('#show-menu'),
        mobileMenu = document.querySelector('#header-navbar');
  let display = window.getComputedStyle(mobileMenu, null).display;

  btn.addEventListener('click', () => {
    display = (display === 'flex') ? 'none' : 'flex';
    mobileMenu.style.display = display;         
    mobileMenu.classList.toggle('show-menu');
  });
};
export default showMobileMenu;
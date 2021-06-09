const scrollToUp = () => {
  const btnToUp = document.querySelector('.arrow-up'),
        header = document.querySelector('#header');
    
  btnToUp.addEventListener('click', (e) => {
    e.preventDefault();

    header.scrollIntoView({
      behavior: 'smooth'
    });
  });
};
export default scrollToUp;


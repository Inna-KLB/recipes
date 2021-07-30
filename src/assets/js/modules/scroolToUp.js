const scrollToUp = (mainContainer) => {
  const container = document.querySelector(mainContainer);

  const btnToUp = document.createElement('a');
  btnToUp.setAttribute('href', '#header');
  btnToUp.classList.add('arrow-up');
  btnToUp.innerHTML = `<ion-icon name="arrow-up-sharp"></ion-icon>`;
  container.append(btnToUp);

  const header = document.querySelector('#header');
    
  btnToUp.addEventListener('click', (e) => {
    e.preventDefault();

    header.scrollIntoView({
      behavior: 'smooth'
    });
  });
};
export default scrollToUp;


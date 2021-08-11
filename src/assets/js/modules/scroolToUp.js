// Создание стрелки наверх
const scrollToUp = () => {
  const container = document.querySelector('main');

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


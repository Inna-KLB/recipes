import createRecipePage from "./createRecipePage";
import addToFavorites from "./addToFavorites";

// Создание карточек с рецептами
const createRecipesCards = (recipes, startSlice, endSlice, link) => {
  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';
  
  for(let i = startSlice; i < endSlice; i++){            
    if(recipes[i]) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.style.backgroundImage = `url(${recipes[i].mainPhoto})`;

      let cardSubstrate = document.createElement('div');
      cardSubstrate.classList.add('card__substrate');
      cardSubstrate.innerHTML = `
        <h3 class="card__header">${recipes[i].name}</h3>
        <p class="card__description">${recipes[i].description}</p>
      `;

      let btnOpen = document.createElement('a');
      btnOpen.classList.add('btn', 'btn_red');
      btnOpen.setAttribute('href', 'recipe.html');
      btnOpen.textContent = 'Открыть';
      btnOpen.addEventListener('click', (e) => {
        e.preventDefault();
        createRecipePage(link, recipes[i], '.main-page');
      });
      
      let btnAddFavorite = document.createElement('button');
      btnAddFavorite.classList.add('add-fav');
      if(recipes[i].favorite === 'false') {
        btnAddFavorite.innerHTML = `<ion-icon name="heart-outline"></ion-icon>`;
      } else {
        btnAddFavorite.innerHTML = `<ion-icon name="heart"></ion-icon>`;
      }
      // Добавление/удаление в избранное
      btnAddFavorite.addEventListener('click', (e) => {
        let isFavorite = recipes[i].favorite;
        isFavorite = (recipes[i].favorite === 'false') ? 'true' : 'false';
        return addToFavorites(e.target, link, isFavorite, recipes[i].id)
        .then(status => {
          recipes[i].favorite = status;
        });
      });

      cardSubstrate.append(btnOpen);
      cardSubstrate.append(btnAddFavorite);

      card.append(cardSubstrate);
      cardsContainer.prepend(card);
    }
  } 
   
};
export default createRecipesCards;
import getData from "../services/getData";
import addToFavorites from "./addToFavorites";
import createRecipePage from "./createRecipePage";
import pagination from "./pagination";


const showAllRecipes = async(link, startSlice, endSlice) => {
  try {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('modal-substrate');
    statusMessage.innerHTML = `<img src='../img/spinner.gif' width='40vw'>`;
    cardsContainer.prepend(statusMessage);
  
    await getData(link)
      .then(recipes => {      
        for(let i = startSlice; i < endSlice; i++) {  
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
              createRecipePage(link, recipes[i].id, '.main-page');
            });
            
            let btnAddFavorite = document.createElement('button');
            btnAddFavorite.classList.add('add-fav');
            if(recipes[i].favorite === 'false') {
              btnAddFavorite.innerHTML = `
                <ion-icon name="heart-outline"></ion-icon>
              `;
            } else {
              btnAddFavorite.innerHTML = `
                <ion-icon name="heart"></ion-icon>
              `;
            }
            btnAddFavorite.addEventListener('click', () => {
              addToFavorites(recipes[i].favorite);
            });
    
            cardSubstrate.append(btnOpen);
            cardSubstrate.append(btnAddFavorite);
    
            card.append(cardSubstrate);
            cardsContainer.append(card);
          }
        }
    })
    cardsContainer.removeChild(statusMessage);
  }
  catch {
    return;
  }

};
export default showAllRecipes;
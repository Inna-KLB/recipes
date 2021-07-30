import getData from "../services/getData";
import patchData from "../services/patchData";
import addToFavorites from "./addToFavorites";
import createRecipePage from "./createRecipePage";
import scrollToUp from "./scroolToUp";
import toggleContent from "./toggleContent";
import createRecipesCards from "./createRecipesCards";



const generateRecipes = (recipes, startSlice, endSlice, link, oldContainer) => {
  try {
    let mainContainer;
    if(oldContainer) {
      oldContainer.remove();
    }
    try {
      mainContainer = document.querySelector('.main-page');
      if(!mainContainer) {
        mainContainer = document.createElement('main');
        mainContainer.classList.add('main-page');
        const header = document.querySelector('.header');
        header.after(mainContainer);
      }
    }
    finally {
      mainContainer.innerHTML = `
        <section class="search">
          <div class="search-standart">
            <input type="text" class="search__input" placeholder="Название блюда">
            <button class="btn btn_blue">Поиск</button>
          </div>
          <button class="btn btn__advanced-search">Расширенный поиск <ion-icon name="chevron-down-outline"></ion-icon></button>
          <div class="search-advanced">
            <input type="text" id="desired-ingredients" class="search__input" placeholder="Желаемые ингредиенты">
            <input type="text" id="unwanted-ingredients" class="search__input" placeholder="Нежелаемые ингредиенты">
          </div>
        </section>    
        <div class="cards flex"> </div>
        <ul class="pagination"> </ul>`;
        createRecipesCards(recipes, startSlice, endSlice, link);
        scrollToUp('.main-page');
        toggleContent('.btn__advanced-search', '.search-advanced', '.btn__advanced-search ion-icon');  
    }    
    console.log('from:', recipes);  
  }
  catch {
    console.log('It is not that page');
  }
};
export default generateRecipes;
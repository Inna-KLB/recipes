import scrollToUp from "./scroolToUp";
import toggleContent from "./toggleContent";
import createRecipesCards from "./createRecipesCards";
import search from "./search";
import pagination from "./pagination";


const createMainPage = (recipes, startSlice, endSlice, link, oldContainer) => {
  try {
    window.location.hash = '/главная_страница';
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
        header.scrollTop = 0; 
      }
    }
    finally {
      mainContainer.innerHTML = `
        <section class="search">
          <div class="search-standart">
            <input type="text" id="name" class="search__input" placeholder="Название блюда">
            <button id="search" class="btn btn_blue">Поиск</button>
          </div>
          <button class="btn btn__advanced-search">Расширенный поиск <ion-icon name="chevron-down-outline"></ion-icon></button>
          <div class="search-advanced">
            <input type="text" id="desired-ingredients" class="search__input" placeholder="Желаемые ингредиенты">
          </div>
        </section>    
        <div class="cards flex"> </div>
        <ul class="pagination"> </ul>`;
        createRecipesCards(recipes, startSlice, endSlice, link);
        scrollToUp('.main-page');
        toggleContent('.btn__advanced-search', '.search-advanced', '.btn__advanced-search ion-icon');  
        search(recipes, endSlice, link);
        let paginationItemsCount = Math.ceil(recipes.length / endSlice); 
        pagination(recipes, paginationItemsCount, endSlice, link);
    }    
  }
  catch(error) {
    console.log(error);
  }
};
export default createMainPage;
import createMainPage from "./createMainPage";
import pagination from "./pagination";
import createRecipesCards from "./createRecipesCards";


const showCategory = (recipes, recipesOnPages, link) => {
  const categories = document.querySelectorAll('.navbar-menu__item'),
        showFavorite = document.querySelector('#show-favorites');
  
  showFavorite.addEventListener('click', () => {
    let sortRecipes = [];
    let container = document.querySelector('.recipe-page') || document.querySelector('.add-recipe');
    for(let i = 0; i < recipes.length; i++) {
      if(recipes[i].favorite === 'true') {
        sortRecipes.push(recipes[i]);     
      }
    }
    let paginationItemsCount = Math.ceil(sortRecipes.length / recipesOnPages);    
    createMainPage(sortRecipes, 0, recipesOnPages, link, container);    
    pagination(sortRecipes, paginationItemsCount, recipesOnPages, link);
  });

  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      let sortRecipes = [];
      let container = document.querySelector('.recipe-page') || document.querySelector('.add-recipe');
      const valueCategory = e.target.textContent;
      for(let i = 0; i < recipes.length; i++) {
        for(let k = 0; k < recipes[i].category.length; k++) {
          if(recipes[i].category[k] == valueCategory) {
            sortRecipes.push(recipes[i]);     
          }
        }
      }
      let paginationItemsCount = Math.ceil(sortRecipes.length / recipesOnPages);   
      
      createMainPage(sortRecipes, 0, recipesOnPages, link, container);  
      pagination(sortRecipes, paginationItemsCount, recipesOnPages, link);
    });
  });
};
export default showCategory;
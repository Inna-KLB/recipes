import createMainPage from "./createMainPage";
import pagination from "./pagination";


// Функцию показа рецептов по категориям
const showCategory = (recipes, recipesOnPages, link) => {
  const categories = document.querySelectorAll('.navbar-menu__item'),
        showFavoriteBtns = document.querySelectorAll('.show-favorites'),
        header = document.querySelector('.header');

  // Показ рецептов в "Избранное"
  showFavoriteBtns.forEach(showFavorite => {
    showFavorite.addEventListener('click', () => {
      let sortRecipes = [];
      let container = document.querySelector('.recipe-page') || document.querySelector('.add-recipe');
      header.scrollTop = 0; 
      for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].favorite === 'true') {
          sortRecipes.push(recipes[i]);     
        }
      }
      createMainPage(sortRecipes, 0, recipesOnPages, link, container);    
      let paginationItemsCount = Math.ceil(sortRecipes.length / recipesOnPages);    
      pagination(sortRecipes, paginationItemsCount, recipesOnPages, link);
      window.location.hash = '/избранное';
    });
  });
  // Показ рецептов по категориям
  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      e.preventDefault();
      const active = document.querySelector('.active-item');
      if(active) {
        active.classList.remove('active-item');
      }
      category.classList.add('active-item');
      header.scrollTop = 0; 
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
      
      createMainPage(sortRecipes, 0, recipesOnPages, link, container);  
      let paginationItemsCount = Math.ceil(sortRecipes.length / recipesOnPages);   
      pagination(sortRecipes, paginationItemsCount, recipesOnPages, link);
      window.location.hash = `/${valueCategory}`;
    });
  });
};
export default showCategory;
import showAllRecipes from "./showAllRecipes";
import pagination from "./pagination";


const showCategory = (recipes, recipesOnPages, paginationItemsCount, link) => {
  const categories = document.querySelectorAll('.navbar-menu__item'),
        showFavorite = document.querySelector('#show-favorites'),
        recipePage = document.querySelector('.recipe-page'),
        addRecipePage = document.querySelector('.add-recipe');
        

  if(recipePage || addRecipePage){
    recipePage.style.display = 'none';
  }

  showFavorite.addEventListener('click', () => {
    let sortRecipes = [];
    for(let i = 0; i < recipes.length; i++) {
      if(recipes[i].favorite === 'true') {
        sortRecipes.push(recipes[i]);     
      }
    }
    console.log(sortRecipes);

    showAllRecipes(sortRecipes, 0, recipesOnPages, link);  
    pagination(sortRecipes, recipesOnPages);
  });

  categories.forEach(category => {
    category.addEventListener('click', (e) => {
      let sortRecipes = [];
      const valueCategory = e.target.textContent;
      for(let i = 0; i < recipes.length; i++) {
        for(let k = 0; k < recipes[i].category.length; k++) {
          if(recipes[i].category[k] == valueCategory) {
            sortRecipes.push(recipes[i]);     
          }
        }
      }
      console.log(sortRecipes);
      
      showAllRecipes(sortRecipes, 0, recipesOnPages, link);  
      pagination(sortRecipes, paginationItemsCount, recipesOnPages); 
    });
  });
};
export default showCategory;
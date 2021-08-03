import createRecipesCards from "./createRecipesCards";
import pagination from "./pagination";


const search = (recipes, recipesOnPages, link) => {
  const name = document.querySelector('#name'),
        desiredIngredients = document.querySelector('#desired-ingredients'),
        btnSearch = document.querySelector('#search'),
        paginationContainer = document.querySelector('.pagination');

  let warningNote = document.createElement('p');
  warningNote.classList.add('warning');
  warningNote.textContent = 'К сожалению, по вашему запросу ничего не найдено.';

  const searchRecipe = () => {
    let valueName = name.value.trim().toLowerCase(),
    sortRecipe = [],
    valueDesiredIngredients;

    if(desiredIngredients) {
      valueDesiredIngredients = desiredIngredients.value.toLowerCase().split(',');
    }
    // console.log(valueName);
    // console.log(valueDesiredIngredients, valueDesiredIngredients.length);

    if(valueName !== '' && valueDesiredIngredients[0] !== '') {
      let arrayToSort = [];
      console.log('both');
      for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].name.match(valueName)) {
          arrayToSort.push(recipes[i]);
          console.log('name, arrayToSort:', arrayToSort);
        }
      }

      for(let i = 0; i < arrayToSort.length; i++) {
        for(let j = 0; j < arrayToSort[i].ingredients.length; j++) {
          valueDesiredIngredients.forEach(ingredient => {
            if(arrayToSort[i].ingredients[j].name.match(ingredient)) {
              sortRecipe.push(arrayToSort[i]);
              console.log('ingredient, arrayToSort:', sortRecipe);
            }
          });
        }   
      }
    } else if(valueName !== '' || valueDesiredIngredients[0] !== '') {
      console.log('one');
      for(let i = 0; i < recipes.length; i++) {
        if(valueName !== '' && recipes[i].name.match(valueName)) {
          sortRecipe.push(recipes[i]);
          console.log('name:', sortRecipe);
        }
        if(valueDesiredIngredients[0] !== '') {
          for(let j = 0; j < recipes[i].ingredients.length; j++) {
            valueDesiredIngredients.forEach(ingredient => {
              if(recipes[i].ingredients[j].name.match(ingredient)) {
                sortRecipe.push(recipes[i]);
                console.log('ingredient:', sortRecipe);
              }
            });
          
          }
        } 
      }
    }


    if(sortRecipe.length === 0) {
      console.log('test2');
      createRecipesCards(sortRecipe, 0, recipesOnPages, link);
      paginationContainer.style.display = 'none';
      paginationContainer.before(warningNote);
    } else {
      console.log(sortRecipe);
      console.log('test1');
      warningNote.remove();
      paginationContainer.style.display = '';
      let paginationItemsCount = Math.ceil(sortRecipe.length / recipesOnPages);    
      createRecipesCards(sortRecipe, 0, recipesOnPages, link);
      pagination(sortRecipe, paginationItemsCount, recipesOnPages, link);
      
    }
  };
  btnSearch.addEventListener('click', searchRecipe);

};
export default search;
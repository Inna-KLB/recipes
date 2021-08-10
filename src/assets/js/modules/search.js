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

  const searchIngredients = (array, sortArray, inputIngredients) => {
    let result = [],
        nameIngredients = [],
        strNameIngredients;

    for(let j = 0; j < array.ingredients.length; j++) {
      nameIngredients.push(array.ingredients[j].name);
      strNameIngredients = nameIngredients.join();
    }  
    for(let k = 0; k < inputIngredients.length; k++) {
      if(strNameIngredients.match(inputIngredients[k].trim())) {
        result.push('true');
      }     
    }  
    if(result.length === inputIngredients.length) {
      sortArray.push(array);
    }
  };
  
  const searchRecipe = () => {
    let valueName = name.value.trim().toLowerCase(),
    sortRecipe = [],
    valueDesiredIngredients;

    if(desiredIngredients) {
      valueDesiredIngredients = desiredIngredients.value.toLowerCase().split(',');
    }
    
    if(valueName !== '' && valueDesiredIngredients[0] !== '') {
      let arrayToSort = [];
      for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].name.match(valueName)) {
          arrayToSort.push(recipes[i]);
        }
      }

      for(let i = 0; i < arrayToSort.length; i++) {
        searchIngredients(arrayToSort[i], sortRecipe, valueDesiredIngredients);
      }
    } else if(valueName !== '' || valueDesiredIngredients[0] !== '') {
      for(let i = 0; i < recipes.length; i++) {
        if(valueName !== '' && recipes[i].name.match(valueName)) {
          sortRecipe.push(recipes[i]);
        }
        if(valueDesiredIngredients[0] !== '') {
          searchIngredients(recipes[i], sortRecipe, valueDesiredIngredients);
        } 
      }
    }


    if(sortRecipe.length === 0) {
      console.log('Нет рецептов');
      createRecipesCards(sortRecipe, 0, recipesOnPages, link);
      paginationContainer.before(warningNote);
      paginationContainer.style.display = 'none';
    } else {
      warningNote.remove();
      paginationContainer.style.display = '';
      let paginationItemsCount = Math.ceil(sortRecipe.length / recipesOnPages);    
      createRecipesCards(sortRecipe, 0, recipesOnPages, link);
      pagination(sortRecipe, paginationItemsCount, recipesOnPages, link);     
    }
  };

  btnSearch.addEventListener('click', () => {
    if(name.value === '' && desiredIngredients.value === '') {
      return;
    } else if(name.value === '' && !desiredIngredients) {
      return;
    } else {
      searchRecipe();
    }
  });
  name.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
      if(name.value === '' && desiredIngredients.value === '') {
        return;
      } else if(name.value === '' && !desiredIngredients) {
        return;
      } else {
        searchRecipe();
      }
    }
  });
  desiredIngredients.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
      if(name.value === '' && desiredIngredients.value === '') {
        return;
      } else if(name.value === '' && !desiredIngredients) {
        return;
      } else {
        searchRecipe();
      }
    }
  });

};
export default search;
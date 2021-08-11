import createRecipesCards from "./createRecipesCards";
import pagination from "./pagination";

// Поиск рецепта
const search = (recipes, recipesOnPages, link) => {
  const name = document.querySelector('#name'),
        desiredIngredients = document.querySelector('#desired-ingredients'),
        btnSearch = document.querySelector('#search'),
        paginationContainer = document.querySelector('.pagination');
  
  // Создание предупреждающей надписи  
  let warningNote = document.createElement('p');
  warningNote.classList.add('warning');
  warningNote.textContent = 'К сожалению, по вашему запросу ничего не найдено.';
 
  // Функция поиска по ингредиентам
  const searchIngredients = (array, sortArray, inputIngredients) => {
    let result = [],
        nameIngredients = [],
        strNameIngredients;
    // Создаем массив названий всех ингредиентов и переводим в строку
    for(let j = 0; j < array.ingredients.length; j++) {
      nameIngredients.push(array.ingredients[j].name);
      strNameIngredients = nameIngredients.join();
    }  
    // Ищем совпадение по нужным ингредиентам в строке, если они есть, то помещаем в промежуточный массив 'true'
    for(let k = 0; k < inputIngredients.length; k++) {
      if(strNameIngredients.match(inputIngredients[k].trim())) {
        result.push('true');
      }     
    }  
    // Сравниваем длину промежуточного массива и массива с запрошенными ингредиентами, если они равный, то данны рецепт помешаем в отсортированный массив 
    if(result.length === inputIngredients.length) {
      sortArray.push(array);
    }
  };
  
  const searchRecipe = () => {
    let valueName = name.value.trim().toLowerCase(),
    sortRecipe = [],
    valueDesiredIngredients;
    
    // Если рользователь открыл расширенный поиск, то определяем переменную
    if(desiredIngredients) {
      valueDesiredIngredients = desiredIngredients.value.toLowerCase().split(',');
    }
    // Поиск по обоим переменным - названию и ингредиентам
    if(valueName !== '' && valueDesiredIngredients[0] !== '') {
      let arrayToSort = [];
      // Поиск по имени
      for(let i = 0; i < recipes.length; i++) {
        if(recipes[i].name.match(valueName)) {
          arrayToSort.push(recipes[i]);
        }
      }
      // Поиск по ингредиентам
      for(let i = 0; i < arrayToSort.length; i++) {
        searchIngredients(arrayToSort[i], sortRecipe, valueDesiredIngredients);
      }
    }
    // Поиск по одной из перемынных - названию или ингредиентам
    else if(valueName !== '' || valueDesiredIngredients[0] !== '') {
      // Поиск по названи.
      for(let i = 0; i < recipes.length; i++) {
        if(valueName !== '' && recipes[i].name.match(valueName)) {
          sortRecipe.push(recipes[i]);
        } 
        // Поиск по ингредиентам
        if(valueDesiredIngredients[0] !== '') {
          searchIngredients(recipes[i], sortRecipe, valueDesiredIngredients);
        } 
      }
    }

    // Если рецептов нет, то показывается оповещение
    if(sortRecipe.length === 0) {
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
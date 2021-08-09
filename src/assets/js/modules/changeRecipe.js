import getData from "../services/getData";
import patchData from "../services/patchData";
import createAddrecipePage from "./createAddrecipePage";
import createRecipePage from "./createRecipePage";
import createLists from "./createLists";
import checkInputs from "./checkInputs";
import showModal from "./showModal";
import createCategoryArray from "./createRecipe/createCategoryArray";
import createIngredientsArray from "./createRecipe/createIngredientsArray";
import createInstructionsArray from "./createRecipe/createInstructionsArray";
import createMainImgLink from "./createRecipe/createMainImgLink";


const changeRecipe = async(link, idRecipe) => {
  let currentRecipe; 
  console.log(idRecipe);
  await getData(link)
  .then(recipes => {
    recipes.forEach(recipe => {
      if(idRecipe === recipe.id) {
        currentRecipe = recipe;
      }
    });
  })
  const container = document.querySelector('main');
  createAddrecipePage(container, link);
  const recipeName = document.querySelector('.header__input'),
        recipePortions = document.querySelector('#portions'),
        recipeTimeHours = document.querySelector('#time_hours'),
        recipeTimeMinutes = document.querySelector('#time_minutes'),
        recipeCategories = document.querySelectorAll('input[type="checkbox"]'),
        recipeMainPhotoLink = document.querySelector('.recipe-info__image .warning'),
        recipeDescription = document.querySelector('#description'),
        oldBtnChange = document.querySelector('#save-recipe'),
        parentOldBtnChange = document.querySelector('.right-context');

  let arrInstruction = [],
      mainImgUrl;
 
  let btnChange = document.createElement('button');
  btnChange.setAttribute('id', 'change-recipe');
  btnChange.classList.add('btn', 'btn_red');
  btnChange.innerHTML = '<ion-icon name="pencil-sharp"></ion-icon> Изменить рецепт';
  parentOldBtnChange.replaceChild(btnChange, oldBtnChange);
  
  recipeName.value = currentRecipe.name;
  recipePortions.value = currentRecipe.portions;
  recipeTimeHours.value = currentRecipe.time.hours;
  recipeTimeMinutes.value = currentRecipe.time.minutes;
  recipeMainPhotoLink.textContent = currentRecipe.mainPhoto;
  recipeDescription.value = currentRecipe.description;


  for(let i = 0; i < recipeCategories.length; i++) {
    for(let k = 0; k < currentRecipe.category.length; k++) {
      if(recipeCategories[i].value === currentRecipe.category[k]) {
        recipeCategories[i].setAttribute('checked', 'true');
      }
    }
  }

  createLists('.recipe-ingredients__list', currentRecipe.ingredients.length - 1);
  createLists('.recipe-instruction__list', currentRecipe.instructions.length - 1);

  for(let i = 0; i < currentRecipe.ingredients.length; i++) {
    const recipeIngredients = document.querySelectorAll('.recipe-ingredients__list-item'),
          name = recipeIngredients[i].querySelector('.ingredient__name'),
          number = recipeIngredients[i].querySelector('.ingredient__number'),
          values = recipeIngredients[i].querySelectorAll('.ingredient__value option');
    name.value = currentRecipe.ingredients[i].name;
    number.value = currentRecipe.ingredients[i].quantity;   
    for(let k = 0; k < values.length; k++) {
      if(values[k].value === currentRecipe.ingredients[i].value) {
        values[k].setAttribute('selected', 'true');
      }
    } 
    console.log(currentRecipe.ingredients[i].name, '-', currentRecipe.ingredients[i].quantity, currentRecipe.ingredients[i].value);

  }

  for(let i = 0; i < currentRecipe.instructions.length; i++) {
    const recipeInstructions = document.querySelectorAll('.recipe-instruction__step'),
          description = recipeInstructions[i].querySelector('.recipe-instruction__text'),
          img = recipeInstructions[i].querySelector('.warning');

    description.value = currentRecipe.instructions[i].description;
    img.textContent = currentRecipe.instructions[i].imgStep;   
  }
  btnChange.addEventListener('click', async() => {
    checkInputs();
    await createMainImgLink()
      .then(url => {
        mainImgUrl = url;
        console.log(mainImgUrl);
    });               
    await createInstructionsArray()
      .then(res => {
        arrInstruction = res;
        console.log(arrInstruction);
    });
    let recipe = {
      name: recipeName.value.trim().toLowerCase(),
      category: createCategoryArray(), 
      time: {
        hours: recipeTimeHours.value,
        minutes: recipeTimeMinutes.value
      },  
      portions: +recipePortions.value,  
      description: recipeDescription.value.trim().toLowerCase(), 
      mainPhoto: mainImgUrl, 
      ingredients: createIngredientsArray(), 
      instructions: arrInstruction,
      favorite: currentRecipe.favorite 
    }
    let checkCategory = (recipe.category.length === 0) ? 'false' : 'true';

    if(checkInputs() === 'false' || checkCategory === 'false') {
      showModal('#error-modal');
    } else {
      patchData(link, idRecipe, recipe)
      .then(reсipe => {
        console.log(reсipe);
        createRecipePage(link, recipe, '.add-recipe');
      });
    }
  });


};
export default changeRecipe;
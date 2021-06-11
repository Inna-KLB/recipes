import postData from "../services/postData";
import checkInputs from "./checkInputs";

const createRecipe = (link) => {
  const name = document.querySelector('.header__input'),
        time = document.querySelector('#time'),
        portions = document.querySelector('#portions'),
        categories = document.querySelectorAll('.recipe-info__category input'),
        mainImg = document.querySelector('#main-img'),
        checkMainPhoto = document.querySelector('#without-main-photo'),
        description = document.querySelector('#description'),
        btnSave = document.querySelector('#save-recipe');
  

  checkInputs();  
  btnSave.addEventListener('click', () => { 
    const ingredients = document.querySelectorAll('.recipe-ingredients__list-item'),
    instructions = document.querySelectorAll('.recipe-instruction__step');
    let arrIngredient = [],
        arrCategory = [],
        arrInstruction = [];

    // Создание массива с категориями
    categories.forEach(category => {
      if(category.hasAttribute('checked', 'true')) {
        arrCategory.push(category.value)
      } 
    });  
    
    // Создание массива с ингредиентами
    ingredients.forEach(ingredient => {
      ingredient = {
        name: ingredient.children[0].value,
        quantity: ingredient.children[1].value,
        value: ingredient.children[2].value
      }
      arrIngredient.push(ingredient);  
      // return arrIngredient;     
    });

    // Создание массива с инструкциями
    instructions.forEach(instruction => {
      const photo = instruction.querySelector('.img-load__input'),
            checkNoPhoto = instruction.querySelector('.img-checkbox__input'),
            description = instruction.querySelector('.recipe-instruction__text');

      checkNoPhoto.value = (checkNoPhoto.hasAttribute('checked', 'true')) ? 'true' : 'false';
    
      instruction = {
        photo: photo.value,
        no_photo: checkNoPhoto.value, 
        description: description.value
      }
      arrInstruction.push(instruction);
    });

    checkMainPhoto.value = (checkMainPhoto.hasAttribute('checked', 'true')) ? 'true' : 'false';

    // Основной объект рецепта, который сохраняется в базе данных
    let recipeBody = {
      name: name.value, 
      category: arrCategory,
      time: time.value, 
      portions: +portions.value, 
      description: description.value, 
      main_photo: { 
        url: mainImg.value,
        no_photo: checkMainPhoto.value 
      }, 
      ingredients: arrIngredient,
      instructions: arrInstruction
    } 
    
    console.log(recipeBody);  
    postData(link, recipeBody);
    
  });
};
export default createRecipe;
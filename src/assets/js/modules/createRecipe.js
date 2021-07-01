import postData from "../services/postData";
import checkInputs from "./checkInputs";
import createRecipePage from "./createRecipePage";
import getImg from "./getImg";
import loadImg from "./loadImg";
import showModal from "./showModal";

const createRecipe = (link) => {

  try {
    const name = document.querySelector('.header__input'),
          time = document.querySelector('#time'),
          portions = document.querySelector('#portions'),
          categories = document.querySelectorAll('.recipe-info__category input'),
          mainImg = document.querySelector('#main-img'),
          description = document.querySelector('#description'),
          btnSave = document.querySelector('#save-recipe');
    
    // Загрузка в storage изображения 
    loadImg(mainImg, name);
          
    const createRecipeBody = async() => {
      let imgUrl; 
      // Получение ссылки изображения
      await getImg(name)
        .then(url => {
          imgUrl = url;
        });

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
          name: ingredient.children[0].value.trim(),
          quantity: ingredient.children[1].value,
          value: ingredient.children[2].value
        }
        arrIngredient.push(ingredient);      
      });
  
      // Создание массива с инструкциями
      instructions.forEach(instruction => {
        const photo = instruction.querySelector('.img-load__input'),
              description = instruction.querySelector('.recipe-instruction__text');
        
        instruction = {
          photo: photo.value,
          description: description.value.trim()
        } 
        arrInstruction.push(instruction); 
      });     
      
      // Основной объект рецепта, который передается в базу данных
      let recipeBody = {
        name: name.value.trim(),
        category: arrCategory, 
        time: time.value,  
        portions: +portions.value,  
        description: description.value.trim(), 
        mainPhoto: imgUrl, 
        ingredients: arrIngredient, 
        instructions: arrInstruction 
      };

       // Валидация массива с категориями
      let checkCategory = (recipeBody.category.length === 0) ? 'false' : 'true';
             
      console.log(recipeBody);

      // Проверка заполненной формы, и показ модального окна в соответствии наличия или отсутствия ошибок
       
      // if(checkInputs() === 'false' || checkCategory === 'false') {
      //   showModal('#error-modal');
      // } else {
      //   showModal('#good-modal');
      // }

      // Отправка объекта рецепта в базу данных
      postData(link, recipeBody);
        
    };
  
    btnSave.addEventListener('click', () => { 
      createRecipeBody();
      // createRecipePage(link);
    });
  }
  catch {
    console.log('It is not that page');
  }
};
export default createRecipe;


/* old rules storage

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

*/
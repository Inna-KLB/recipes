import loadIntoStorage from "../services/loadIntoStorage";
import postData from "../services/postData";
import checkInputs from "./checkInputs";
import createRecipePage from "./createRecipePage";
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
    
    // Создание id для названия папки для изображений
    let idImgFolder = new Date().getDate() + new Date().getTime() + Math.random();
   

    const createRecipeBody = async() => {
      const ingredients = document.querySelectorAll('.recipe-ingredients__list-item'),
            instructions = document.querySelectorAll('.recipe-instruction__step');
            
      let arrIngredient = [],
          arrCategory = [],
          arrInstruction = [],
          mainImgUrl, 
          imgStepUrl,
          idRecipe;

      // Получение ссылки главного изображения
      await loadIntoStorage(mainImg, idImgFolder)
        .then(url => {
          mainImgUrl = url;
        });   

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
      for (let i = 0; i < instructions.length; i++) {
        const imgStep = instructions[i].querySelector('.img-load__input'),
              description = instructions[i].querySelector('.recipe-instruction__text');

      // Получение ссылки на изображение каждом шаге рецепта
        await loadIntoStorage(imgStep, idImgFolder, i)
          .then(url => {
            imgStepUrl = url;
          });   

        let instruction = {
          imgStep: imgStepUrl,
          description: description.value.trim()
        } 
        arrInstruction.push(instruction); 
      }   

      // Основной объект рецепта, который передается в базу данных
      let recipeBody = {
        name: name.value.trim(),
        category: arrCategory, 
        time: time.value,  
        portions: +portions.value,  
        description: description.value.trim(), 
        mainPhoto: mainImgUrl, 
        ingredients: arrIngredient, 
        instructions: arrInstruction 
      };

       // Валидация массива с категориями
      let checkCategory = (recipeBody.category.length === 0) ? 'false' : 'true';
             
      console.log(recipeBody);
      console.log('category', checkCategory);
      console.log(checkInputs());

      // let check = postData(link, recipeBody);
      // Проверка заполненной формы, и показ модального окна в соответствии наличия или отсутствия ошибок     
      if(checkInputs() === 'false' || checkCategory === 'false') {
        showModal('#error-modal');
      } else {
        // Загрузка рецепта в базу данных
        await postData(link, recipeBody)
        .then((res) => {
          idRecipe = res.name;
        });            
        showModal('#good-modal', link, idRecipe);
      }
    };
  
    btnSave.addEventListener('click', () => { 
      createRecipeBody();
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
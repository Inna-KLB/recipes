import loadIntoStorage from "../services/loadIntoStorage";
import postData from "../services/postData";
import checkInputs from "./checkInputs";
import scrollToUp from "./scroolToUp";
import showModal from "./showModal";

const createRecipe = (link) => {

  try {
    const name = document.querySelector('.header__input'),
          timeHours = document.querySelector('#time_hours'),
          timeMinutes = document.querySelector('#time_minutes'),
          portions = document.querySelector('#portions'),
          categories = document.querySelectorAll('.recipe-info__category input'),
          mainImg = document.querySelector('#main-img'),
          description = document.querySelector('#description'),
          btnSave = document.querySelector('#save-recipe');
    
    // Создание id для названия папки для изображений
    let idImgFolder = new Date().getDate() + new Date().getTime() + Math.random();
   
    // scrollToUp('.add-recipe');
    checkInputs();

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
      if(mainImg.value !== '') {
        if(mainImg.files[0].type === 'image/png' || mainImg.files[0].type === 'image/jpeg') {
          await loadIntoStorage(mainImg, idImgFolder)
            .then(url => {
              mainImgUrl = url;
            });   
        }
      } else {
        // Если изображение не было загружено, то вставляется изображение по умолчанию
        // mainImgUrl = '../dist/img/main-photo.jpg';
        mainImgUrl = '../img/main-photo.jpg';

      }

      // Создание массива с категориями
      categories.forEach(category => {
        if(category.hasAttribute('checked', 'true')) {
          arrCategory.push(category.value)
        } 
      });  
      
      // Создание массива с ингредиентами
      ingredients.forEach(ingredient => {
        ingredient = {
          name: ingredient.children[0].value.trim().toLowerCase(),
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
        if(imgStep.value !== '') {
          if(imgStep.files[0].type === 'image/png' || imgStep.files[0].type === 'image/jpeg') {
            await loadIntoStorage(imgStep, idImgFolder, i)
              .then(url => {
                imgStepUrl = url;
              });   
          }
        } else {
          // Если изображение не было загружено, то вставляется картинка-заглушка
          let step = i + 1;
          imgStepUrl = `https://via.placeholder.com/750x500/c3d5ee/333?text=&#10072;+${step}+шаг`;
        }

        let instruction = {
          imgStep: imgStepUrl,
          description: description.value.trim().toLowerCase()
        } 
        arrInstruction.push(instruction); 
      }   

      // Основной объект рецепта, который передается в базу данных
      let recipeBody = {
        name: name.value.trim().toLowerCase(),
        category: arrCategory, 
        time: {
          hours: timeHours.value,
          minutes: timeMinutes.value
        },  
        portions: +portions.value,  
        description: description.value.trim().toLowerCase(), 
        mainPhoto: mainImgUrl, 
        ingredients: arrIngredient, 
        instructions: arrInstruction,
        favorite: 'false' 
      };

       // Валидация массива с категориями
      let checkCategory = (recipeBody.category.length === 0) ? 'false' : 'true';
             
      console.log(recipeBody);

      // Проверка заполненной формы, и показ модального окна в соответствии наличия или отсутствия ошибок     
      if(checkInputs() === 'false' || checkCategory === 'false') {
        showModal('#error-modal');
      } else {
        // Загрузка рецепта в базу данных
        await postData(link, recipeBody)
        .then((res) => {
          idRecipe = res.name;
        });         
        showModal('#modal-without-errors', link, idRecipe);
      }
    };
  
    btnSave.addEventListener('click', () => { 
      createRecipeBody();
    });

  }
  catch {
    return;
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
import postData from "../services/postData";
import checkInputs from "./checkInputs";
import createCategoryArray from "./createRecipe/createCategoryArray";
import createIngredientsArray from "./createRecipe/createIngredientsArray";
import createInstructionsArray from "./createRecipe/createInstructionsArray";
import createMainImgLink from "./createRecipe/createMainImgLink";
import showModal from "./showModal";

// Создание объекта рецепта и его загрузка на сервер
const createRecipe = (link) => {

  try {
    const name = document.querySelector('.header__input'),
          timeHours = document.querySelector('#time_hours'),
          timeMinutes = document.querySelector('#time_minutes'),
          portions = document.querySelector('#portions'),
          description = document.querySelector('#description'),
          btnSave = document.querySelector('#save-recipe');

    checkInputs();

    const createRecipeBody = async() => {         
      let arrInstruction = [],
          mainImgUrl,
          idRecipe;
   
    // Создание id для названия папки для изображений
     let idImgFolder = new Date().getDate() + new Date().getTime() + Math.random();

    //  Получение ссылки главного изображения
     await createMainImgLink(idImgFolder)
      .then(url => {
        mainImgUrl = url;
      });               
      //  Получения массива инструкций
      await createInstructionsArray(idImgFolder)
      .then(res => {
        arrInstruction = res;
      });

      // Основной объект рецепта, который передается в базу данных
      let recipeBody = {
        name: name.value.trim().toLowerCase(),
        category: createCategoryArray(), 
        time: {
          hours: timeHours.value,
          minutes: timeMinutes.value
        },  
        portions: +portions.value,  
        description: description.value.trim().toLowerCase(), 
        mainPhoto: mainImgUrl, 
        ingredients: createIngredientsArray(), 
        instructions: arrInstruction,
        favorite: 'false' 
      };

       // Валидация массива с категориями
      let checkCategory = (recipeBody.category.length === 0) ? 'false' : 'true';
             
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
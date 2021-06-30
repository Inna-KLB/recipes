import postData from "../services/postData";
import checkInputs from "./checkInputs";
import showModal from "./showModal";

const createRecipe = (link) => {

  try {
    const name = document.querySelector('.header__input'),
          time = document.querySelector('#time'),
          portions = document.querySelector('#portions'),
          categories = document.querySelectorAll('.recipe-info__category input'),
          mainImg = document.querySelector('#main-img'),
          checkMainPhoto = document.querySelector('#without-main-photo'),
          description = document.querySelector('#description'),
          btnSave = document.querySelector('#save-recipe');
    
    let file = {};
    let storageRef,
        mainImgUrl;
    
    mainImg.addEventListener('change', (e) => {
      file = e.target.files[0];
      storageRef = firebase.storage().ref(`/${name.value.trim()}/main_img`);

      storageRef.put(file)
        .then(function() {
          console.log('uploaded');
        }).catch(error => {
          console.log(error.message);    
        })
 
    });
    
      
  
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
          name: ingredient.children[0].value.trim(),
          quantity: ingredient.children[1].value,
          value: ingredient.children[2].value
        }
        arrIngredient.push(ingredient);      
      });
  
      // Создание массива с инструкциями
      instructions.forEach(instruction => {
        const photo = instruction.querySelector('.img-load__input'),
              checkNoPhoto = instruction.querySelector('.img-checkbox__input'),
              description = instruction.querySelector('.recipe-instruction__text');
  
        checkNoPhoto.value = (checkNoPhoto.hasAttribute('checked', 'true')) ? 'true' : 'false';
      
        instruction = {
          photo: photo.value,
          noPhoto: checkNoPhoto.value, 
          description: description.value.trim()
        } 
        arrInstruction.push(instruction); 
      });
      
      // Проверка значения checkboxа у главного фото
      checkMainPhoto.value = (checkMainPhoto.hasAttribute('checked', 'true')) ? 'true' : 'false';
           
      
      storageRef.getDownloadURL()
        .then(mainUrl => {
          recipeBody.mainPhoto.url = mainUrl;
      });
      
      // Основной объект рецепта, который передается в базу данных
      let recipeBody = {
        name: name.value.trim(),
        category: arrCategory, 
        time: time.value,  
        portions: +portions.value,  
        description: description.value.trim(), 
        mainPhoto: { 
          url: null,
          noPhoto: checkMainPhoto.value 
        }, 
        ingredients: arrIngredient, 
        instructions: arrInstruction 
      };
     
      
      // Валидация массива с категориями и значений для главного фото
      // let checkCategory = (recipeBody.category.length === 0) ? 'false' : 'true';
          // checkMainImg = (recipeBody.mainPhoto.url === '' && recipeBody.mainPhoto.noPhoto === 'false') ? 'false' : 'true';
      
      // console.log('checkInputs:', checkInputs());
      // console.log('checkCategory:', checkCategory);     
      console.log(recipeBody);
      
      // if(checkInputs() === 'false' || checkCategory === 'false') {
      //   showModal('#error-modal');
      // } else {
      //   showModal('#good-modal');
      // }
      
      postData(link, recipeBody);
    });

  }
  catch {
    console.log('It is not that page');
  }
};
export default createRecipe;



/* 
Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBQAXBtG-KChFIMvyNQZ7DVXLxlJY0SpyU",
    authDomain: "recipe-55b0e.firebaseapp.com",
    databaseURL: "https://recipe-55b0e-default-rtdb.firebaseio.com",
    projectId: "recipe-55b0e",
    storageBucket: "recipe-55b0e.appspot.com",
    messagingSenderId: "1092446233726",
    appId: "1:1092446233726:web:146033b45c4da27934e42f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
*/

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
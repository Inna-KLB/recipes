import addStep from "./modules/addStep";
import checkInputs from "./modules/checkInputs";
import createRecipe from "./modules/createRecipe";
import deleteStep from "./modules/deleteStep";
import scrollToUp from "./modules/scroolToUp";
import showMobileMenu from "./modules/showMobileMenu";


'use strict';
const linkDb = 'http://recipe-55b0e-default-rtdb.firebaseio.com/data.json';

// Firebase настройка
  const firebaseConfig = {
    apiKey: "AIzaSyBQAXBtG-KChFIMvyNQZ7DVXLxlJY0SpyU",
    authDomain: "recipe-55b0e.firebaseapp.com",
    databaseURL: "https://recipe-55b0e-default-rtdb.firebaseio.com",
    projectId: "recipe-55b0e",
    storageBucket: "recipe-55b0e.appspot.com",
    messagingSenderId: "1092446233726",
    appId: "1:1092446233726:web:146033b45c4da27934e42f"
  };
  // Инициализация Firebase
  firebase.initializeApp(firebaseConfig);

addStep('.recipe-ingredients__list', '#add-ingredient');
addStep('.recipe-instruction__list', '#add-step');
deleteStep('.recipe-ingredients__list', '.ingredient__delete');
deleteStep('.recipe-instruction__list', '.instruction__delete');
scrollToUp();
showMobileMenu();
createRecipe(linkDb);
checkInputs();

import addStep from "./modules/addStep";
import checkInputs from "./modules/checkInputs";
import createRecipe from "./modules/createRecipe";
import createRecipePage from "./modules/createRecipePage";
import deleteStep from "./modules/deleteStep";
import pagination from "./modules/pagination";
// import scrollToUp from "./modules/scroolToUp";
import search from "./modules/search";
import generateRecipes from "./modules/generateRecipes";
import showCategory from "./modules/showCategory";
import toggleContent from "./modules/toggleContent";
import showModal from "./modules/showModal";
import getData from "./services/getData";


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

const linkDb = 'https://recipe-55b0e-default-rtdb.firebaseio.com/data.json';
let paginationItemsCount,
    recipesOnPages = 12,
    recipesArray;
  
window.addEventListener('DOMContentLoaded', async() => {
  'use strict';
  await getData(linkDb)
  .then(recipes => {
    recipesArray = recipes;
    paginationItemsCount = Math.ceil(recipes.length / recipesOnPages);
  });
  const logoLink = document.querySelector('.logo');
  logoLink.addEventListener('click', () => { 
    generateRecipes(recipesArray, 0, recipesOnPages, linkDb)
  });
  generateRecipes(recipesArray, 0, recipesOnPages, linkDb);
  pagination(recipesArray, paginationItemsCount, recipesOnPages, linkDb);
  addStep('.recipe-ingredients__list', '#add-ingredient');
  addStep('.recipe-instruction__list', '#add-step');
  deleteStep('.recipe-ingredients__list', '.ingredient__delete');
  deleteStep('.recipe-instruction__list', '.instruction__delete');
  toggleContent('#show-navbar', '#header-navbar');
  createRecipe(linkDb);
  checkInputs();
  showCategory(recipesArray, recipesOnPages, linkDb);
  search();
});
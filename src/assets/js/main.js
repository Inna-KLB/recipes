import addStep from "./modules/addStep";
import checkInputs from "./modules/checkInputs";
import createRecipe from "./modules/createRecipe";
import createRecipePage from "./modules/createRecipePage";
import deleteStep from "./modules/deleteStep";
import pagination from "./modules/pagination";
// import scrollToUp from "./modules/scroolToUp";
import search from "./modules/search";
import createMainPage from "./modules/createMainPage";
import showCategory from "./modules/showCategory";
import toggleContent from "./modules/toggleContent";
import showModal from "./modules/showModal";
import getData from "./services/getData";
import createAddrecipePage from "./modules/createAddrecipePage";


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
    createMainPage(recipesArray, 0, recipesOnPages, linkDb);
  });

  const linksToAddRecipe = document.querySelectorAll('.go-to-add-recipe');
  linksToAddRecipe.forEach(linkToAddRecipe => {
    linkToAddRecipe.addEventListener('click', () => { 
      const container = document.querySelector('main');
      createAddrecipePage(container, linkDb);
    });
  });

  toggleContent('#show-navbar', '#header-navbar');
  showCategory(recipesArray, recipesOnPages, linkDb);
  search(recipesArray, recipesOnPages, linkDb);
});
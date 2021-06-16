import addStep from "./modules/addStep";
import checkInputs from "./modules/checkInputs";
import createRecipe from "./modules/createRecipe";
import deleteStep from "./modules/deleteStep";
import scrollToUp from "./modules/scroolToUp";
import showMobileMenu from "./modules/showMobileMenu";

'use strict';
const linkDb = 'http://recipe-55b0e-default-rtdb.firebaseio.com/data.json';

addStep('.recipe-ingredients__list', '#add-ingredient');
addStep('.recipe-instruction__list', '#add-step');
deleteStep('.recipe-ingredients__list', '.ingredient__delete');
deleteStep('.recipe-instruction__list', '.instruction__delete');
scrollToUp();
showMobileMenu();
createRecipe(linkDb);
checkInputs();

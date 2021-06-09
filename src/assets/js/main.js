import addStep from "./modules/addStep";
import deleteStep from "./modules/deleteStep";
import scrollToUp from "./modules/scroolToUp";
import showMobileMenu from "./modules/showMobileMenu";

'use strict';

addStep('.recipe-ingredients__list', '#add-ingredient');
addStep('.recipe-instruction__list', '#add-step');

deleteStep('.recipe-ingredients__list', '.ingredient__delete');
deleteStep('.recipe-instruction__list', '.instruction__delete');
scrollToUp();
showMobileMenu();
import addStep from "./modules/addStep";
import deleteStep from "./modules/deleteStep";
import scrollToUp from "./modules/scroolToUp";

'use strict';

addStep('.recipe-ingredients__list', '#add-ingredient');
addStep('.recipe-instruction__list', '#add-step');

deleteStep('.recipe-ingredients__list', '.ingredient__delete');
deleteStep('.recipe-instruction__list', '.instruction__delete');
scrollToUp();
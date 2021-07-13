import getData from "../services/getData";

const createRecipePage = (recipe) => {
  const mainContainer = document.querySelector('.add-recipe');
  mainContainer.classList.remove('add-recipe');
  mainContainer.style.display = 'none';
  mainContainer.classList.add('recipe-page');

        
  // return await getData(link)
  // .then(recipes => {
  //   recipes = Object.keys(recipes).map(key => {
  //     return {
  //       id: key, 
  //       ...recipes[key]
  //     }
  //   })
  //   recipes.forEach((recipe) => {
  //     if(recipe.id === idRecipe) {

  // Создание секции главной информации рецепта
  let recipeInfo = document.createElement('section');
  recipeInfo.classList.add('recipe-info', 'flex');

  let recipeMainImg = document.createElement('div');
  recipeMainImg.classList.add('recipe-info__img');
  recipeMainImg.style.background = `url(${recipe.mainPhoto}) center no-repeat`;

  let recipeInfoText = document.createElement('div');
  recipeInfoText.classList.add('recipe-info__text');
  recipeInfoText.innerHTML = `<h2>${recipe.name}</h2>`;

  let recipeInfoBox = document.createElement('div');
  recipeInfoBox.classList.add('flex');
  recipeInfoBox.innerHTML = `
    <p><ion-icon name="stopwatch-outline"></ion-icon><span>${recipe.time.hours}ч ${recipe.time.minutes}мин</span></p>
    <p><ion-icon name="people-outline"></ion-icon><span>${recipe.portions} порции</span></p>
  `;
  let category = document.createElement('p');
  for(let i = 0; i < recipe.category.length; i++) {
    let span = document.createElement('span');
    span.style.display = 'block';
    span.innerHTML = `
      <ion-icon name="pricetags-outline"></ion-icon> ${recipe.category[i]}
    `;
    category.append(span);
  }
  recipeInfoBox.prepend(category);


  let btnChange = document.createElement('button');
  btnChange.classList.add('btn', 'btn_brown');
  btnChange.innerHTML = `<ion-icon name="pencil-outline"></ion-icon> Редактировать рецепт`;
  let btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'btn_red');
  btnDelete.innerHTML = `<ion-icon name="trash-outline"></ion-icon> Удалить рецепт`;

  recipeInfoText.append(recipeInfoBox);
  recipeInfoText.append(btnChange);
  recipeInfoText.append(btnDelete);
  recipeInfo.prepend(recipeMainImg);
  recipeInfo.append(recipeInfoText);

  mainContainer.append(recipeInfo);

  // Создание секции описания рецепта
  let recipeDescription = document.createElement('section');
  recipeDescription.classList.add('recipe-description');
  recipeDescription.innerHTML = `
    <h3 class="recipe-description__header">Описание блюда</h3>
    <div class="recipe-description__text">
      <p>${recipe.description}</p>
    </div>
  `;
  mainContainer.append(recipeDescription);

  // Создание секции ингредиентов рецепта
  let recipeIngredients = document.createElement('section');
  recipeIngredients.classList.add('recipe-ingredients');
  
  let ingredients = document.createElement('ul');
  ingredients.classList.add('recipe-ingredients__list');
  for(let i = 0; i < recipe.ingredients.length; i++) {
    let ingredientsItem = document.createElement('li');
    ingredientsItem.classList.add('flex');
    ingredientsItem.innerHTML = `
      <span>${recipe.ingredients[i].name}</span><span>${recipe.ingredients[i].quantity} ${recipe.ingredients[i].value}</span>
    `;
    ingredients.append(ingredientsItem);
  }
  recipeIngredients.innerHTML = `
    <h3>Ингредиенты</h3>
  `;
  recipeIngredients.append(ingredients);
  mainContainer.append(recipeIngredients);
  

  // Создание секции инструкции к рецепту
  let recipeInstruction = document.createElement('section');
  recipeInstruction.classList.add('recipe-instruction');
  recipeInstruction.innerHTML = `
    <h3>Пошаговый рецепт</h3>
  `;
  for(let i = 0; i < recipe.instructions.length; i++) {
    let instructionsItem = document.createElement('div');
    instructionsItem.classList.add('recipe-instruction__step', 'flex');
    instructionsItem.innerHTML = `
      <img src="${recipe.instructions[i].imgStep}" alt="Пошаговый рецепт">
      <p>${recipe.instructions[i].description}</p>
    `;
    recipeInstruction.append(instructionsItem);
  }
  mainContainer.append(recipeInstruction);
      // }
  //   })
  // })
  
};
export default createRecipePage;

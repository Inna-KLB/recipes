const createIngredientsArray = () => {
  const ingredients = document.querySelectorAll('.recipe-ingredients__list-item');
  let arrIngredient = [];

  ingredients.forEach(ingredient => {
    ingredient = {
      name: ingredient.children[0].value.trim().toLowerCase(),
      quantity: ingredient.children[1].value,
      value: ingredient.children[2].value
    }
    arrIngredient.push(ingredient);    
  });
  return arrIngredient;
};
export default createIngredientsArray;
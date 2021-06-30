import getData from "../services/getData";

const createRecipePage = async(link) => {
  const mainContainer = document.querySelector('.add-recipe');
  return await getData(link)
  .then(recipes => {
    recipes = Object.keys(recipes).map(key => {
      return {
        id: key, 
        ...recipes[key]
      }
    })
    recipes.forEach(({name, category, time, portions, description, mainPhoto, ingredients, instructions}) => {
      let photo = (mainPhoto.url);
      let img = document.createElement('div');
      img.innerHTML = `<img src="${mainPhoto}" alt="Пошаговый рецепт">
      `;
      mainContainer.append(img);
      console.log('name:', name);
      console.log('category:', category);
      console.log('time:', time);
      console.log('portions:', portions);
      console.log('description:', description);
      console.log('mainPhoto:', mainPhoto);
      console.log('ingredients:', ingredients);
      console.log('instructions:', instructions); 
    })
  })
  
};
export default createRecipePage;

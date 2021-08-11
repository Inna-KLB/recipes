import patchData from "../services/patchData";
// Добавление/удаление рецепта в избранное
const addToFavorites = async(target, link, isFavorite, idRecipe) => {
  let status;
  await patchData(link, idRecipe, {favorite: isFavorite})
  .then(res => {
    status = res.favorite;
  });
  
  if(target && target.matches('ion-icon')){                
    if(status === 'true') {
      target.parentElement.innerHTML = '<ion-icon name="heart"></ion-icon>';
    } else {
      target.parentElement.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
    }
  }
  return status;
};
export default addToFavorites;
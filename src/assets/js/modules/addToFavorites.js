import patchData from "../services/patchData";

const addToFavorites = (target, link, isFavorite, idRecipe) => {
  let status;
  patchData(link, idRecipe, {favorite: isFavorite})
  .then(res => {
    status = res.favorite;
    console.log(res.favorite);
  });
  if(target && target.matches('ion-icon')){                
    if(status === 'true') {
      target.parentElement.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
    } else {
      target.parentElement.innerHTML = '<ion-icon name="heart"></ion-icon>';
    }
  }
  return status;
};
export default addToFavorites;
import postData from "../services/postData";

const createRecipe = (link) => {
  const name = document.querySelector('.header__input'),
        time = document.querySelector('#time'),
        portions = document.querySelector('#portions'),
        mainImg = document.querySelector('#main-img'),
        withoutMainPhoto = document.querySelector('#without-main-photo'),
        description = document.querySelector('#description'),
        btnSave = document.querySelector('#save-recipe');

        
  btnSave.addEventListener('click', (e) => {
    let recipeBody = {
      name: name.value, 
      time: time.value, 
      portions: +portions.value, 
      description: description.value, 
      main_photo: { 
        url: mainImg.value,
        no_photo: withoutMainPhoto.value 
      }, 
    }
    console.log(recipeBody);
    postData(link, recipeBody)
    
  });
};
export default createRecipe;
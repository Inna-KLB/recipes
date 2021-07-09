import createRecipePage from "./createRecipePage";
import getData from "../services/getData";

const showModal = (modalSelector, linkDb, idRecipe) => {
  const substrate = document.querySelector('.modal-substrate'),
        modal = document.querySelector(modalSelector);


  let idModal = modal.id,
      recipeObject;

  const closeModal = () => {
    substrate.classList.add('hide');
    modal.classList.add('hide');
    document.body.style.position = '';
    document.body.style.bottom = '';
    document.body.style.position = '';
  };

    if(modal.classList.contains('hide')) {
      substrate.classList.remove('hide');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.bottom = '0';
      
      if(idModal === 'error-modal') {
        const btnClose = modal.querySelector('button');
          btnClose.addEventListener('click', () => { 
            closeModal();
          });
      } else {
        const links = modal.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', async(e) => {
            e.preventDefault();
            if (e.target && e.target.getAttribute('id', 'to-recipe')) {
              closeModal();
              await getData(linkDb)
                  .then(recipes => {
                    recipes = Object.keys(recipes).map(key => {
                      return {
                        id: key, 
                        ...recipes[key]
                      }
                    })
                    recipes.forEach((recipe) => {
                      if(recipe.id === idRecipe) { 
                        console.log(recipe);
                        
                        recipeObject = recipe;
                      }
                    })  
                  })
              createRecipePage(recipeObject);
            }
          });
        });
      }
    }
};
export default showModal;
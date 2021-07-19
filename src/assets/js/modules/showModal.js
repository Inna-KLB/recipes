import deleteData from "../services/deleteData";
import createRecipePage from "./createRecipePage";

const showModal = (modalSelector, linkDb, idRecipe, linkToStorage) => {
  const substrate = document.querySelector('.modal-substrate'),
        modal = document.querySelector(modalSelector);


  let idModal = modal.id;

  const closeModal = () => {
    substrate.classList.add('hide');
    modal.classList.add('hide');
    document.body.classList.remove('active-modal');
  };
 
    if(modal.classList.contains('hide')) {
      substrate.classList.remove('hide');
      modal.classList.remove('hide');
      document.body.classList.add('active-modal');
      
      if(idModal === 'modal-without-errors') {
        const link = modal.querySelector('#to-recipe');
        link.addEventListener('click', (e) => {
          e.preventDefault();
          closeModal();   
          createRecipePage(linkDb, idRecipe, '.add-recipe');
        });
      } else if(idModal === 'error-modal'){
        const btnClose = modal.querySelector('button');
          btnClose.addEventListener('click', () => { 
            closeModal();
          });     
      } else if (idModal === 'modal-delete-recipe') {
        const btnDelete = document.querySelector('#delete-recipe'),
              btnClose = document.querySelector('#cancel');
        
        btnClose.addEventListener('click', () => { 
          closeModal();
        });
        btnDelete.addEventListener('click', () => { 
          deleteData(linkDb, idRecipe, linkToStorage);
        });
      }
    }
};
export default showModal;


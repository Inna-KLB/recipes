import deleteData from "../services/deleteData";
import getData from "../services/getData";
import createRecipePage from "./createRecipePage";
import createMainPage from "./createMainPage";
import showCategory from "./showCategory";


// Функция показа модальных окон
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
      // Показ модального окна при правильно заполненной страницы рецепта
      if(idModal === 'modal-without-errors') {
        const link = modal.querySelector('#to-recipe');
        let recipe = {};
        link.addEventListener('click', async(e) => {
          e.preventDefault();
          // получение объекта нужного рецепта и создание страницы на его основе
          await getData(linkDb)
          .then(recipes => {
            for (let i = 0; i < recipes.length; i++) {
              if(idRecipe === recipes[i].id) {
                recipe = recipes[i];
              }
            }
          });
          closeModal();   
          createRecipePage(linkDb, recipe, '.add-recipe');
        });
      }
      // Показ модального окна, если при добавлении/редактировании рецепта неправильного заполнены поля 
      else if(idModal === 'error-modal'){
        const btnClose = modal.querySelector('button');
          btnClose.addEventListener('click', () => { 
            closeModal();
          });     
      } 
      // Показ модального окна при удалении рецепта
      else if (idModal === 'modal-delete-recipe') {
        const btnDelete = document.querySelector('#delete-recipe'),
              btnClose = document.querySelector('#cancel');
        document.body.style.top = '0';
        btnClose.addEventListener('click', () => { 
          closeModal();
        });
        btnDelete.addEventListener('click', async() => { 
          // удаление рецепта и переход на главную страницу с обновленным списком рецептов
          await deleteData(linkDb, idRecipe, linkToStorage);
          const container = document.querySelector('.recipe-page');
          getData(linkDb)
          .then(recipes => {
            closeModal();
            createMainPage(recipes, 0, 12, linkDb, container);
            showCategory(recipes, 12, linkDb);
          });
        });
      }
    }
};
export default showModal;


import createRecipesCards from "./createRecipesCards";
// Пагинация на странице
const pagination = (recipes, paginationItemsCount, recipesOnPages, link) => {
  const pagination = document.querySelector('.pagination');
  if (recipes.length > recipesOnPages) {
    // Создание пунктов пагинации исходя из полученного числа paginationItemsCount
    for(let i = 0; i < (paginationItemsCount + 2); i++){
      let paginationItem = document.createElement('li');
      paginationItem.classList.add('pagination__item');
      // В первый и последний пункт вставялются стрелки для переключения, остальным - числа
      if (i === 0) {
        paginationItem.setAttribute('id', 'prev');
        paginationItem.innerHTML = '<ion-icon name="caret-back-outline"></ion-icon>';
      } else if (i === paginationItemsCount + 1) {
        paginationItem.setAttribute('id', 'next');
        paginationItem.innerHTML = '<ion-icon name="caret-forward-outline"></ion-icon>';
      } else {
        paginationItem.textContent = `${i}`;
      }
      if(paginationItem.textContent == '1') {
        paginationItem.classList.add('pagination__item_active');
      }
      pagination.append(paginationItem)
    }
  
    // Функция переключения страниц
    const switchPage = (activePaginationItem, nextActivePaginationItem) => {
      activePaginationItem.classList.remove('pagination__item_active');
      nextActivePaginationItem.classList.add('pagination__item_active');
      let pageNumber = +nextActivePaginationItem.innerHTML,
          startSlice = (pageNumber - 1) * recipesOnPages,
          endSlice = startSlice + recipesOnPages;
      
      createRecipesCards(recipes, startSlice, endSlice, link);  
    };
  
    pagination.addEventListener('click', (e) => {
      let active = pagination.querySelector('.pagination__item_active');

      if(e.target && e.target.matches('li#prev') || e.target.parentElement.matches('li#prev')) {
        if (active.textContent === '1') {
          return;
        } else {
          switchPage(active, active.previousElementSibling)
        }
      } else if(e.target && e.target.matches('li#next') || e.target.parentElement.matches('li#next')) {
        if (active.textContent === `${paginationItemsCount}`) {
          return;
        } else {
          switchPage(active, active.nextElementSibling)
        }
      } 
      else {
        switchPage(active, e.target) 
      }
    });    
  } else {
    pagination.style.display = 'none';
  }
    
};
export default pagination;
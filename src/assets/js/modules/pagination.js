import showAllRecipes from "./showAllRecipes";

const pagination = (link, paginationItemsCount) => {
  const pagination = document.querySelector('.pagination');
    for(let i = 0; i < paginationItemsCount; i++){
      let paginationItem = document.createElement('li');
      paginationItem.classList.add('pagination__item');
      paginationItem.textContent = `${i + 1}`;
      if(paginationItem.textContent == '1') {
        paginationItem.classList.add('pagination__item_active');
      }
      pagination.append(paginationItem)
    }
  let recipesOnPages = 8;
    pagination.addEventListener('click', (e) => {
      let active = pagination.querySelector('.pagination__item_active');
      if (active) {
        active.classList.remove('pagination__item_active');
      }
      if(e.target && e.target.matches('li.pagination__item')) {
        e.target.classList.add('pagination__item_active');
        let pageNumber = +e.target.innerHTML,
            startSlice = (pageNumber - 1) * recipesOnPages,
            endSlice = startSlice + recipesOnPages;
    
        showAllRecipes(link, startSlice, endSlice); 
      }
    });
};
export default pagination;
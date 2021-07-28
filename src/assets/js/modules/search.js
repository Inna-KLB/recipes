const search = () => {
  const containerAdvancedSearch = document.querySelector('.search-advanced'),
        toggleAdvancedSearch  = document.querySelector('.btn__advanced-search'),
        toggleIcon  = toggleAdvancedSearch.querySelector('ion-icon');


  toggleAdvancedSearch.addEventListener('click', () => {    
    if(containerAdvancedSearch.classList.contains('show-search')){
      containerAdvancedSearch.classList.remove('show-search');
      containerAdvancedSearch.classList.add('hide-search');
      toggleIcon.classList.remove('rotate-up-icon');
      toggleIcon.classList.add('rotate-down-icon');
    } else {
      containerAdvancedSearch.classList.remove('hide-search');
      containerAdvancedSearch.classList.add('show-search');
      toggleIcon.classList.remove('rotate-down-icon');
      toggleIcon.classList.add('rotate-up-icon');
    }
  });
  
};
export default search;
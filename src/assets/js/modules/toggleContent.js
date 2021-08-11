// Функция показа/скрытия меню для мобильной версии и расширенного поиска 
const toggleContent = (trigger, content, icon) => {
  const btnToggleContent = document.querySelector(trigger),
        containerContent = document.querySelector(content),
        toggleIcon  = document.querySelector(icon);

  btnToggleContent.addEventListener('click', () => {   
    if(containerContent.classList.contains('show-content')) {
      containerContent.classList.remove('show-content');
      containerContent.classList.add('hide-content');
      if(toggleIcon) {
        toggleIcon.classList.remove('rotate-up-icon');
        toggleIcon.classList.add('rotate-down-icon');
      }
    }  else {
      containerContent.classList.remove('hide-content');
      containerContent.classList.add('show-content');
      if(toggleIcon) {
        toggleIcon.classList.remove('rotate-down-icon');
        toggleIcon.classList.add('rotate-up-icon');
      }
    }     
  });
};
export default toggleContent;
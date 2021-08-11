// Создания массива с выбранным категориями
const createCategoryArray = () => {
  const categories = document.querySelectorAll('.recipe-info__category input');
  let arrCategory = [];
  categories.forEach(category => {
    if(category.hasAttribute('checked', 'true')) {
      arrCategory.push(category.value)
    } 
  });  
  return arrCategory;
};
export default createCategoryArray;
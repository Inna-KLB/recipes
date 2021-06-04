const addStep = (listSelector, listItemSelector, btnSelector) => {
  const list = document.querySelector(listSelector),
        listItem = list.querySelectorAll(listItemSelector),
        btnAddItem = document.querySelector(btnSelector);
  
  let i = listItem.length + 1;  

  btnAddItem.addEventListener('click', () => {  
    let li = document.createElement('li');
    if (list.className == 'recipe-instruction__list') {
      li.classList.add('recipe-instruction__step', 'flex');
      li.innerHTML =  `
        <p class="input-group__header"><span>${i++}</span> шаг</p>
        <div class="recipe-instruction__img">
          <label class="img-load__label"> 
            <p class="input-group__header">Загрузить фото</p>
            <input class="img-load__input" type="file">
          </label>
          <label class="img-checkbox__label">
            <input class="img-checkbox__input" type="checkbox" name="" id="without-photo">
            <span class="img-checkbox__text">без фото</span> 
          </label>
        </div>
        <textarea class="recipe-instruction__text" name="" id="" placeholder="Подробное описание шага рецепта..." maxlength="700"></textarea>`;
    } else {
      li.classList.add('recipe-ingredients__list-item', 'flex')
      li.innerHTML =  `
        <input class="ingredient__name" type="text" placeholder="Название ингредиента" maxlength="100">
        <input class="ingredient__number" type="number" placeholder="Кол-во" min="1">
        <select class="ingredient__value">
          <option value="gr">гр</option>
          <option value="kg">кг</option>
          <option value="litr">л</option>
          <option value="mililitr">мл</option>
          <option value="pieces">шт</option>
        </select> `; 
    }
    list.append(li);
  });    
  
};
export default addStep;
import checkInputs from "./checkInputs";

const addStep = (listSelector,  btnSelector) => {
  try {
    const list = document.querySelector(listSelector),
          btnAddItem = document.querySelector(btnSelector);
    
  
    btnAddItem.addEventListener('click', () => { 
      let li = document.createElement('li');
      if (list.className == 'recipe-instruction__list') {
        li.classList.add('recipe-instruction__step', 'flex');
        li.innerHTML =  `
          <p class="input-group__header">Добавить описание рецепта</p>
          <button class="btn__delete"><ion-icon class="instruction__delete" name="close-outline"></ion-icon></button>
          <div class="recipe-instruction__img">
            <label class="img-load__label"> 
              <p class="input-group__header">Загрузить фото</p>
              <input class="img-load__input" type="file">
            </label>
          <p class="warning">Если нет подходящего фото,  сайт автоматически вставит картинку по умолчанию.</p>
          </div>
          <textarea class="recipe-instruction__text" placeholder="Подробное описание шага рецепта..." maxlength="700"></textarea>`;
      } else {
        li.classList.add('flex', 'recipe-ingredients__list-item')
        li.innerHTML =  `
          <input class="ingredient__name" type="text" placeholder="Название ингредиента" maxlength="100">
          <input class="ingredient__number" type="number" placeholder="Кол-во" min="1" step="0.5">
          <select class="ingredient__value">
            <option value="гр">гр</option>
            <option value="кг">кг</option>
            <option value="л">л</option>
            <option value="мл">мл</option>
            <option value="шт">шт</option>
            <option value="ст.л.">ст.л.</option>
            <option value="ч.л.">ч.л.</option>
            <option value="ст">ст</option>
          </select> 
          <button class="btn__delete ingredient__delete"><ion-icon class="ingredient__delete" name="close-outline"></ion-icon></button>`; 
      }
      list.append(li);
      // console.log(list);
      checkInputs();
    });    
  }
  catch {
    console.log('Not found nedeed page');
  }
  
};  
export default addStep;
import createRecipe from "./createRecipe";
import scrollToUp from "./scroolToUp";
import addStep from "./addStep";
import deleteStep from "./deleteStep";


// Создание страницы создания/редактирования рецепта
const createAddrecipePage = (oldContainer, link) => {
  try {
    if(oldContainer) {
      oldContainer.remove();
    }
    const mainContainer = document.createElement('main');
    mainContainer.classList.add('add-recipe');
    const header = document.querySelector('.header');
    header.after(mainContainer);
    header.scrollTop = 0; 
    mainContainer.innerHTML = `
      <section class="recipe-info flex">
        <div class="recipe-info__header">
          <ion-icon name="pencil-outline"></ion-icon>
          <input class="header__input" type="text" maxlength="35" placeholder="Название блюда">  
        </div>
        <div class="recipe-info__category">
          <p class="input-group__header">Добавить категорию</p>
          <label> 
            <input type="checkbox" id="firstCourse" value="Первое блюдо">
            <span>Первое блюдо</span>
          </label>
          <label> 
            <input type="checkbox" value="Второе блюдо" id="secondCourse">
            <span>Второе блюдо</span>
          </label>
          <label> 
            <input type="checkbox" value="Завтрак" id="breakfast">
            <span>Завтрак</span>
          </label>
          <label> 
            <input type="checkbox" value="Мясо" id="meat">
            <span>Мясо</span>
          </label>
          <label> 
            <input type="checkbox" value="Рыба" id="fish">
            <span>Рыба</span>
          </label>
          <label> 
            <input type="checkbox" value="Салаты" id="salads">
            <span>Салаты</span>
          </label>
          <label> 
            <input type="checkbox" value="Десерт" id="dessert">
            <span>Десерт</span>
          </label>
          <label> 
            <input type="checkbox" value="Выпечка" id="bakeryProd">
            <span>Выпечка</span>
          </label>
        </div>   
        <div class="flex-wrapper">
          <div class="recipe-info__time">
            <p class="input-group__header">Добавить время приготовления</p>
              <input type="number" id="time_hours" value="" min="0">
              <span>ч</span>
              <input type="number" id="time_minutes" value="" min="0" max="60">
              <span>мин</span>
          </div>
          <div class="recipe-info__portions">
            <p class="input-group__header">Добавить количество порций</p>
            <label>
              <input type="number" id="portions" min="1" value="">
              <span>порций</span>
            </label>
          </div>
          <div class="recipe-info__image">
            <p class="input-group__header">Загрузить главное фото</p>
            <label class="img-load__label"> 
              <input class="img-load__input" type="file" id="main-img" accept="image/*">
            </label>
            <p class="warning">Если нет подходящего фото,  сайт автоматически вставит картинку по умолчанию.</p>
          </div>
        </div>
      </section>

      <section class="recipe-description">
        <h3 class="recipe-description__header">Описание блюда</h3>
        <div class="recipe-description__text">
          <input type="text" placeholder="1-2 небольших предложения" maxlength="110" id="description" value="">
        </div>
      </section>

      <section class="recipe-ingredients">
        <h3>Ингредиенты</h3>
        <ul class="recipe-ingredients__list">
          <li class="flex recipe-ingredients__list-item">
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
          </li>
          <li class="flex recipe-ingredients__list-item">
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
            <button class="btn__delete ingredient__delete"><ion-icon class="ingredient__delete" name="close-outline"></ion-icon></button>
          </li>
          <li class="flex recipe-ingredients__list-item">
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
            <button class="btn__delete"><ion-icon class="ingredient__delete" name="close-outline"></ion-icon></button>
          </li>
        </ul>
        <button id="add-ingredient" class="btn btn_blue btn_transparent">&plus; <span>Добавить ингредиент</span></button>
      </section>

      <section class="recipe-instruction">
        <h3>Пошаговый рецепт</h3>
        <ul class="recipe-instruction__list">
          <li class="recipe-instruction__step flex">
            <p class="input-group__header">Добавить описание рецепта</p> 
            <div class="recipe-instruction__img">
              <label class="img-load__label"> 
                <p class="input-group__header">Загрузить фото</p>
                <input class="img-load__input" type="file" >
              </label>
              <p class="warning">Если нет подходящего фото,  сайт автоматически вставит картинку по умолчанию.</p>
            </div>
            <textarea class="recipe-instruction__text" placeholder="Подробное описание шага рецепта..." maxlength="700" ></textarea>
          </li>
          <li class="recipe-instruction__step flex">
            <p class="input-group__header">Добавить описание рецепта</p>
            <button class="btn__delete"><ion-icon class="instruction__delete" name="close-outline"></ion-icon></button>
            <div class="recipe-instruction__img">
              <label class="img-load__label"> 
                <p class="input-group__header">Загрузить фото</p>
                <input class="img-load__input" type="file">
              </label>
              <p class="warning">Если нет подходящего фото,  сайт автоматически вставит картинку по умолчанию.</p>
            </div>
            <textarea class="recipe-instruction__text" placeholder="Подробное описание шага рецепта..." maxlength="700"></textarea>
          </li>
          <li class="recipe-instruction__step flex">
            <p class="input-group__header">Добавить описание рецепта</p>
            <button class="btn__delete"><ion-icon class="instruction__delete" name="close-outline"></ion-icon></button>
            <div class="recipe-instruction__img">
              <label class="img-load__label"> 
                <p class="input-group__header">Загрузить фото</p>
                <input class="img-load__input" type="file" >
              </label>
              <p class="warning">Если нет подходящего фото,  сайт автоматически вставит картинку по умолчанию.</p>
            </div>
            <textarea class="recipe-instruction__text" placeholder="Подробное описание шага рецепта..." maxlength="700"></textarea>
          </li>
        </ul>
        <button id="add-step" class="btn btn_blue btn_transparent">&plus; <span>Добавить шаг</span></button>
      </section>
      <section class="right-context">
        <button class="btn btn_red" id="save-recipe"><ion-icon name="save-sharp"></ion-icon> Сохранить</button>
      </section>
    `;
    
    scrollToUp('.add-recipe');
    createRecipe(link);
    addStep('.recipe-ingredients__list', '#add-ingredient');
    addStep('.recipe-instruction__list', '#add-step');
    deleteStep('.recipe-ingredients__list', '.ingredient__delete');
    deleteStep('.recipe-instruction__list', '.instruction__delete');
    window.location.hash = '/добавить_рецепт';

  } 
  catch (error) {
    console.log(error);
  }
};
export default createAddrecipePage;
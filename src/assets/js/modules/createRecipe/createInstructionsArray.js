import loadIntoStorage from "../../services/loadIntoStorage";

// Создание массива с инструкциями рецепта
const createInstructionsArray = async(idFolder) => {
  const instructions = document.querySelectorAll('.recipe-instruction__step');
  let arrInstruction = [];

  let idImgFolder,
      imgStepUrl;
  
  
  for (let i = 0; i < instructions.length; i++) {
    const imgStep = instructions[i].querySelector('.img-load__input'),
          description = instructions[i].querySelector('.recipe-instruction__text'),
          recipePhotoLink = instructions[i].querySelector('.recipe-instruction__img .warning');

  // Загрузка и получение ссылки изображения
    if(imgStep.value === '') {
      if(recipePhotoLink.textContent.match('https://firebasestorage') || recipePhotoLink.textContent.match('https://via.placeholder.com/')) {
        // Если фото не заменяется при редактировании, то url остается прежним
        imgStepUrl = recipePhotoLink.textContent;
        
      } else if(recipePhotoLink.textContent.match('Если нет подходящего фото')) {
        // Если изображение при добавлении нового рецепта не было загружено, то вставляется картинка-заглушка
        let step = i + 1;
        imgStepUrl = `https://via.placeholder.com/750x500/c3d5ee/333?text=&#10072;+${step}+шаг`;
      }
    } 
    else if(imgStep.value !== '' && imgStep.files[0].type === 'image/png' || imgStep.files[0].type === 'image/jpeg')
    { 
     if(recipePhotoLink.textContent.match('https://firebasestorage')) {
      // Если при редактировании рецепта загружается новое фото, то заменяем старое фото в storage на новое
      // Получаем ссылку на storage исходя из id папки со старым фото
       idImgFolder = recipePhotoLink.textContent.split('/')[7].split('%2F')[0];
       let link = recipePhotoLink.textContent.split('/')[7].split('?')[0];
       let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
      //  Удаляем старое фото
       await storageRef.delete();
      //  Загружаем новое фото и получаем url
       await loadIntoStorage(imgStep, idImgFolder, i)
         .then(url => {
           imgStepUrl = url;
        });   
       
     } else if(recipePhotoLink.textContent.match('https://via.placeholder.com/')) {
      //  Если до редактирования рецепта фото было не загружено, а вставлено заглушка, то просто загружаем фото в storage и получаем его url
        await loadIntoStorage(imgStep, idFolder, i)
         .then(url => {
           imgStepUrl = url;
        }); 
     } else if(recipePhotoLink.textContent.match('Если нет подходящего фото')) {
      // Если загрузка фото просходит при добавлении нового рецепта, то просто загружаем фото в storage и получаем его url
       await loadIntoStorage(imgStep, idFolder, i)
         .then(url => {
           imgStepUrl = url;
        }); 
     }
   } 

    let instruction = {
      imgStep: imgStepUrl,
      description: description.value.trim().toLowerCase()
    } 
    arrInstruction.push(instruction); 
  }   
  return arrInstruction;
};
export default createInstructionsArray;
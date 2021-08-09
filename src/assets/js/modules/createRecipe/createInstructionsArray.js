import loadIntoStorage from "../../services/loadIntoStorage";

const createInstructionsArray = async(idFolder) => {
  const instructions = document.querySelectorAll('.recipe-instruction__step');
  let arrInstruction = [];

  let idImgFolder,
      imgStepUrl;
  
  // // Создание id для названия папки для изображений
  // idImgFolder = new Date().getDate() + new Date().getTime() + Math.random();
  for (let i = 0; i < instructions.length; i++) {
    const imgStep = instructions[i].querySelector('.img-load__input'),
          description = instructions[i].querySelector('.recipe-instruction__text'),
          recipePhotoLink = instructions[i].querySelector('.recipe-instruction__img .warning');

  // Загрузка и получение ссылки изображения

    if(imgStep.value === '') {
      console.log('условие с пустым значением фото');
      if(recipePhotoLink.textContent.match('https://firebasestorage') || recipePhotoLink.textContent.match('https://via.placeholder.com/')) {
        // Если фото не заменяется при редактировании, то url остается прежним
        imgStepUrl = recipePhotoLink.textContent;
        console.log('ссылка остается прежней', imgStepUrl);
      } else if(recipePhotoLink.textContent.match('Если нет подходящего фото')) {
        // Если изображение не было загружено, то вставляется картинка-заглушка
        console.log('должна вставиться заглушка');
        let step = i + 1;
        imgStepUrl = `https://via.placeholder.com/750x500/c3d5ee/333?text=&#10072;+${step}+шаг`;
      }
    } 
    else if(imgStep.value !== '' && imgStep.files[0].type === 'image/png' || imgStep.files[0].type === 'image/jpeg')
    { 
     if(recipePhotoLink.textContent.match('https://firebasestorage')) {
      // Замена фото при редактировании
       idImgFolder = recipePhotoLink.textContent.split('/')[7].split('%2F')[0];
      // Замена картинки в storage
       let link = recipePhotoLink.textContent.split('/')[7].split('?')[0];
       let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
       await storageRef.delete()
       .then(() => {
         console.log(`Изображение удалено`);   
       })
       .catch((error) => {
         console.log(error);  
       })
       await loadIntoStorage(imgStep, idImgFolder, i)
         .then(url => {
           imgStepUrl = url;
        });   
       
     } else if(recipePhotoLink.textContent.match('https://via.placeholder.com/')) {
      //  Если до этого фото не было загружено, но вставлено фото-заглушка
        console.log('via');
        await loadIntoStorage(imgStep, idFolder, i)
         .then(url => {
           imgStepUrl = url;
        }); 
     } else if(recipePhotoLink.textContent.match('Если нет подходящего фото')) {
      // Если загрузка фото просходит в первый раз
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
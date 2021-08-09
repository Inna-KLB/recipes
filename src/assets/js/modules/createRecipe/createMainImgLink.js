import loadIntoStorage from '../../services/loadIntoStorage';

const createMainImgLink = async(idFolder) => {
  const mainImg = document.querySelector('#main-img'),
        mainPhotoLink = document.querySelector('.recipe-info__image .warning');

  let mainImgUrl,
      idImgFolder;
     
  
  // Создание id для названия папки для изображений
  // idImgFolder = new Date().getDate() + new Date().getTime() + Math.random();
  // Получение ссылки главного изображения

  if(mainImg.value === ''){
    if(mainPhotoLink.textContent.match('https://firebasestorage') || mainPhotoLink.textContent.match('../img/main-photo.jpg')) {
      // Если фото не заменяется при редактировании, то url остается прежним
      mainImgUrl = mainPhotoLink.textContent;
      console.log('ссылка остается прежней', mainImgUrl);
    } else if(mainPhotoLink.textContent.match('Если нет подходящего фото')) {
      // Если изображение не было загружено, то вставляется изображение по умолчанию
      console.log('должна вставиться заглушка');
      mainImgUrl = '../img/main-photo.jpg';
      // mainImgUrl = '../dist/img/main-photo.jpg';
    }
     
  } else if(mainImg.value !== '' && mainImg.files[0].type === 'image/png' || mainImg.files[0].type === 'image/jpeg') {
    if(mainPhotoLink.textContent.match('https://firebasestorage')) {
      // Замена фото при редактировании
       idImgFolder = mainPhotoLink.textContent.split('/')[7].split('%2F')[0];
       console.log(idImgFolder);
      // Замена картинки в storage
       let link = mainPhotoLink.textContent.split('/')[7].split('?')[0];
       let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
       await storageRef.delete()
       .then(() => {
         console.log(`Изображение удалено`);   
       })
       .catch((error) => {
         console.log(error);  
       })
       await loadIntoStorage(mainImg, idImgFolder)
         .then(url => {
           mainImgUrl = url;
        });   
       
    } else if(mainPhotoLink.textContent.match('../img/main-photo.jpg')) {
    //  Если до этого фото не было загружено, но вставлено фото-заглушка
      console.log('via');
      await loadIntoStorage(mainImg, idFolder)
        .then(url => {
          mainImgUrl = url;
      }); 
    } else if(mainPhotoLink.textContent.match('Если нет подходящего фото')) {
    // Если загрузка фото просходит в первый раз
    await loadIntoStorage(mainImg, idFolder)
    .then(url => {
      mainImgUrl = url;
    });  
    }
  }
  return mainImgUrl;
};
export default createMainImgLink;
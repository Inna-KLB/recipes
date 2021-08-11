import loadIntoStorage from '../../services/loadIntoStorage';

const createMainImgLink = async(idFolder) => {
  const mainImg = document.querySelector('#main-img'),
        mainPhotoLink = document.querySelector('.recipe-info__image .warning');

  let mainImgUrl,
      idImgFolder;
     
  // Получение ссылки главного изображения
  if(mainImg.value === ''){
    if(mainPhotoLink.textContent.match('https://firebasestorage') || mainPhotoLink.textContent.match('../img/main-photo.jpg')) {
      // Если фото не заменяется при редактировании, то url остается прежним
      mainImgUrl = mainPhotoLink.textContent;
    } else if(mainPhotoLink.textContent.match('Если нет подходящего фото')) {
      // Если изображение не было загружено при добавлении рецепта, то вставляется изображение по умолчанию
      mainImgUrl = 'dist/img/main-photo.jpg';
    }
     
  } else if(mainImg.value !== '' && mainImg.files[0].type === 'image/png' || mainImg.files[0].type === 'image/jpeg') {
    if(mainPhotoLink.textContent.match('https://firebasestorage')) {
      // Если при редактировании рецепта загружается новое фото, то заменяем старое фото в storage на новое
      // Получаем ссылку на storage исходя из id папки со старым фото
      let link = mainPhotoLink.textContent.split('/')[7].split('?')[0];
      let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
      // Удаляем старое фото
      await storageRef.delete();
      //  Загружаем новое фото и получаем url
      await loadIntoStorage(mainImg, idImgFolder)
        .then(url => {
          mainImgUrl = url;
      });   
       
    } else if(mainPhotoLink.textContent.match('dist/img/main-photo.jpg')) {
      //  Если до редактирования рецепта фото было не загружено, а вставлено заглушка, то просто загружаем фото в storage и получаем его url
      await loadIntoStorage(mainImg, idFolder)
        .then(url => {
          mainImgUrl = url;
      }); 
    } else if(mainPhotoLink.textContent.match('Если нет подходящего фото')) {
    // Если загрузка фото просходит при добавлении нового рецепта, то просто загружаем фото в storage и получаем его url
    await loadIntoStorage(mainImg, idFolder)
    .then(url => {
      mainImgUrl = url;
    });  
    }
  }
  return mainImgUrl;
};
export default createMainImgLink;
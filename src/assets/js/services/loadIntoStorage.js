const loadIntoStorage = async(imgSelector, id, i) => {
  let srcImg,
      storageRef = (imgSelector.hasAttribute('id', 'main-img')) ? firebase.storage().ref(`/${id}/main_img`) : firebase.storage().ref(`/${id}/img_step_${i}`),
      file = imgSelector.files[0];

  // Создание и отображение спинера при загрузке изображений
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('modal-substrate');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.bottom = '0';
  document.body.append(statusMessage);

  let statusImg = document.createElement('img');
  statusImg.setAttribute('src', '../img/spinner.gif');
  statusImg.setAttribute('width', '40vw');
  statusMessage.append(statusImg);
    

  // Загрузка изображения в storage
  await storageRef.put(file)
    .then(function() {
      console.log('Succsecfully uploaded');
      console.log('type:', file.type);
      
    })
    .catch(error => {
      console.log(error.message);    
    });

  // Получение сслыки изображения из storage
  await storageRef.getDownloadURL()
    .then(url => {
      srcImg = url; 
    }).catch(error => {
      console.log(error.message);
    });

  // Удаление спинера после загрузки изображений
  document.body.removeChild(statusMessage);
  return srcImg;  
};
export default loadIntoStorage;
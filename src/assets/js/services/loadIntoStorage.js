const loadIntoStorage = async(imgSelector, id, i) => {
  let srcImg,
      storageRef = (imgSelector.hasAttribute('id', 'main-img')) ? firebase.storage().ref(`/${id}/main_img`) : firebase.storage().ref(`/${id}/img_step_${i}`),
      file = imgSelector.files[0];

  // Создание и отображение спинера при загрузке изображений
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('modal-substrate');
  statusMessage.innerHTML = `<img src='../img/spinner.gif' width='40vw'>`;
  document.body.classList.add('active-modal');
  document.body.append(statusMessage);
    

  // Загрузка изображения в storage
  await storageRef.put(file)
    .then(() => {
      console.log('Succsecfully uploaded');      
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
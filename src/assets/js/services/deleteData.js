const deleteData = async(link, idRecipe, linksToStorage) => {
  const linkDelete = link.replace('.json', `/${idRecipe}.json`);
  //  Удаление информации из базы данных
  await fetch(linkDelete, {
    method: 'DELETE'
  });
  //  Удаление изображений из storage
  linksToStorage.forEach(linkToStorage => {   
    if(linkToStorage.match('https://via.placeholder.com/') || linkToStorage.match('img/main-photo.jpg')) {    
      return;  
    } else {
      let link = linkToStorage.split('/')[7].split('?')[0];
      let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
      storageRef.delete();
    }
  });
};
export default deleteData;
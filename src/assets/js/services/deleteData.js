const deleteData = async(link, idRecipe, linksToStorage) => {
   const linkDelete = link.replace('.json', `/${idRecipe}.json`);
  
  //  Удаление изображений и storage
  linksToStorage.forEach(linkToStorage => { 
    let link = linkToStorage.split('/')[7].split('?')[0];
    let storageRef = firebase.storage().ref(`/${link.split('%2F')[0]}/${link.split('%2F')[1]}`);
    storageRef.delete()
    .then(() => {
      console.log(`Изображение удалено`);   
    })
    .catch((error) => {
      console.log(error);  
    })
  });

  //  Удаление информации из базы данных
   await fetch(linkDelete, {
     method: 'DELETE'
   });
   
   window.location.pathname = 'index.html';
};
export default deleteData;
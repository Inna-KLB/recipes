const loadImg = (imgSelector, folderName) => {
    imgSelector.addEventListener('change', (e) => {
      let file = e.target.files[0],
          folder = folderName.value.trim();

      firebase.storage().ref(`/${folder}/main_img`).put(file)
        .then(function() {
          console.log('Succsecfully uploaded');
        })
        .catch(error => {
          console.log(error.message);    
        });
    });  
};
export default loadImg;
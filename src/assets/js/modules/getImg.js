const getImg = async(folderName) => {
  let folder = folderName.value.trim(),
      srcImg;
      
  await firebase.storage().ref(`/${folder}/main_img`).getDownloadURL()
    .then(url => {
      srcImg = url;  
    }).catch(error => {
      console.log(error.message);
    });
    return srcImg;
};
export default getImg;
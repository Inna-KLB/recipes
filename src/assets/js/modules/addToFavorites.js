const addToFavorites = (isFavorite) => {
  const btnsToggleFavorite = document.querySelectorAll('.add-fav');
  btnsToggleFavorite.forEach(btnToggleFavorite => {
    btnToggleFavorite.addEventListener('click', (e) => {
      if(isFavorite === 'false') {
        isFavorite = 'true';
      } else {
        isFavorite = 'false';
      }
      console.log(isFavorite);
      // return isFavorite;
    });
  });
};
export default addToFavorites;
const getData = async (link) => {
  let res;
  // Отображение спиннера во время загрузки данных
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('modal-substrate');
  statusMessage.innerHTML = `<img src='../img/spinner.gif' width='40vw'>`;
  document.body.prepend(statusMessage);
  
  await fetch(link, {
    method: 'GET'
  })
  .then(responce => {
    return responce.json()
  })
  .then(recipes => {    
    recipes = Object.keys(recipes).map(key => {
      return {
        id: key, 
        ...recipes[key]
      }        
    })
    res = recipes;
  })
  document.body.removeChild(statusMessage);
  return res;
};
export default getData;
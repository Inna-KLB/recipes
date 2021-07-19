const getData = async (link) => {
  let res;
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
  return res;
};
export default getData;
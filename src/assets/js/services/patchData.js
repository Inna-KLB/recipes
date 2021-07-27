const patchData = async(link, idRecipe, body) => {
  const linkChange = link.replace('.json', `/${idRecipe}.json`);
  let responce = await fetch(linkChange, {
    method: 'PATCH',
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  return await responce.json();
};
export default patchData;
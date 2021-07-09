async function postData(link, recipe) {
 const responce =  await fetch(link, {
    method: 'POST',
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  });
  return await responce.json();
}
export default postData;
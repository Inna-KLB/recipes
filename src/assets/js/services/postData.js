async function postData(link, recipe) {
  await fetch(link, {
    method: 'POST',
    cors: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })
}
export default postData;
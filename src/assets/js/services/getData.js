const getData = async(link) => {
  const responce = await fetch(link, {
    method: 'GET'
  });
  let res = await responce.json();
  console.log(res);
  return res;
};
export default getData;
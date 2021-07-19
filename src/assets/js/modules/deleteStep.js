const deleteStep = (listSelector, btnSelector) => {
  const list = document.querySelector(listSelector);
  
  try {
    list.addEventListener('click', (e) => {
      if(e.target && e.target.matches(btnSelector)) {
        list.removeChild(e.target.parentElement.parentElement);        
      }
    });
  }
  catch {
    return;
  } 
};
export default deleteStep;
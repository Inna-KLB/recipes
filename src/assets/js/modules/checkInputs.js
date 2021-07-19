const checkInputs = () => {
  try {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'),
          numbers = document.querySelectorAll('input[type="number"]'),
          textInputs = document.querySelectorAll('input[type="text"]'),
          textAreas = document.querySelectorAll('textarea');
  
    let checkNum,
        checkText,
        checkTextarea;
  
  
    // проверка инпутов на корректные и пустые значения
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        if(checkbox.hasAttribute('checked', 'true')) {
          checkbox.removeAttribute('checked', 'true'); 
        } else {
          checkbox.setAttribute('checked', 'true');
        } 
      });
    });
  
    numbers.forEach(number => {
      checkNum = (number.value <= 0 || number.value.match(/[^0-9,./]/g) || number.value === null) ? 'false' : 'true';
      return checkNum;
    });
    
    textInputs.forEach(text => {
      checkText = (text.value === '') ? 'false' : 'true';
      return checkText;
    });
  
    textAreas.forEach(textarea => {
      checkTextarea = (textarea.value === '') ? 'false' : 'true';
      return checkText;
    });
  

    // console.log('num', checkNum);
    // console.log('checkText', checkText);
    // console.log('checkTextarea', checkTextarea);

    // alert('num:', checkNum);
    // alert('checkText:', checkText);
    // alert('checkTextarea:', checkTextarea);

    return (checkNum === 'true' && checkText === 'true' && checkTextarea === 'true') ? 'true' : 'false';
  }
  catch {
    console.log('It is not that page');
  }
};
export default checkInputs;


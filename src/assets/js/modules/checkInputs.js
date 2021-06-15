const checkInputs = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]'),
        numbers = document.querySelectorAll('input[type="number"]'),
        textInputs = document.querySelectorAll('input[type="text"]'),
        textAreas = document.querySelectorAll('textarea'),
        time = document.querySelector('#time');



  let checkNum,
      checkText,
      checkTextarea,
      checkTime;
  
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
    checkNum = (number.value <= 0 || number.value.match(/\D/) || number.value === null) ? 'false' : 'true';
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

  checkTime = (time.value === '00:00' || time.value === '') ? 'false' : 'true';

  return (checkNum === 'true' && checkText === 'true' && checkTextarea === 'true' && checkTime === 'true') ? 'true' : 'false';
  
};
export default checkInputs;
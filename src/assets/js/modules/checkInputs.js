const checkInputs = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
      if(checkbox.hasAttribute('checked', 'true')) {
        checkbox.removeAttribute('checked', 'true')
      } else {
        checkbox.setAttribute('checked', 'true')    
      }
    });
  });
};
export default checkInputs;
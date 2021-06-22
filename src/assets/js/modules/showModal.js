const showModal = (modalSelector) => {
  const substrate = document.querySelector('.modal-substrate'),
        modal = document.querySelector(modalSelector);

  let idModal = modal.id;

    if(modal.classList.contains('hide')) {
      substrate.classList.remove('hide');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.bottom = '0';
      
      if(idModal === 'error-modal') {
        const btnClose = modal.querySelector('button');
          btnClose.addEventListener('click', () => { 
            substrate.classList.add('hide');
            modal.classList.add('hide');
            document.body.style.position = '';
            document.body.style.bottom = '';
            document.body.style.position = '';
          });
      } else {
        const links = modal.querySelectorAll('a');
          links.forEach(link => {
            link.addEventListener('click', (e) => {
              // e.preventDefault();
            });
          });
      }
    }
};
export default showModal;
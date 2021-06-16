const showModal = (modalSelector) => {
  // const substrate = document.querySelector('.modal-substrate'),
      const  modal = document.querySelector(modalSelector);

    if(modal.classList.contains('hide')) {
      // substrate.classList.remove('hide');
      // substrate.classList.add('show');
      modal.classList.remove('hide');
      modal.classList.add('show');
      document.body.style.overflowY = 'hidden';
      document.body.style.position = 'relative';
      // substrate.style.overflowY = 'hidden';
    } else {
      // substrate.classList.remove('show');
      // substrate.classList.add('hide');
      modal.classList.remove('show');
      modal.classList.add('hide');
      document.body.style.position = '';
    }
};
export default showModal;
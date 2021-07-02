const showSpinner = () => {
  let statusMessage = document.createElement('div');
  statusMessage.classList.add('modal-substrate');
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.bottom = '0';
  document.body.append(statusMessage);
  let statusImg = document.createElement('img');
  statusImg.setAttribute('src', '../img/spinner.gif');
  statusImg.setAttribute('width', '40vw');
  statusMessage.append(statusImg);
  setTimeout(() => {
    document.body.removeChild(statusMessage);
  }, 1000);
};
export default showSpinner;
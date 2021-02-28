import {ESC_KEY} from './util.js';

const mainElement = document.querySelector('main');
const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const successCloseElement = successElement.querySelector('.success__button');

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    successCloseClickHandler();
  }
};

const successCloseClickHandler = function () {
  successElement.remove();
  successCloseElement.removeEventListener('click', successCloseClickHandler);
  document.removeEventListener('keydown', popupEscKeydownHandler);
  successElement.removeEventListener('click', successCloseClickHandler);
};

const showPopup = function () {
  mainElement.appendChild(successElement);
  successCloseElement.addEventListener('click', successCloseClickHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
  successElement.addEventListener('click', successCloseClickHandler);
};

export {showPopup};

import {ESC_KEY} from './util.js';

const mainElement = document.querySelector('main');
const successTemplate = document.querySelector('#success').content;
const successElement = successTemplate.querySelector('.success');
const successCloseElement = successElement.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.error');
const errorCloseElement = errorElement.querySelector('.error__button');

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
};

const closeClickHandler = function () {
  closePopup();
};

const closePopup = function () {
  successElement.remove();
  errorElement.remove();
  successCloseElement.removeEventListener('click', closeClickHandler);
  errorCloseElement.removeEventListener('click', closeClickHandler);
  document.removeEventListener('keydown', popupEscKeydownHandler);
  successElement.removeEventListener('click', closeClickHandler);
  errorElement.removeEventListener('click', closeClickHandler);
};

const showPopup = function () {
  mainElement.appendChild(successElement);
  successCloseElement.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
  successElement.addEventListener('click', closeClickHandler);
};

const showPopupError = function () {
  mainElement.appendChild(errorElement);
  errorCloseElement.addEventListener('click', closeClickHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
  errorElement.addEventListener('click', closeClickHandler);
};

export {showPopup, showPopupError};

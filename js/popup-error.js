import {ESC_KEY} from './util.js';

const mainElement = document.querySelector('main');
const errorTemplate = document.querySelector('#error').content;
const errorElement = errorTemplate.querySelector('.error');
const errorCloseElement = errorElement.querySelector('.error__button');

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    errorCloseClickHandler();
  }
};

const errorCloseClickHandler = function () {
  errorElement.remove();
  errorCloseElement.removeEventListener('click', errorCloseClickHandler);
  document.removeEventListener('keydown', popupEscKeydownHandler);
  errorElement.removeEventListener('click', errorCloseClickHandler);
};

const showPopupError = function () {
  mainElement.appendChild(errorElement);
  errorCloseElement.addEventListener('click', errorCloseClickHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
  errorElement.addEventListener('click', errorCloseClickHandler);
};

export {showPopupError};

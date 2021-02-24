const DESCRIPTION_LENGTH = 140;

const descriptionElement = document.querySelector('.text__description');
const charCounter = document.querySelector('.char-counter');

const descriptionElementInputHandler = function () {
  descriptionElement.classList.remove('warning');
  charCounter.textContent = descriptionElement.value.length;
  if (descriptionElement.value.length > DESCRIPTION_LENGTH) {
    descriptionElement.classList.add('warning');
    return false;
  }
  return true;
};

const getDescriptionValidation = function () {
  descriptionElement.addEventListener('input', descriptionElementInputHandler);
};

export {getDescriptionValidation, descriptionElementInputHandler};

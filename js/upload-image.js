const RESIZE_STEP = 25;
const uploadLabelElement = document.querySelector('.img-upload__label');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const bodyElement = document.body;

const uploadLabelElementClickHandler = function (evt) {
  evt.preventDefault();
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  closeUploadModal();
  changeEffects();
};

const getParentElement = function (element, className) {
  if (!element.parentElement) {
    return null;
  }
  if (!element.classList.contains(className)) {
    element = getParentElement(element.parentElement, className);
  }
  return element;
};

const effectsListElementClickHandler = function (evt) {
  const parentElement = getParentElement(evt.target, 'effects__item');
  if (!parentElement) {
    return;
  }
  const changeEffectElement = parentElement.querySelector('.effects__radio');
  imgUploadPreview.className = '';
  switch (changeEffectElement.id) {
    case 'effect-chrome':
      imgUploadPreview.classList.add('effects__preview--chrome');
      break;
    case 'effect-sepia':
      imgUploadPreview.classList.add('effects__preview--sepia');
      break;
    case 'effect-marvin':
      imgUploadPreview.classList.add('effects__preview--marvin');
      break;
    case 'effect-phobos':
      imgUploadPreview.classList.add('effects__preview--phobos');
      break;
    case 'effect-heat':
      imgUploadPreview.classList.add('effects__preview--heat');
      break;
  }
};

const changeEffects = function () {
  effectsListElement.addEventListener('click', effectsListElementClickHandler);
}
//Меняем масштаб превью
const adjustNewScale = function (newScale) {
  scaleControlValueElement.value = `${newScale}%`;
  imgUploadPreview.style.transform = `scale(${newScale / 100})`;
};
//Увеличиваем фото
const scaleControlBiggerElementClickHandler = function () {
  let currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize < 100) {
    let newImageSize = currentImageSize + RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
}

scaleControlBiggerElement.addEventListener('click', scaleControlBiggerElementClickHandler);
//Уменьшаем фото
const scaleControlSmallerElementClickHandler = function () {
  let currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize > 25) {
    let newImageSize = currentImageSize - RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
}

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerElementClickHandler);

const uploadCancelElementClickHandler = function () {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
}

const closeUploadModal = function () {
  uploadCancelElement.addEventListener('click', uploadCancelElementClickHandler);
};

const openUploadModal = function () {
  imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValueElement.value) / 100})`;
  uploadLabelElement.addEventListener('click', uploadLabelElementClickHandler)
};

export {openUploadModal};

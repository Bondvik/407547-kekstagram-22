import {choiceEffect} from './picture-effects.js';
import {ESC_KEY} from './util.js';
import './validation.js';

const RESIZE_STEP = 25;
const DEFAULT_CHAR_COUNTER = 0;
const DEFAULT_SCALE = 100;
const Scale = {
  MIN: 25,
  MAX: 100,
};

const uploadLabelElement = document.querySelector('.img-upload__label');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const uploadSelectElement = document.querySelector('#upload-select-image');
const charCounter = document.querySelector('.char-counter');
const bodyElement = document.body;

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closeImgModal();
  }
};

const closeImgModal = () => {
  const currentActiveElement = document.activeElement;
  if (currentActiveElement.classList.contains('text__description')) {
    return;
  }
  if (currentActiveElement.classList.contains('text__hashtags')) {
    return;
  }
  document.querySelector('#upload-select-image').reset();
  charCounter.textContent = DEFAULT_CHAR_COUNTER;
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', popupEscKeydownHandler);
};

const uploadLabelElementClickHandler = function (evt) {
  evt.preventDefault();
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', popupEscKeydownHandler);
  effectLevelSliderElement.classList.toggle('hidden', true);
  uploadPreviewElement.style.filter = 'none';
  uploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleControlValueElement.value = `${DEFAULT_SCALE}%`;
  closeUploadModal();
  choiceEffect();
};

const uploadSubmitElementHandler = function (evt) {
  evt.preventDefault();
}

//Меняем масштаб превью
const adjustNewScale = function (newScale) {
  scaleControlValueElement.value = `${newScale}%`;
  uploadPreviewElement.style.transform = `scale(${newScale / 100})`;
};

//Увеличиваем фото
const scaleControlBiggerClickHandler = function () {
  let currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize < Scale.MAX) {
    let newImageSize = currentImageSize + RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
};

scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);

//Уменьшаем фото
const scaleControlSmallerClickHandler = function () {
  const currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize > Scale.MIN) {
    let newImageSize = currentImageSize - RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
};

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);

const uploadCancelElementClickHandler = function () {
  closeImgModal();
};

const closeUploadModal = function () {
  uploadCancelElement.addEventListener('click', uploadCancelElementClickHandler);
};

const openUploadModal = function () {
  uploadPreviewElement.style.transform = `scale(${parseInt(scaleControlValueElement.value) / 100})`;
  uploadLabelElement.addEventListener('click', uploadLabelElementClickHandler);
};

uploadSelectElement.addEventListener('submit', uploadSubmitElementHandler);

export {openUploadModal};

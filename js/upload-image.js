import {choiceFilterEffect} from './choice-filter.js';
import {toogleClassElement} from './util.js';

const RESIZE_STEP = 25;
const DEFAULT_SCALE = 50;

const uploadLabelElement = document.querySelector('.img-upload__label');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const bodyElement = document.body;

const uploadLabelElementClickHandler = function (evt) {
  evt.preventDefault();
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  toogleClassElement(effectLevelSliderElement, 'hidden', true);
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleControlValueElement.value = `${DEFAULT_SCALE}%`;
  closeUploadModal();
  choiceFilterEffect();
};

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
};

scaleControlBiggerElement.addEventListener('click', scaleControlBiggerElementClickHandler);

//Уменьшаем фото
const scaleControlSmallerElementClickHandler = function () {
  let currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize > 25) {
    let newImageSize = currentImageSize - RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
};

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerElementClickHandler);

const uploadCancelElementClickHandler = function () {
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const closeUploadModal = function () {
  uploadCancelElement.addEventListener('click', uploadCancelElementClickHandler);
};

const openUploadModal = function () {
  imgUploadPreview.style.transform = `scale(${parseInt(scaleControlValueElement.value) / 100})`;
  uploadLabelElement.addEventListener('click', uploadLabelElementClickHandler)
};

export {openUploadModal};

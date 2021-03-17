import {choiceEffect} from './choise-effect.js';
import {ESC_KEY} from './util.js';
import {sendData} from './api.js';
import {showPopup, showPopupError} from './popup.js';
import './validation.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const RESIZE_STEP = 25;
const DEFAULT_CHAR_COUNTER = 0;
const DEFAULT_SCALE = 100;
const Scale = {
  MIN: 25,
  MAX: 100,
};

const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('.img-upload__cancel');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const uploadSelectElement = document.querySelector('#upload-select-image');
const charCounter = document.querySelector('.char-counter');
const effectLevelElement = document.querySelector('.effect-level');
const bodyElement = document.body;
const uploaderElement = document.querySelector('#upload-file');

const uploadFormHandler = function () {
  const file = uploaderElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      uploadPreviewElement.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
  uploadPreviewElement.style.transform = `scale(${parseInt(scaleControlValueElement.value) / 100})`;
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', popupEscKeydownHandler);
  effectLevelSliderElement.classList.toggle('hidden', true);
  effectLevelElement.style.display = 'none';
  uploadPreviewElement.style.filter = 'none';
  uploadPreviewElement.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleControlValueElement.value = `${DEFAULT_SCALE}%`;
  closeUploadModal();
  choiceEffect();
}

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closeUploadSelect();
  }
};

const closeUploadSelect = () => {
  const currentActiveElement = document.activeElement;
  if (currentActiveElement.classList.contains('text__description')) {
    return;
  }
  if (currentActiveElement.classList.contains('text__hashtags')) {
    return;
  }
  uploaderElement.value = '';
  document.querySelector('#upload-select-image').reset();
  charCounter.textContent = DEFAULT_CHAR_COUNTER;
  uploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', popupEscKeydownHandler);
};

const uploadSubmitHandler = function (evt) {
  evt.preventDefault();
  sendData(showPopup, showPopupError, new FormData(evt.target));
  closeUploadSelect();
}

//Меняем масштаб превью
const adjustNewScale = function (newScale) {
  scaleControlValueElement.value = `${newScale}%`;
  uploadPreviewElement.style.transform = `scale(${newScale / 100})`;
};

//Увеличиваем фото
const scaleControlBiggerClickHandler = function () {
  const currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize < Scale.MAX) {
    const newImageSize = currentImageSize + RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
};

scaleControlBiggerElement.addEventListener('click', scaleControlBiggerClickHandler);

//Уменьшаем фото
const scaleControlSmallerClickHandler = function () {
  const currentImageSize = parseInt(scaleControlValueElement.value);
  if (currentImageSize > Scale.MIN) {
    const newImageSize = currentImageSize - RESIZE_STEP;
    adjustNewScale(newImageSize);
  }
};

scaleControlSmallerElement.addEventListener('click', scaleControlSmallerClickHandler);

const uploadCancelClickHandler = function () {
  closeUploadSelect();
};

const closeUploadModal = function () {
  uploadCancelElement.addEventListener('click', uploadCancelClickHandler);
};

uploadSelectElement.addEventListener('submit', uploadSubmitHandler);
uploaderElement.addEventListener('change', uploadFormHandler);

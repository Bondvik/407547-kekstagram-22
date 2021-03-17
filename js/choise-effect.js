import {effects} from './util.js';
import './nouislider.js';

const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectLevelElement = document.querySelector('.effect-level');

const effectsClassName = {
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};

window.noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

effectLevelValueElement.value = 0;

const getCurrentEffect = function () {
  return document.querySelector('.effects__radio:checked').value;
};

effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevelValueElement.value = values[handle];
  const effect = getCurrentEffect();
  switch (effect) {
    case 'chrome':
      uploadPreviewElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
      break;
    case 'sepia':
      uploadPreviewElement.style.filter = `sepia(${effectLevelValueElement.value})`;
      break;
    case 'marvin':
      uploadPreviewElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
      break;
    case 'phobos':
      uploadPreviewElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
      break;
    case 'heat':
      uploadPreviewElement.style.filter = `brightness(${effectLevelValueElement.value})`;
      break;
  }
});

const addEffectsToPhoto = function () {
  const effect = getCurrentEffect();
  if (effect === 'none') {
    effectLevelElement.style.display = 'none';
    effectLevelSliderElement.classList.toggle('hidden', true);
    uploadPreviewElement.style.filter = effect;
  } else {
    effectLevelElement.style.display = 'block';
    effectLevelSliderElement.classList.toggle('hidden', false);
    uploadPreviewElement.classList.add(effectsClassName[effect]);
    effectLevelSliderElement.noUiSlider.updateOptions(effects[effect]);
  }
};

const effectsListElementClickHandler = function () {
  uploadPreviewElement.className = '';
  addEffectsToPhoto();
};

const choiceEffect = function () {
  effectsListElement.addEventListener('click', effectsListElementClickHandler);
};

export {choiceEffect};

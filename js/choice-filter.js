import {effects} from './util.js';
import './nouislider.js';

const uploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const filtersClassName = {
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

effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevelValueElement.value = values[handle];
  if (uploadPreviewElement.classList.contains(filtersClassName.chrome)) {
    uploadPreviewElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
  } else if (uploadPreviewElement.classList.contains(filtersClassName.sepia)) {
    uploadPreviewElement.style.filter = `sepia(${effectLevelValueElement.value})`;
  } else if (uploadPreviewElement.classList.contains(filtersClassName.marvin)) {
    uploadPreviewElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
  } else if (uploadPreviewElement.classList.contains(filtersClassName.phobos)) {
    uploadPreviewElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
  } else if (uploadPreviewElement.classList.contains(filtersClassName.heat)) {
    uploadPreviewElement.style.filter = `brightness(${effectLevelValueElement.value})`;
  }
});

const addEffectsToPhoto = function (radioElement) {
  if (radioElement.dataset.effect === 'none') {
    effectLevelSliderElement.classList.toggle('hidden', true);
    uploadPreviewElement.style.filter = radioElement.dataset.effect;
  } else {
    effectLevelSliderElement.classList.toggle('hidden', false);
    uploadPreviewElement.classList.add(filtersClassName[radioElement.dataset.effect]);
    effectLevelSliderElement.noUiSlider.updateOptions(effects[radioElement.dataset.effect]);
  }
  radioElement.value = radioElement.dataset.effect;
};

const effectsListElementClickHandler = function (evt) {
  const effectsItemElement = evt.path.find((pathElement) => pathElement.classList.contains('effects__item'));
  if (!effectsItemElement) {
    return;
  }
  const effectRadioElement = effectsItemElement.querySelector('input');
  if (!effectRadioElement) {
    return;
  }
  uploadPreviewElement.className = '';
  addEffectsToPhoto(effectRadioElement);
};

const choiceFilterEffect = function () {
  effectsListElement.addEventListener('click', effectsListElementClickHandler);
};

export {choiceFilterEffect};

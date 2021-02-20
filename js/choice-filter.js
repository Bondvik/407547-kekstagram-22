import {effects} from './util.js';
import './nouislider.js';

const imgUploadPreview = document.querySelector('.img-upload__preview img');
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
  if (imgUploadPreview.classList.contains(filtersClassName.chrome)) {
    imgUploadPreview.style.filter = `grayscale(${effectLevelValueElement.value})`;
  } else if (imgUploadPreview.classList.contains(filtersClassName.sepia)) {
    imgUploadPreview.style.filter = `sepia(${effectLevelValueElement.value})`;
  } else if (imgUploadPreview.classList.contains(filtersClassName.marvin)) {
    imgUploadPreview.style.filter = `invert(${effectLevelValueElement.value}%)`;
  } else if (imgUploadPreview.classList.contains(filtersClassName.phobos)) {
    imgUploadPreview.style.filter = `blur(${effectLevelValueElement.value}px)`;
  } else if (imgUploadPreview.classList.contains(filtersClassName.heat)) {
    imgUploadPreview.style.filter = `brightness(${effectLevelValueElement.value})`;
  }
});

const addEffectsToPhoto = function (effectClassName, radioElement) {
  const effectKey = effectClassName.split('-')[1];
  effectLevelSliderElement.classList.toggle('hidden', false);
  imgUploadPreview.classList.add(filtersClassName[effectKey]);
  radioElement.value = effectKey;
  effectLevelSliderElement.noUiSlider.updateOptions(effects[effectKey]);
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
  imgUploadPreview.className = '';
  if (effectRadioElement.id === 'effect-none') {
    effectLevelSliderElement.classList.toggle('hidden', true);
    imgUploadPreview.style.filter = 'none';
    effectRadioElement.value = 'none';
  } else {
    addEffectsToPhoto(effectRadioElement.id, effectRadioElement);
  }
};

const choiceFilterEffect = function () {
  effectsListElement.addEventListener('click', effectsListElementClickHandler);
};

export {choiceFilterEffect};

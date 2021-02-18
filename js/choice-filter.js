const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsItemElement = Array.from(document.querySelectorAll('.effects__item'));
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');

const filtersClassName = {
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat',
};
// eslint-disable-next-line no-undef
noUiSlider.create(effectLevelSliderElement, {
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

const effectItemElementClickHandler = function () {
  const effectRadioElement = this.querySelector('input');
  if (!effectRadioElement) {
    return;
  }
  imgUploadPreview.className = '';
  switch (effectRadioElement.id) {
    case 'effect-none':
      imgUploadPreview.style.filter = 'none';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 0,
      });
      break;
    case 'effect-chrome':
      imgUploadPreview.classList.add(filtersClassName.chrome);
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-sepia':
      imgUploadPreview.classList.add(filtersClassName.sepia);
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;
    case 'effect-marvin':
      imgUploadPreview.classList.add(filtersClassName.marvin);
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'effect-phobos':
      imgUploadPreview.classList.add(filtersClassName.phobos);
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      imgUploadPreview.classList.add(filtersClassName.heat);
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }
}

const choiceFilterEffect = function () {
  effectsItemElement.forEach( (effectItemElement) => {
    effectItemElement.addEventListener('click', effectItemElementClickHandler);
  })
}

export {choiceFilterEffect};

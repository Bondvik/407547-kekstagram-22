import {getAllPhotos} from './api.js';
import {getRandomNumber, throttle} from './util.js';
import {createPicture} from './create-picture.js';

const RERENDER_DELAY = 500;
const RANDOM_PICTURE_COUNT = 10;

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');
const filterElements = filtersFormElement.querySelectorAll('.img-filters__button');

const getDiscussed = function (pictures) {
  return pictures.slice().sort (function (prevPicture, nextPicture) {
    return nextPicture.comments.length - prevPicture.comments.length;
  });
};

const getShufflePictures = function (pictures) {
  const dataPictures = pictures.slice();
  let shufflePictures = [];
  while (dataPictures.length > 0) {
    let random = getRandomNumber(0, dataPictures.length - 1);
    let picture = dataPictures.splice(random, 1)[0];
    shufflePictures.push(picture);
  }
  shufflePictures.length = RANDOM_PICTURE_COUNT;
  return shufflePictures;
};

const clearPictureList = function () {
  let picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((picture) => picture.remove());
  Array.from(filterElements).forEach( (elementForm) => {
    if (elementForm.classList.contains('img-filters__button--active')) {
      elementForm.classList.remove('img-filters__button--active');
    }
  })
};

const filtersFormHandler = function (evt) {
  switch (evt.target.id) {
    case 'filter-default':
      clearPictureList();
      evt.target.classList.add('img-filters__button--active');
      createPicture(getAllPhotos());
      break;
    case 'filter-discussed':
      clearPictureList();
      evt.target.classList.add('img-filters__button--active');
      createPicture(getDiscussed(getAllPhotos()));
      break;
    case 'filter-random':
      clearPictureList();
      evt.target.classList.add('img-filters__button--active');
      createPicture(getShufflePictures(getAllPhotos()));
      break;
  }
};

const choiceFilter = function () {
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', throttle(filtersFormHandler, RERENDER_DELAY));
};

export {choiceFilter};

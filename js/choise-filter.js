import {getAllPhotos} from './api.js';
import {getRandomNumber, debounce} from './util.js';
import {createPicture} from './create-picture.js';

const RENDER_DELAY = 500;
const RANDOM_PICTURE_COUNT = 10;

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');
const filterElements = filtersFormElement.querySelectorAll('.img-filters__button');

const getDiscussed = function (pictures) {
  return pictures.slice().sort(function (prevPicture, nextPicture) {
    return nextPicture.comments.length - prevPicture.comments.length;
  });
};

const getShufflePictures = function (pictures) {
  const dataPictures = pictures.slice();
  const shufflePictures = [];
  while (dataPictures.length) {
    const random = getRandomNumber(0, dataPictures.length - 1);
    const picture = dataPictures.splice(random, 1)[0];
    shufflePictures.push(picture);
  }
  shufflePictures.length = RANDOM_PICTURE_COUNT;
  return shufflePictures;
};

const clearPictureList = function () {
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((picture) => picture.remove());
  Array.from(filterElements).forEach((element) => {
    element.classList.remove('img-filters__button--active');
  })
};

const setFiltersClick = debounce(function (evt) {
  clearPictureList();
  evt.target.classList.add('img-filters__button--active');
  switch (evt.target.id) {
    case 'filter-default':
      createPicture(getAllPhotos());
      break;
    case 'filter-discussed':
      createPicture(getDiscussed(getAllPhotos()));
      break;
    case 'filter-random':
      createPicture(getShufflePictures(getAllPhotos()));
      break;
  }
}, RENDER_DELAY);

const filtersFormHandler = function (evt) {
  setFiltersClick(evt);
};

const choiceFilter = function () {
  filtersElement.classList.remove('img-filters--inactive');
  filtersFormElement.addEventListener('click', filtersFormHandler);
};

export {choiceFilter};

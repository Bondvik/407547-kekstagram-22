import {addListener} from './full-size-picture-modal.js';

const createPicture = (pictures) => {
  const pictureListElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((picture, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__img').setAttribute('data-img-id', index);
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureListFragment.appendChild(pictureElement);
  })

  pictureListElement.appendChild(pictureListFragment);
  addListener();
}

export {createPicture};

import {openBigPictureModal} from './big-picture-modal.js';

const createPicture = function (pictures) {
  const pictureListElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImageElement = pictureElement.querySelector('.picture__img');
    pictureImageElement.src = picture.url;
    pictureImageElement.dataset.imgId = picture.id;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureListFragment.appendChild(pictureElement);
  })
  pictureListElement.appendChild(pictureListFragment);
  openBigPictureModal();
}

export {createPicture};

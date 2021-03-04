import {openBigPictureModal} from './big-picture-modal.js';

const createPicture = function (pictures) {
  const pictureListElement = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    imageElement.src = picture.url;
    imageElement.dataset.imgId = picture.id;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureListFragment.appendChild(pictureElement);
  })
  pictureListElement.appendChild(pictureListFragment);
  openBigPictureModal();
}

export {createPicture};

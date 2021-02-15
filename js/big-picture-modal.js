import {getPhotosElement} from './data.js';
import {createComment} from './create-comment.js';

const bigPictureElement = document.querySelector('.big-picture');
const body = document.body;
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const bigPictureCloseElementHandler = function () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');
}

const pictureElementHandler =  function (pictureElement) {
  return (evt) => {
    evt.preventDefault();
    bigPictureElement.classList.remove('hidden');
    body.classList.add('modal-open');
    closeBigPictureModal();

    const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
    const likes = bigPictureElement.querySelector('.likes-count');
    const comments = bigPictureElement.querySelector('.comments-count');
    const pictureElementId = pictureElement.getAttribute('data-img-id');
    const description = bigPictureElement.querySelector('.social__caption');
    const commentList = document.querySelector('.social__comments');
    const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
    const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

    const galleryElement = getPhotosElement(pictureElementId);
    bigPictureImageElement.src = galleryElement.url;
    comments.textContent = galleryElement.comments.length;
    likes.textContent = galleryElement.likes;
    description.textContent = galleryElement.description;
    commentList.innerHTML = '';
    const commentListFragment = document.createDocumentFragment();
    galleryElement.comments.forEach((comment) => {
      const commentPicture = createComment(comment);
      commentListFragment.appendChild(commentPicture);
    });
    commentList.appendChild(commentListFragment);
    socialCommentCountElement.classList.add('hidden');
    commentsLoaderElement.classList.add('hidden');
  }
}

const closeBigPictureModal = function () {
  bigPictureCloseElement.addEventListener('click', bigPictureCloseElementHandler);
}

const openBigPictureModal = function () {
  const pictures = document.querySelectorAll('.picture__img');
  pictures.forEach((pictureElement) => {
    pictureElement.addEventListener('click', pictureElementHandler(pictureElement))
  })
}

export {openBigPictureModal};

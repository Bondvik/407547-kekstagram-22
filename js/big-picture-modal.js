import {getPhotosElement} from './api.js';
import {createComment} from './create-comment.js';
import {ESC_KEY} from './util.js';

const LOADED_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const commentListElement = document.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();

const popupEscKeydownHandler = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closebigPictureModal();
  }
};

const closebigPictureModal = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', popupEscKeydownHandler);
};

const bigPictureCloseElementHandler = function () {
  closebigPictureModal();
};

const createLoadedComment = function (element) {
  const commentPicture = createComment(element);
  return commentListFragment.appendChild(commentPicture);
}

const commentsLoaderClickHandler = function (evt) {
  const startLoadedComments = commentListElement.childElementCount;
  const pictureElementId = evt.target.dataset.id;
  const galleryElement = getPhotosElement(pictureElementId);
  const nextLoadedComments = galleryElement.comments.slice(startLoadedComments, (startLoadedComments + LOADED_COMMENTS))
  nextLoadedComments.forEach((element) => {
    createLoadedComment(element);
  })
  commentListElement.appendChild(commentListFragment);
  if (commentListElement.childElementCount === galleryElement.comments.length) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const pictureListElementClickHandler =  function (evt) {
  if (!evt.target.classList.contains('picture__img')) {
    return;
  }
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  closeBigPictureModal();
  document.addEventListener('keydown', popupEscKeydownHandler);
  const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
  const likes = bigPictureElement.querySelector('.likes-count');
  const comments = bigPictureElement.querySelector('.comments-count');
  const pictureElementId = evt.target.dataset.imgId;
  commentsLoaderElement.dataset.id = pictureElementId;
  const description = bigPictureElement.querySelector('.social__caption');
  const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');

  const galleryElement = getPhotosElement(pictureElementId);
  bigPictureImageElement.src = galleryElement.url;
  comments.textContent = galleryElement.comments.length;
  likes.textContent = galleryElement.likes;
  description.textContent = galleryElement.description;
  commentListElement.innerHTML = '';
  const prevLoadedComments = galleryElement.comments.slice(0, LOADED_COMMENTS);
  prevLoadedComments.forEach((element) => {
    createLoadedComment(element);
  });
  commentListElement.appendChild(commentListFragment);
  socialCommentCountElement.classList.add('hidden');
  if (galleryElement.comments.length > LOADED_COMMENTS) {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', commentsLoaderClickHandler)
  } else {
    commentsLoaderElement.classList.add('hidden');
  }
};

const closeBigPictureModal = function () {
  bigPictureCloseElement.addEventListener('click', bigPictureCloseElementHandler);
  commentsLoaderElement.removeEventListener('click', commentsLoaderClickHandler);
};

const openBigPictureModal = function () {
  const pictureListElement = document.querySelector('.pictures');
  pictureListElement.addEventListener('click', pictureListElementClickHandler);
};

export {openBigPictureModal};

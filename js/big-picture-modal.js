import {getPhotosElement} from './data.js';
import {createComment} from './create-comment.js';
import {ESC_KEY} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (evt.key === ESC_KEY) {
    evt.preventDefault();
    closebigPictureModal();
  }
};

const closebigPictureModal = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const bigPictureCloseElementHandler = function () {
  closebigPictureModal();
}

const pictureListElementClickHandler =  function (evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('picture__img')) {
    return;
  }
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  closeBigPictureModal();
  document.addEventListener('keydown', onPopupEscKeydown);
  const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
  const likes = bigPictureElement.querySelector('.likes-count');
  const comments = bigPictureElement.querySelector('.comments-count');
  const pictureElementId = evt.target.dataset.imgId;
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

const closeBigPictureModal = function () {
  bigPictureCloseElement.addEventListener('click', bigPictureCloseElementHandler);
}

const openBigPictureModal = function () {
  const pictureListElement = document.querySelector('.pictures');
  pictureListElement.addEventListener('click', pictureListElementClickHandler);
}

export {openBigPictureModal};

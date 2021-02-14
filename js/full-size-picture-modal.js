import {getElement} from './data.js';
import {createComment} from './create-comment.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.body;
const closeModalButton = document.querySelector('.big-picture__cancel');

//Закрыть окно
const closeModalButtonHandler = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

//Клик на картинке
const pictureClickHandler =  (picture) => {
  return (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    addListenerClose();

    const socialCommentCount = bigPicture.querySelector('.social__comment-count');
    socialCommentCount.classList.add('hidden');
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

    const pictureId = picture.getAttribute('data-img-id');
    const galleryElement = getElement(pictureId);

    const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
    bigPictureImage.src = galleryElement.url;

    const likes = bigPicture.querySelector('.likes-count');
    likes.textContent = galleryElement.likes;

    const comments = bigPicture.querySelector('.comments-count');
    comments.textContent = galleryElement.comments.length;

    const description = bigPicture.querySelector('.social__caption');
    description.textContent = galleryElement.description;

    const commentList = document.querySelector('.social__comments');
    commentList.innerHTML = '';
    const commentListFragment = document.createDocumentFragment();
    galleryElement.comments.forEach( (comment) => {
      const commentPicture = createComment(comment);
      commentListFragment.appendChild(commentPicture);
    });
    commentList.appendChild(commentListFragment);
  }
}

const addListenerClose = () => {
  closeModalButton.addEventListener('click', closeModalButtonHandler);
}

const addListener = () => {
  const pictures = document.querySelectorAll('.picture__img');
  pictures.forEach((picture) => {
    picture.addEventListener('click', pictureClickHandler(picture))
  })

}

export {addListener};

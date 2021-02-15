import {createAvatar} from './create-avatar.js';
import {createMessage} from './create-message.js';

const createComment = function (element) {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  li.appendChild(createAvatar(element));
  li.appendChild(createMessage(element));
  return li;
};

export {createComment};

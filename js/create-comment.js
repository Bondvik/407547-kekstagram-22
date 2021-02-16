import {createAvatar} from './create-avatar.js';
import {createMessage} from './create-message.js';

const createComment = function (element) {
  const itemElement = document.createElement('li');
  itemElement.classList.add('social__comment');
  itemElement.appendChild(createAvatar(element));
  itemElement.appendChild(createMessage(element));
  return itemElement;
};

export {createComment};

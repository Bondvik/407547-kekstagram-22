const createMessage = function (element) {
  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = element.message;
  return textElement;
};

export {createMessage};

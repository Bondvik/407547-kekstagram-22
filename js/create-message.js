const createMessage = function (element) {
  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = element.message;
  return text;
};

export {createMessage};

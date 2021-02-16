const createAvatar = function (element) {
  const imageElement = document.createElement('img');
  imageElement.classList.add('social__picture');
  imageElement.src = element.avatar;
  imageElement.alt = element.name;
  return imageElement;
};

export {createAvatar};

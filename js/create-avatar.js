const createAvatar = function (element) {
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = element.avatar;
  img.alt = element.name;
  return img;
};

export {createAvatar};

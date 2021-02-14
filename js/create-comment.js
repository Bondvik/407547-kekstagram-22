const createComment = (element) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = element.avatar;
  img.alt = element.name;
  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = element.message;
  li.appendChild(img);
  li.appendChild(text);
  return li;
};

export{createComment};

let thumbnails = null;

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
    })
    .then((pictures) => {
      thumbnails = pictures;
      onSuccess(pictures);
    })
    .catch(() => {
      onFail('Не удалось загрузить данные');
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

const getPhotosElement = function (id) {
  return thumbnails[id];
}

export {getData, sendData, getPhotosElement};

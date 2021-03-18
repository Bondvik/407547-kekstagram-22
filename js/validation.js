const MAX_HASHTAGS_QUANTITY = 5;
const DESCRIPTION_LENGTH = 140;

const hashtagsElement = document.querySelector('.text__hashtags');
const descriptionElement = document.querySelector('.text__description');
const charCounter = document.querySelector('.char-counter');

const getResultOfHashtagMatching = (tag) => {
  const regex = new RegExp(/^#[a-zA-Zа-яА-Я\d]{1,19}$/);
  return regex.test(tag);
};

const setErrorMessage = function (message) {
  hashtagsElement.classList.toggle('error-input-field', true);
  hashtagsElement.setCustomValidity(message);
  hashtagsElement.reportValidity();
};

const hashtagsElementInputHandler = function () {
  hashtagsElement.setCustomValidity('');
  let isHashtagValid = true;
  hashtagsElement.classList.toggle('error-input-field', false);
  if (!hashtagsElement.value.length) {
    hashtagsElement.reportValidity();
    return isHashtagValid;
  }
  const hashtags = hashtagsElement.value.trim().split(' ').filter((item) => item.length);
  if (hashtags.length > MAX_HASHTAGS_QUANTITY) {
    setErrorMessage(`Нельзя указать больше ${MAX_HASHTAGS_QUANTITY} хэш-тегов`)
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!getResultOfHashtagMatching(hashtags[i])) {
      setErrorMessage('Неправильный формат хэш-тега');
      isHashtagValid = false;
      break;
    }
    const isDuplicate = hashtags.includes(hashtags[i], i + 1);
    if (isDuplicate) {
      setErrorMessage('Один и тот же хэш-тег не может быть использован дважды');
      isHashtagValid = false;
      break;
    }
  }
  return isHashtagValid;
};

const descriptionElementInputHandler = function () {
  descriptionElement.classList.remove('warning');
  charCounter.textContent = descriptionElement.value.length;
  if (descriptionElement.value.length > DESCRIPTION_LENGTH) {
    descriptionElement.classList.add('warning');
    return false;
  }
};

hashtagsElement.addEventListener('input', hashtagsElementInputHandler);
descriptionElement.addEventListener('input', descriptionElementInputHandler);

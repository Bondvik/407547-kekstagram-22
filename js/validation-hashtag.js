const QUANTITY_HASHTAGS = 5;

const hashtagsElement = document.querySelector('.text__hashtags');

const matchRegexHashtag = (tag) => {
  const regex = new RegExp(/^#[a-zA-Zа-яА-Я\d]{1,19}$/);
  return regex.test(tag);
};

const createErrorMessageValidation = function (message) {
  hashtagsElement.classList.toggle('error-input-field', true);
  hashtagsElement.setCustomValidity(message);
  hashtagsElement.reportValidity();
};

const hashtagsElementInputHandler = function () {
  hashtagsElement.setCustomValidity('');
  hashtagsElement.classList.toggle('error-input-field', false);
  if (hashtagsElement.value.length === 0) {
    hashtagsElement.reportValidity();
    return true;
  }
  const hashtags = hashtagsElement.value.split(' ');
  let isMatchRegex = true;
  if (hashtags.length > QUANTITY_HASHTAGS) {
    createErrorMessageValidation(`Нельзя указать больше ${QUANTITY_HASHTAGS} хэш-тегов`)
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!matchRegexHashtag(hashtags[i])) {
      createErrorMessageValidation('Неправильный формат хэш-тега');
      isMatchRegex = false;
      break;
    }
    const notUniqueHashtag = hashtags.includes(hashtags[i], i + 1);
    if (notUniqueHashtag) {
      createErrorMessageValidation('Один и тот же хэш-тег не может быть использован дважды');
      isMatchRegex = false;
      break;
    }
  }
  return isMatchRegex;
};

const getHashtagsValidation = function () {
  hashtagsElement.addEventListener('input', hashtagsElementInputHandler);
};

export {getHashtagsValidation};

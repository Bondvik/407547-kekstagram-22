const COMMENT_LENGTH = 140;

const getMaxLengthComment = function (comment) {
  return (comment.length < COMMENT_LENGTH) ? true : false;
};


//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = function(min, max) {
  let a =  Math.ceil(min);
  let b = Math.floor(max);

  if (min < 0 || max < 0) {
    return;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    a = Math.ceil(max);
    b = Math.floor(min);
  }

  return Math.floor(Math.random() * (b - a + 1)) + a;

};

getMaxLengthComment('absd');
getRandomNumber(1, 10);

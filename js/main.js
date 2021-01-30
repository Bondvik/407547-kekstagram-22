const COMMENT_LENGTH = 140;

const getMaxLengthComment = function (comment) {
  return (comment.length < COMMENT_LENGTH) ? true : false;
};

//Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = function(min, max) {
  let firstNumber =  Math.ceil(min);
  let secondNumber = Math.floor(max);
  if (min < 0 || max < 0) {
    return;
  }
  if (min === max) {
    return min;
  }
  if (min > max) {
    firstNumber = Math.ceil(max);
    secondNumber = Math.floor(min);
  }
  return Math.floor(Math.random() * (secondNumber - firstNumber + 1)) + firstNumber;
};
getMaxLengthComment('absd');
getRandomNumber(1, 10);

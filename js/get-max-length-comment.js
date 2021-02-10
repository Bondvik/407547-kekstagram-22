const COMMENT_LENGTH = 140;
const getMaxLengthComment = function (comment) {
  return (comment.length < COMMENT_LENGTH) ? true : false;
};
export {getMaxLengthComment};

import {isEscapeKey} from './util.js';

const NUMBER_COMMENTS_DISPLAYED = 5;
let minNumber = 0;
let maxNumber = NUMBER_COMMENTS_DISPLAYED;
let arrComments = [];
const closeBtnNode = document.querySelector('.big-picture__cancel');
const modalNode = document.querySelector('.big-picture');
const bigPictureImageNode = modalNode.querySelector('.big-picture__img img');
const likesCountNode = modalNode.querySelector('.likes-count');
const socialCommentTotalCountNode = modalNode.querySelector('.social__comment-total-count');
const bodyNode = document.querySelector('body');
const commentsLoaderNode = document.querySelector('.comments-loader');
const listNode = document.querySelector('.social__comments');
const socialCaptionNode = document.querySelector('.social__caption');
const commentShownCountNode = document.querySelector('.social__comment-shown-count');

function openPopup(itemObject) {
  modalNode.classList.remove('hidden');

  bigPictureImageNode.src = itemObject.url;

  likesCountNode.textContent = itemObject.likes;

  socialCommentTotalCountNode.textContent = itemObject.comments.length;

  listNode.innerHTML = '';
  createListComment(itemObject.comments, minNumber, maxNumber);

  socialCaptionNode.textContent = itemObject.description;

  bodyNode.classList.add('modal-open');

  document.addEventListener('keydown', escKeydownHandler);

  closeBtnNode.addEventListener('click', closePopup);

  arrComments = itemObject.comments;
  commentsLoaderNode.addEventListener('click', commentsLoaderClickHandler);
}

function closePopup () {
  minNumber = 0;
  maxNumber = NUMBER_COMMENTS_DISPLAYED;
  modalNode.classList.add('hidden');
  bodyNode.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  closeBtnNode.removeEventListener('click', closePopup);
  commentsLoaderNode.removeEventListener('click', commentsLoaderClickHandler);
}

function escKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function createListComment (comments, min, max) {
  if (comments.length <= max) {
    commentShownCountNode.textContent = comments.length;
    commentsLoaderNode.classList.add('hidden');
  } else {
    commentShownCountNode.textContent = max;
    commentsLoaderNode.classList.remove('hidden');
  }

  comments.forEach((comment, index) => {
    if (index < max && index >= min) {
      const item = document.createElement('li');
      item.classList.add('social__comment');
      // создаем и наполняем <img>
      const image = document.createElement('img');
      image.classList.add('social__picture');
      image.src = comment.avatar;
      image.alt = comment.name;
      // тут я понял что нужно было скопировать 'li'
      image.width = '35';
      image.height = '35';
      item.appendChild(image);
      // создаем и наполняем <p>
      const desc = document.createElement('p');
      desc.classList.add('social__text');
      desc.textContent = comment.message;
      item.appendChild(desc);
      // добавляем наполненный item в список
      listNode.appendChild(item);
    }
  });
}

function commentsLoaderClickHandler () {
  minNumber += NUMBER_COMMENTS_DISPLAYED;
  maxNumber += NUMBER_COMMENTS_DISPLAYED;
  createListComment(arrComments, minNumber, maxNumber);
}

export {openPopup};

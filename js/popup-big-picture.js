import {isEscapeKey} from './util.js';

const NUMBER_COMMENTS_DISPLAYED = 5;
let minNumber = 0;
let maxNumber = NUMBER_COMMENTS_DISPLAYED;
let arrComments = [];
const closeBtnNode = document.querySelector('.big-picture__cancel');

function openPopup(itemObject) {
  const modalNode = document.querySelector('.big-picture');
  modalNode.classList.remove('hidden');

  modalNode.querySelector('.big-picture__img img').src = itemObject.url;

  modalNode.querySelector('.likes-count').textContent = itemObject.likes;

  modalNode.querySelector('.social__comment-total-count').textContent = itemObject.comments.length;

  document.querySelector('.social__comments').innerHTML = '';
  createListComment(itemObject.comments, minNumber, maxNumber);

  document.querySelector('.social__caption').textContent = itemObject.description;

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', escKeydownHandler);

  closeBtnNode.addEventListener('click', closePopup);

  arrComments = itemObject.comments;
  document.querySelector('.comments-loader').addEventListener('click', commentsLoaderClickHandler);
}

function closePopup () {
  minNumber = 0;
  maxNumber = NUMBER_COMMENTS_DISPLAYED;
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', escKeydownHandler);
  closeBtnNode.removeEventListener('click', closePopup);
  document.querySelector('.comments-loader').removeEventListener('click', commentsLoaderClickHandler);
}

function escKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function createListComment (comments, min, max) {
  const listNode = document.querySelector('.social__comments');
  const commentShownCountNode = document.querySelector('.social__comment-shown-count');

  if (comments.length <= max) {
    commentShownCountNode.textContent = comments.length;
    document.querySelector('.comments-loader').classList.add('hidden');
  } else {
    commentShownCountNode.textContent = max;
    document.querySelector('.comments-loader').classList.remove('hidden');
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

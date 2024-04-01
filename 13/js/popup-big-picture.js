import {isEscapeKey} from './util.js';

const NUMBER_COMMENTS_DISPLAYED = 5;
let minNumber = 0;
let maxNumber = NUMBER_COMMENTS_DISPLAYED;
let arrComments = [];


function openPopup(itemObject) {
  const modal = document.querySelector('.big-picture');
  modal.classList.remove('hidden');

  modal.querySelector('.big-picture__img img').src = itemObject.url;

  modal.querySelector('.likes-count').textContent = itemObject.likes;

  modal.querySelector('.social__comment-total-count').textContent = itemObject.comments.length;

  document.querySelector('.social__comments').innerHTML = '';
  createListComment(itemObject.comments, minNumber, maxNumber);

  document.querySelector('.social__caption').textContent = itemObject.description;

  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', handlerEscKeydown);

  arrComments = itemObject.comments;
  document.querySelector('.comments-loader').addEventListener('click', btnLoaderHeandler);
}

function closePopup () {
  minNumber = 0;
  maxNumber = NUMBER_COMMENTS_DISPLAYED;
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', handlerEscKeydown);
  document.querySelector('.comments-loader').removeEventListener('click', btnLoaderHeandler);
}

function handlerEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function createListComment (arr, min, max) {
  const list = document.querySelector('.social__comments');
  const comentsShowCount = document.querySelector('.social__comment-shown-count');

  if (arr.length <= max) {
    comentsShowCount.textContent = arr.length;
    document.querySelector('.comments-loader').classList.add('hidden');
  } else {
    comentsShowCount.textContent = max;
    document.querySelector('.comments-loader').classList.remove('hidden');
  }

  arr.forEach((object, index) => {
    if (index < max && index >= min) {
      const item = document.createElement('li');
      item.classList.add('social__comment');
      // создаем и наполняем <img>
      const image = document.createElement('img');
      image.classList.add('social__picture');
      image.src = object.avatar;
      image.alt = object.name;
      // тут я понял что нужно было скопировать 'li'
      image.width = '35';
      image.height = '35';
      item.appendChild(image);
      // создаем и наполняем <p>
      const desc = document.createElement('p');
      desc.classList.add('social__text');
      desc.textContent = object.message;
      item.appendChild(desc);
      // добавляем наполненный item в список
      list.appendChild(item);
    }
  });
}

function btnLoaderHeandler () {
  minNumber += NUMBER_COMMENTS_DISPLAYED;
  maxNumber += NUMBER_COMMENTS_DISPLAYED;
  createListComment(arrComments, minNumber, maxNumber);
}

export {openPopup};

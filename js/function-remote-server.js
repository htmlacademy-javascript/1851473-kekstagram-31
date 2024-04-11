
import {isEscapeKey} from './util.js';

const DELAY = 5000;
const bodyNode = document.querySelector('body');

function showErrorMessage () {
  const templateErrorNode = document.querySelector('#data-error').content;
  bodyNode.appendChild(templateErrorNode.cloneNode(true));
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, DELAY);
}

function showErrorMessageBigPicture () {
  const templateErrorNode = document.querySelector('#error').content;
  bodyNode.appendChild(templateErrorNode.cloneNode(true));
  const errorBtnNode = document.querySelector('.error__button');
  const modalErrorNode = document.querySelector('.error');
  function hiddenErrorMesage () {
    modalErrorNode.remove();
    document.removeEventListener('keydown', escModalErrorKeydownHandler);
  }
  errorBtnNode.addEventListener('click', () => {
    hiddenErrorMesage();
  });
  modalErrorNode.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error__inner') && !evt.target.matches('.error__title')) {
      hiddenErrorMesage();
    }
  });
  document.addEventListener('keydown', escModalErrorKeydownHandler);
  function escModalErrorKeydownHandler (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hiddenErrorMesage();
    }
  }
}

function showSuccessMessageBigPicture () {
  const templateSuccessNode = document.querySelector('#success').content;
  bodyNode.appendChild(templateSuccessNode.cloneNode(true));
  bodyNode.classList.add('modal-open');
  const successBtnNode = document.querySelector('.success__button');
  const modalSuccessNode = document.querySelector('.success');
  function hiddenSeccessMesage () {
    modalSuccessNode.remove();
    document.removeEventListener('keydown', escModalSuccessKeydownHandler);
    bodyNode.classList.remove('modal-open');
  }
  successBtnNode.addEventListener('click', () => {
    hiddenSeccessMesage();
  });
  modalSuccessNode.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success__inner') && !evt.target.matches('.success__title')) {
      hiddenSeccessMesage();
    }
  });
  document.addEventListener('keydown', escModalSuccessKeydownHandler);
  function escModalSuccessKeydownHandler (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      hiddenSeccessMesage();
    }
  }
}

export {showErrorMessage, showSuccessMessageBigPicture, showErrorMessageBigPicture};

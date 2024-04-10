
import {isEscapeKey} from './util.js';

function showErrorMessage () {
  const templateErrorNode = document.querySelector('#data-error').content;
  const bodyNode = document.querySelector('body');
  bodyNode.appendChild(templateErrorNode.cloneNode(true));
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
}

function showErrorMessageBigPicture () {
  const templateErrorNode = document.querySelector('#error').content;
  const bodyNode = document.querySelector('body');
  bodyNode.appendChild(templateErrorNode.cloneNode(true));
  const errorBtnNode = document.querySelector('.error__button');
  const modalErrorNode = document.querySelector('.error');
  errorBtnNode.addEventListener('click', () => {
    modalErrorNode.remove();
    document.removeEventListener('keydown', escModalErrorKeydownHandler);
  });
  modalErrorNode.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error__inner')) {
      modalErrorNode.remove();
      document.removeEventListener('keydown', escModalErrorKeydownHandler);
    }
  });
  document.addEventListener('keydown', escModalErrorKeydownHandler);
  function escModalErrorKeydownHandler (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalErrorNode.remove();
      document.removeEventListener('keydown', escModalErrorKeydownHandler);
    }
  }
}

function showSuccessMessageBigPicture () {
  const templateSuccessNode = document.querySelector('#success').content;
  const bodyNode = document.querySelector('body');
  bodyNode.appendChild(templateSuccessNode.cloneNode(true));
  const successBtnNode = document.querySelector('.success__button');
  const modalSuccessNode = document.querySelector('.success');
  successBtnNode.addEventListener('click', () => {
    modalSuccessNode.remove();
    document.removeEventListener('keydown', escModalSuccessKeydownHandler);
  });
  modalSuccessNode.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success__inner')) {
      modalSuccessNode.remove();
      document.removeEventListener('keydown', escModalSuccessKeydownHandler);
    }
  });
  document.addEventListener('keydown', escModalSuccessKeydownHandler);
  function escModalSuccessKeydownHandler (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalSuccessNode.remove();
      document.removeEventListener('keydown', escModalSuccessKeydownHandler);
    }
  }
}

export {showErrorMessage, showSuccessMessageBigPicture, showErrorMessageBigPicture};

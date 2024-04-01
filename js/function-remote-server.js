import {createPictures} from './create-pictures.js';
import {isEscapeKey} from './util.js';

function showErrorMessage () {
  const templateError = document.querySelector('#data-error').content;
  const body = document.querySelector('body');
  body.appendChild(templateError.cloneNode(true));
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, 5000);
}

function getServerPictures () {
  fetch ('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => createPictures(pictures))
    .catch(() => {
      showErrorMessage();
    });
}

function showErrorMessageBigPicture () {
  const templateError = document.querySelector('#error').content;
  const body = document.querySelector('body');
  body.appendChild(templateError.cloneNode(true));
  const errorBtn = document.querySelector('.error__button');
  const modalError = document.querySelector('.error');
  errorBtn.addEventListener('click', () => {
    modalError.remove();
    document.removeEventListener('keydown', handlerEscModalError);
  });
  modalError.addEventListener('click', (evt) => {
    if (!evt.target.matches('.error__inner')) {
      modalError.remove();
      document.removeEventListener('keydown', handlerEscModalError);
    }
  });
  document.addEventListener('keydown', handlerEscModalError);
  function handlerEscModalError (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalError.remove();
      document.removeEventListener('keydown', handlerEscModalError);
    }
  }
}

function showSuccessMessageBigPicture () {
  const templateSuccess = document.querySelector('#success').content;
  const body = document.querySelector('body');
  body.appendChild(templateSuccess.cloneNode(true));
  const successBtn = document.querySelector('.success__button');
  const modalSuccess = document.querySelector('.success');
  successBtn.addEventListener('click', () => {
    modalSuccess.remove();
    document.removeEventListener('keydown', handlerEscModalSuccess);
  });
  modalSuccess.addEventListener('click', (evt) => {
    if (!evt.target.matches('.success__inner')) {
      modalSuccess.remove();
      document.removeEventListener('keydown', handlerEscModalSuccess);
    }
  });
  document.addEventListener('keydown', handlerEscModalSuccess);
  function handlerEscModalSuccess (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modalSuccess.remove();
      document.removeEventListener('keydown', handlerEscModalSuccess);
    }
  }
}

function setServerPictures (formData, onSuccess) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    },
  )
    .then(onSuccess)
    .then(() => {
      showSuccessMessageBigPicture();
    })
    .catch(() => {
      showErrorMessageBigPicture();
    });
}
export {getServerPictures, setServerPictures};

import {createPictures} from './create-pictures.js';

function showErrorMessage () {
  const templateError = document.querySelector('#data-error').content;
  const body = document.querySelector('body');
  body.appendChild(templateError);
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
export {getServerPictures};

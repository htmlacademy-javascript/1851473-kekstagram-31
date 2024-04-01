import {isEscapeKey} from '../util.js';
const HASTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const hastagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'

}, false);

function validateHastag (valueHastagInput) {
  const hastags = valueHastagInput.trim().split(' ');
  for (let i = 0; i < hastags.length - 1; i++) {
    for (let j = i + 1; j < hastags.length; j++) {

      if (hastags[i].trim().toLowerCase() === hastags[j].trim().toLowerCase()) {
        return false;
      }
    }
  }

  if (hastags.length > 5) {
    return false;
  }
  for (let i = 0; i < hastags.length; i++) {
    if (hastags[i] && !HASTAG.test(hastags[i])) {
      return false;
    }
  }
  return true;
}

function handlerFocusEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
hastagInput.addEventListener('keydown', handlerFocusEsc);

pristine.addValidator(hastagInput,validateHastag, 'Неккоректное значение');

commentInput.addEventListener('keydown', handlerFocusEsc);

function onFormSubmit () {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      fetch('https://31.javascript.htmlacademy.pro/kekstagram ', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
    }
  });
}
export {onFormSubmit};

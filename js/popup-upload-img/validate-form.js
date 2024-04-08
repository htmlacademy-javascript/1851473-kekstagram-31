import {isEscapeKey} from '../util.js';
import {showErrorMessageBigPicture, showSuccessMessageBigPicture} from '../function-remote-server.js';
import {sendData} from '../api.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_QUANTITY_HASHTAG = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const formNode = document.querySelector('.img-upload__form');
const hashtagInputNode = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButtonNode = formNode.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
  submitButtonNode.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
  submitButtonNode.textContent = SubmitButtonText.IDLE;
};

const pristine = new Pristine(formNode, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'

}, false);


function validateHashtagRepeat (valueHashtagInput) {
  const hashtags = valueHashtagInput.trim().split(' ');
  for (let i = 0; i < hashtags.length - 1; i++) {
    for (let j = i + 1; j < hashtags.length; j++) {

      if (hashtags[i].trim().toLowerCase() === hashtags[j].trim().toLowerCase()) {
        return false;
      }
    }
  }
  return true;
}

function validateHashtagMaxQuantity (valueHashtagInput) {
  const hashtags = valueHashtagInput.trim().split(' ');
  if (hashtags.length > MAX_QUANTITY_HASHTAG) {
    return false;
  }
  return true;
}

function validateHashtag (valueHashtagInput) {
  const hashtags = valueHashtagInput.trim().split(' ');

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i] && !HASHTAG.test(hashtags[i])) {
      return false;
    }
  }
  return true;
}

function focusKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
hashtagInputNode.addEventListener('keydown', focusKeydownHandler);

pristine.addValidator(hashtagInputNode,validateHashtag, 'Неккоректное значение');
pristine.addValidator(hashtagInputNode,validateHashtagMaxQuantity, `Хэштегов не должно быть больше ${MAX_QUANTITY_HASHTAG}!`);
pristine.addValidator(hashtagInputNode,validateHashtagRepeat, 'Хэштеги не должны повторяться!');

commentInput.addEventListener('keydown', focusKeydownHandler);

function clearForm () {
  formNode.reset();
  pristine.validate();
}

function formSubmit (onSuccess) {
  formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(onSuccess)
        .then(() => {
          formNode.reset();
        })
        .then(() => {
          showSuccessMessageBigPicture();
        })
        .catch(() => {
          showErrorMessageBigPicture();
        })
        .finally(unblockSubmitButton);
    }
  });
}

export {formSubmit, clearForm};

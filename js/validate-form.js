import {isEscapeKey} from './util.js';
const HASTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const form = document.querySelector('.img-upload__form');
const hastagInput = document.querySelector('.text__hashtags');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'

}, false);

function validateHastag (value) {
  let hastags = value.trim().split(' ');
    console.log(hastags)
    for (let i = 0; i < hastags.length - 1; i++) {
      for (let j = i + 1; j < hastags.length; j++) {

        if (hastags[i].trim().toLowerCase() == hastags[j].trim().toLowerCase()) {
          console.log('1')
          return false
        }
      }
    }

    if (hastags.length > 5) {
      console.log('2')
      return false
    };
    for (let i = 0; i < hastags.length; i++) {
      if (hastags[i] && !HASTAG.test(hastags[i])) {
        console.log('3')
        return false
      }
    };
  return true
  // почему не работает форич?
  // hastags.forEach(function (hastag) {
  //   if (!HASTAG.test(hastag)) {
  //     return false
  //   }
  // });
}

function handlerFocusEsc (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
}
hastagInput.addEventListener('keydown', handlerFocusEsc)


pristine.addValidator(hastagInput,validateHastag, 'Неккоректное значение');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

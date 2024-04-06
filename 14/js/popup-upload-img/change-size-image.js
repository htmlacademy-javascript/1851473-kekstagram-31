const STEP = 25;
const MAX_VALUE_RANGE = 100;
const btnSmallSize = document.querySelector('.scale__control--smaller');
const btnBigSize = document.querySelector('.scale__control--bigger');
const sizeInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

function onSizeImage () {
  btnBigSize.addEventListener('click', onBtnBig);
  btnSmallSize.addEventListener('click', onBtnSmall);
}

function onBtnBig () {
  let inputValue = Number(sizeInput.value.replace('%', ''));
  inputValue += STEP;
  if (inputValue > MAX_VALUE_RANGE) {
    inputValue = MAX_VALUE_RANGE;
  }
  sizeInput.value = `${inputValue}%`;

  imgUploadPreview.style.transform = `scale(${inputValue / MAX_VALUE_RANGE})`;
}

function onBtnSmall () {
  let inputValue = Number(sizeInput.value.replace('%', ''));
  inputValue -= STEP;
  if (inputValue < STEP) {
    inputValue = STEP;
  }
  sizeInput.value = `${inputValue}%`;

  imgUploadPreview.style.transform = `scale(${inputValue / MAX_VALUE_RANGE})`;
}

function removeSizeImage () {
  btnSmallSize.removeEventListener('click', onBtnSmall);
  btnBigSize.removeEventListener('click', onBtnBig);
  imgUploadPreview.style.transform = '';
}

export {onSizeImage, removeSizeImage};



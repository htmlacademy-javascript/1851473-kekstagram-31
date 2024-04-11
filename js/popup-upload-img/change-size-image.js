const STEP = 25;
const MAX_VALUE_RANGE = 100;
const btnSmallSizeNode = document.querySelector('.scale__control--smaller');
const btnBigSizeNode = document.querySelector('.scale__control--bigger');
const sizeInputNode = document.querySelector('.scale__control--value');
const imgUploadPreviewNode = document.querySelector('.img-upload__preview img');

function changeSizeImage () {
  btnBigSizeNode.addEventListener('click', btnBigClickHandler);
  btnSmallSizeNode.addEventListener('click', btnSmallClickHandler);
}

function btnBigClickHandler () {
  let inputValue = Number(sizeInputNode.value.replace('%', ''));
  inputValue += STEP;
  if (inputValue > MAX_VALUE_RANGE) {
    inputValue = MAX_VALUE_RANGE;
  }
  sizeInputNode.value = `${inputValue}%`;

  imgUploadPreviewNode.style.transform = `scale(${inputValue / MAX_VALUE_RANGE})`;
}

function btnSmallClickHandler () {
  let inputValue = Number(sizeInputNode.value.replace('%', ''));
  inputValue -= STEP;
  if (inputValue < STEP) {
    inputValue = STEP;
  }
  sizeInputNode.value = `${inputValue}%`;

  imgUploadPreviewNode.style.transform = `scale(${inputValue / MAX_VALUE_RANGE})`;
}

function removeSizeImage () {
  btnSmallSizeNode.removeEventListener('click', btnSmallClickHandler);
  btnBigSizeNode.removeEventListener('click', btnBigClickHandler);
  imgUploadPreviewNode.style.transform = '';
}

export {changeSizeImage, removeSizeImage};



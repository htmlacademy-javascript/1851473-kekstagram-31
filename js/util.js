// генератор рандом числ которые повторяются
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


// генератор рандом числ которые НЕ повторяются
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

// достаёт рандомный элемент массива
function getRandomArrayElement(array) {
  const i = getRandomInteger(0, array.length - 1);
  return array[i];
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, createRandomIdFromRangeGenerator, getRandomArrayElement, isEscapeKey};

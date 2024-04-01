function checkingStringLength (string, maxLengthString) {
  return string.length <= maxLengthString;
}

//способ академии
function palindromeCheck (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let secondSting = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    secondSting += newString[i];
  }
  return secondSting === newString;
}

//мой второй способ.
function palindromeCheckSecond (string) {
  const newString = string.toLowerCase();

  let coincidence = true;
  for (let i = 0; i < newString.length; i++) {
    if(newString[i] !== newString.at(-1 - i)) {
      coincidence = false;
    }
  }
  return coincidence;
}

function retrievesNumbers(string) {
  let numberString = '';
  const newString = string.toString();
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i]))) {
      numberString += newString[i];
    }
  }
  return parseInt(numberString)
}

function getTimeMinutes (timeString) {
  const arr = timeString.split(':');
  return +arr[0] * 60 + +arr[1];
}

function checkWorkingDay(startWorkDay, endWorkDay, start, duration) {
  const startWorkMinutes = getTimeMinutes(startWorkDay);
  const endWorkMinutes = getTimeMinutes(endWorkDay);
  const startMinutes = getTimeMinutes(start);

  if (startMinutes < startWorkMinutes || startMinutes > endWorkMinutes || endWorkMinutes < startMinutes + duration) {
    return false;
  }
  return true;
}


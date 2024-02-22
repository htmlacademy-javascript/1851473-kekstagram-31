function checkingStringLength (string, maxLengthString) {
  return string.length <= maxLengthString;
}

//способ академии
function palindromeCheck (string) {
  let newString = string.replaceAll(' ', '').toLowerCase();
  let secondSting = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    secondSting += newString[i]
  }
  return secondSting === newString;
}

//мой второй способ.
function palindromeCheckSecond (string) {
  let newString = string.toLowerCase();

  let coincidence = true;
  for (let i = 0; i < newString.length; i++) {
    if(newString[i] !== newString.at(-1 - i)) {
      coincidence = false
    }
  }
  return coincidence
}

function retrievesNumbers(string) {
  let numberString = '';
  let newString = string.toString();
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i]))) {
      numberString += newString[i]
    }
  }
  return parseInt(numberString)
}



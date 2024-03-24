const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const filtersRadio = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');



function filterRangeSlider () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  document.querySelector('.img-upload__effect-level').classList.add('hidden');

  sliderElement.noUiSlider.on('update', function () {
    sliderInput.value = sliderElement.noUiSlider.get();
  });

  filtersRadio.forEach( function (filterRadio) {
    filterRadio.addEventListener('change', function (evt) {
      const nameEffect = filterRadio.value;

      if (nameEffect == 'chrome') {
        sliderElement.noUiSlider.on('update', function () {
          sliderInput.value = sliderElement.noUiSlider.get();
          imagePreview.style.filter = `grayscale(${sliderInput.value})`;
        });
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      }  else if (nameEffect == 'sepia') {
        sliderElement.noUiSlider.on('update', function () {
          sliderInput.value = sliderElement.noUiSlider.get();
          imagePreview.style.filter = `sepia(${sliderInput.value})`;
        });
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      } else if (nameEffect == 'marvin') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1
        });
        sliderElement.noUiSlider.on('update', function () {
          sliderInput.value = sliderElement.noUiSlider.get();
          imagePreview.style.filter = `invert(${sliderInput.value}%)`;
        });
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      } else if (nameEffect == 'phobos') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3
        });
        sliderElement.noUiSlider.on('update', function () {
          sliderInput.value = sliderElement.noUiSlider.get();
          imagePreview.style.filter = `blur(${sliderInput.value}px)`;
        });
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      } else if (nameEffect == 'heat') {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3
        });
        sliderElement.noUiSlider.on('update', function () {
          sliderInput.value = sliderElement.noUiSlider.get();
          imagePreview.style.filter = `brightness(${sliderInput.value})`;
        });
        document.querySelector('.img-upload__effect-level').classList.remove('hidden');
      } else {
        imagePreview.style.filter = null;
        document.querySelector('.img-upload__effect-level').classList.add('hidden');
      }
    })
  });
}

export {filterRangeSlider};

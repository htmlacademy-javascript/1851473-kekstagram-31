const sliderElement = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');
const filtersRadio = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const rangeFilter = document.querySelector('.img-upload__effect-level');
const Filters = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};


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

  function reloadValueSlider (filterStyleString) {
    const filterStyle = Filters[filterStyleString];
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: filterStyle.range.min,
        max: filterStyle.range.max,
      },
      start: filterStyle.start,
      step: filterStyle.step
    });
    sliderElement.noUiSlider.on('update', () => {
      sliderInput.value = sliderElement.noUiSlider.get();
      imagePreview.style.filter = `${filterStyle.filter}(${sliderInput.value}${filterStyle.unit})`;
    });
    rangeFilter.classList.remove('hidden');
  }

  rangeFilter.classList.add('hidden');

  sliderElement.noUiSlider.on('update', () => {
    sliderInput.value = sliderElement.noUiSlider.get();
  });

  filtersRadio.forEach((filterRadio) => {
    filterRadio.addEventListener('change', () => {
      const nameEffect = filterRadio.value;
      if (nameEffect === 'none') {
        imagePreview.style.filter = null;
        rangeFilter.classList.add('hidden');
      } else {
        reloadValueSlider(nameEffect);
      }
    });
  });
}

function removeFilterRangeSlider () {
  sliderElement.noUiSlider.destroy();
  imagePreview.style.filter = null;
}

export {filterRangeSlider, removeFilterRangeSlider};

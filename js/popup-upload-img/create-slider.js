const sliderNode = document.querySelector('.effect-level__slider');
const sliderInputNode = document.querySelector('.effect-level__value');
const filtersRadioNode = document.querySelectorAll('.effects__radio');
const imagePreviewNode = document.querySelector('.img-upload__preview img');
const rangeFilterNode = document.querySelector('.img-upload__effect-level');
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
  noUiSlider.create(sliderNode, {
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
    sliderNode.noUiSlider.updateOptions({
      range: {
        min: filterStyle.range.min,
        max: filterStyle.range.max,
      },
      start: filterStyle.start,
      step: filterStyle.step
    });
    sliderNode.noUiSlider.on('update', () => {
      sliderInputNode.value = sliderNode.noUiSlider.get();
      imagePreviewNode.style.filter = `${filterStyle.filter}(${sliderInputNode.value}${filterStyle.unit})`;
    });
    rangeFilterNode.classList.remove('hidden');
  }

  rangeFilterNode.classList.add('hidden');

  sliderNode.noUiSlider.on('update', () => {
    sliderInputNode.value = sliderNode.noUiSlider.get();
  });

  filtersRadioNode.forEach((filterRadio) => {
    filterRadio.addEventListener('change', () => {
      const nameEffect = filterRadio.value;
      if (nameEffect === 'none') {
        imagePreviewNode.style.filter = null;
        rangeFilterNode.classList.add('hidden');
      } else {
        reloadValueSlider(nameEffect);
      }
    });
  });
}

function removeFilterRangeSlider () {
  sliderNode.noUiSlider.destroy();
  imagePreviewNode.style.filter = null;
}

export {filterRangeSlider, removeFilterRangeSlider};

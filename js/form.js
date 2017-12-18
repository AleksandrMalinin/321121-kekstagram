'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  // var uploadResizeDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  // var uploadResizeIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');
  // var submit = uploadOverlay.querySelector('.upload-form-submit');
  var filterHandle = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var rangeValue = uploadEffectControls.querySelector('.upload-effect-level-val');
  var effectValue = uploadEffectControls.querySelector('.upload-effect-level-value');

  effectValue.style.display = 'none';
  rangeValue.style.width = '0%';
  filterHandle.style.display = 'none';

  var applyDefaultFilter = function () {
    if (effectImagePreview.className === 'effect-none') {
      rangeValue.style.width = '0%';
      filterHandle.style.display = 'none';
      effectImagePreview.style.filter = 'none';
    }

    if (effectImagePreview.className === 'effect-chrome') {
      effectImagePreview.style.filter = 'grayscale(' + window.constants.INITIAL_INPUT_VALUE / 100 + ')';
    }

    if (effectImagePreview.className === 'effect-sepia') {
      effectImagePreview.style.filter = 'sepia(' + window.constants.INITIAL_INPUT_VALUE / 100 + ')';
    }

    if (effectImagePreview.className === 'effect-marvin') {
      effectImagePreview.style.filter = 'invert(' + window.constants.INITIAL_INPUT_VALUE + '%' + ')';
    }

    if (effectImagePreview.className === 'effect-phobos') {
      effectImagePreview.style.filter = 'blur(' + window.constants.INITIAL_INPUT_VALUE / 100 * 5 + 'px' + ')';
    }

    if (effectImagePreview.className === 'effect-heat') {
      effectImagePreview.style.filter = 'brightness(' + window.constants.INITIAL_INPUT_VALUE / 100 * 3 + ')';
    }
  };

  window.initializeFilter.applyClass(applyDefaultFilter);

  var adjustScale = function () {
    if (parseInt(uploadResizeValue.value, 10) < window.constants.PERCENT_MAXVALUE) {
      effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
    } else {
      effectImagePreview.style.transform = 'scale(1)';
    }
  };

  window.initializeScale.resizeDecrease(adjustScale);
  window.initializeScale.resizeIncrease(adjustScale);

  // хэштеги
  hashTags.addEventListener('keypress', function () {
    var separator = ' ';
    var hashTagsSplit = hashTags.value.split(separator);
    hashTags.style.outlineColor = '';

    for (var i = 0; i < hashTagsSplit.length; i++) {
      hashTagsSplit[i] = hashTagsSplit[i].toLowerCase();

      if (hashTagsSplit[i].length !== 0 && hashTagsSplit[i].lastIndexOf('#') !== 0) {
        hashTags.setCustomValidity('Хэш-тег должен начинаться с #!');
        hashTags.style.outlineColor = 'red';
      } else {
        hashTags.setCustomValidity('');
      }

      if (hashTagsSplit[i].length > window.constants.HASHTAG_MAXLENGTH) {
        hashTags.setCustomValidity('Длина хэш-тега должна быть не больше 20 символов!');
        hashTags.style.outlineColor = 'red';
      } else {
        hashTags.setCustomValidity('');
      }

      for (var j = i; j < hashTagsSplit.length; j++) {
        if (hashTagsSplit[i] === hashTagsSplit[j + 1]) {
          hashTags.setCustomValidity('Хэш-теги не должны повторяться!');
          hashTags.style.outlineColor = 'red';
          break;
        }
      }
    }

    if (hashTagsSplit.length > 5) {
      hashTags.setCustomValidity('Хэш-тегов не может быть больше 5!');
      hashTags.style.outlineColor = 'red';
    }
  });

  var applyFilter = function () {
    if (effectImagePreview.className === 'effect-chrome') {
      effectImagePreview.style.filter = 'grayscale(' + (effectValue.value / window.constants.PERCENT_MAXVALUE).toFixed(1) + ')';
    }

    if (effectImagePreview.className === 'effect-sepia') {
      effectImagePreview.style.filter = 'sepia(' + (effectValue.value / window.constants.PERCENT_MAXVALUE).toFixed(1) + ')';
    }

    if (effectImagePreview.className === 'effect-marvin') {
      effectImagePreview.style.filter = 'invert(' + Math.round((filterHandle.offsetLeft + window.shift.x) / window.constants.RANGE_MAXCOORD * window.constants.PERCENT_MAXVALUE) + '%' + ')';
    }

    if (effectImagePreview.className === 'effect-phobos') {
      effectImagePreview.style.filter = 'blur(' + (effectValue.value / window.constants.PERCENT_MAXVALUE * window.constants.BLUR_MAXVALUE).toFixed(1) + 'px' + ')';
    }

    if (effectImagePreview.className === 'effect-heat') {
      effectImagePreview.style.filter = 'brightness(' + (effectValue.value / window.constants.PERCENT_MAXVALUE * window.constants.BRIGHTNESS_MAXVALUE).toFixed(1) + ')';
    }
  };

  window.initializeFilter.controlSLider(applyFilter);
})();

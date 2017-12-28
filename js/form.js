'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');
  var uploadPhotoForm = document.querySelector('.upload-form');
  var effectLevelBlock = uploadEffectControls.querySelector('.upload-effect-level');
  var filterHandle = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var effectValue = uploadEffectControls.querySelector('.upload-effect-level-value');

  var setDefaultOptions = function () {
    effectValue.style.display = 'none';
    filterHandle.style.display = 'none';
    effectLevelBlock.style.display = 'none';
    effectImagePreview.style = '';
    effectImagePreview.className = 'effect-image-preview';
    uploadResizeValue.setAttribute('value', window.constants.PERCENT_MAXVALUE + '%');
  };

  setDefaultOptions();

  var setDefaultFilter = function () {
    effectLevelBlock.style.display = 'block';

    if (effectImagePreview.className === 'effect-none') {
      filterHandle.style.display = 'none';
      effectImagePreview.style.filter = 'none';
      effectLevelBlock.style.display = 'none';
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

  window.initializeFilter.applyClass(setDefaultFilter);

  var adjustScale = function () {
    var parsedResizeValue = parseInt(uploadResizeValue.value, 10);
    if (parsedResizeValue < window.constants.PERCENT_MAXVALUE) {
      effectImagePreview.style.transform = 'scale(0.' + parsedResizeValue + ')';
    } else {
      effectImagePreview.style.transform = 'scale(1)';
    }
  };

  window.initializeScale.resizeDecrease(adjustScale);
  window.initializeScale.resizeIncrease(adjustScale);

  var uniqueHashTag = function unique(array) {
    var obj = {};

    for (var i = 0; i < array.length; i++) {
      var str = array[i];
      obj[str] = true;
    }

    return Object.keys(obj);
  };

  var getFormError = function () {
    var separator = ' ';
    var hashTagsSplit = hashTags.value.toLowerCase().split(separator);
    hashTags.style.outlineColor = '';
    hashTags.style.outlineStyle = 'solid';

    /* for (var i = 0; i < hashTagsSplit.length; i++) {
      if (hashTagsSplit[i].length !== 0 && hashTagsSplit[i].lastIndexOf('#') !== 0) {
        return 'Хэш-тег должен начинаться с #!';
      }

      if (hashTagsSplit[i].length > window.constants.HASHTAG_MAXLENGTH) {
        return 'Длина хэш-тега должна быть не больше 20 символов!';
      }

      for (var j = i; j < hashTagsSplit.length; j++) {
        if (hashTagsSplit[i] === hashTagsSplit[j + 1]) {
          return 'Хэш-теги не должны повторяться!';
        }
      }
    }

    if (hashTagsSplit.length > 5) {
      return 'Хэш-тегов не может быть больше 5!';
    }

    return false;*/

    /* if (uniqueHashTag(hashTagsSplit).length === hashTagsSplit.length) {
      return true;
    }*/

    if (hashTagsSplit.length > 5) {
      return 'Хэш-тегов не может быть больше 5!';
    }

    var getFormValidity = hashTagsSplit.some(function (hashTag) {

      if (hashTag.length > window.constants.HASHTAG_MAXLENGTH
        || (hashTag.length !== 0 && hashTag.lastIndexOf('#') !== 0)
        || uniqueHashTag(hashTagsSplit).length !== hashTagsSplit.length) {
        return true;
      }

      return false;
    });

    return getFormValidity;
  };

  var checkForm = function () {
    var errors = getFormError();

    if (errors) {
      hashTags.style.outlineColor = 'red';
      hashTags.setCustomValidity(''); // ???
    } else {
      hashTags.setCustomValidity('');
    }
  };

  // хэштеги
  hashTags.addEventListener('input', function () {
    checkForm();
  });

  uploadPhotoForm.addEventListener('submit', function (evt) {
    checkForm();
    window.backend.save(new FormData(uploadPhotoForm), function () {
      uploadOverlay.classList.add('hidden');
      uploadPhotoForm.reset();
      setDefaultOptions();
    }, window.util.errorHandler);

    evt.preventDefault();
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

  window.initializeFilter.controlSlider(applyFilter);
})();

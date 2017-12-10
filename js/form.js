'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay'); // временно для работы
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadResizeDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
  var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');
  // var allFormFields = uploadOverlay.querySelectorAll('input');
  var submit = uploadOverlay.querySelector('.upload-form-submit');

  // смена фильтра
  uploadEffectControls.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.type !== 'radio') {
      return;
    }

    effectImagePreview.className = target.getAttribute('name') + '-' + target.getAttribute('value');
  });

  // уменьшение масштаба
  uploadResizeDecrease.addEventListener('click', function () {
    if (parseInt(uploadResizeValue.value, 10) <= parseInt(uploadResizeValue.min, 10)) {
      return;
    }

    uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) - parseInt(uploadResizeValue.step, 10) + '%');
    effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
  });

  // увеличение масштаба
  uploadResizeIncrease.addEventListener('click', function () {
    if (parseInt(uploadResizeValue.value, 10) >= parseInt(uploadResizeValue.max, 10)) {
      return;
    }

    uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) + parseInt(uploadResizeValue.step, 10) + '%');
    if (parseInt(uploadResizeValue.value, 10) < 100) {
      effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
    } else {
      effectImagePreview.style.transform = 'scale(1)';
    }
  });

  // хэштеги
  hashTags.addEventListener('change', function () {
    var separator = ' ';
    var hashTagsSplit = hashTags.value.split(separator);
    hashTags.style.outlineColor = '';

    for (var i = 0; i < hashTagsSplit.length; i++) {
      hashTagsSplit[i] = hashTagsSplit[i].toLowerCase();

      if (hashTagsSplit[i].lastIndexOf('#') !== 0) {
        hashTags.setCustomValidity('Хэш-тег должен начинаться с #!');
        hashTags.style.outlineColor = 'red';
      }

      if (hashTagsSplit[i].length > 20) {
        hashTags.setCustomValidity('Длина хэш-тега должна быть не больше 20 символов!');
        hashTags.style.outlineColor = 'red';
      }

      for (var j = i; j < hashTagsSplit.length; j++) {
        if (hashTagsSplit[i] === hashTagsSplit[j + 1]) {
          hashTags.setCustomValidity('Хэш-теги не должны повторяться!');
          hashTags.style.outlineColor = 'red';
        }
      }
    }

    if (hashTagsSplit.length > 5) {
      hashTags.setCustomValidity('Хэш-тегов не может быть больше 5!');
      hashTags.style.outlineColor = 'red';
    }
  });

  /*submit.addEventListener('submit', function () {
    effectImagePreview.style.transform = 'scale(1)';
    effectImagePreview.classList.add = 'effect-none';
    hashTags.value = '';
  });*/
})();

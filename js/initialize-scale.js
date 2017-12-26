'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadResizeDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var uploadResizeIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');

  window.initializeScale = {
    resizeDecrease: function (callback) {
      uploadResizeDecrease.addEventListener('click', function () {
        if (parseInt(uploadResizeValue.value, 10) <= parseInt(uploadResizeValue.min, 10)) {
          return;
        }

        uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) - parseInt(uploadResizeValue.step, 10) + '%');
        callback();
      });
    },

    resizeIncrease: function (callback) {
      uploadResizeIncrease.addEventListener('click', function () {
        if (parseInt(uploadResizeValue.value, 10) >= parseInt(uploadResizeValue.max, 10)) {
          return;
        }

        uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) + parseInt(uploadResizeValue.step, 10) + '%');
        callback();
      });
    }
  };
})();

'use strict';

(function () {
  var uploadOverlay = document.querySelector('.upload-overlay');
  var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
  var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
  var uploadEffectLevel = uploadEffectControls.querySelector('.upload-effect-level');
  var filterHandle = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var rangeValue = uploadEffectControls.querySelector('.upload-effect-level-val');
  var effectValue = uploadEffectControls.querySelector('.upload-effect-level-value');

  window.initializeFilter = {
    applyClass: function (callback) {
      uploadEffectControls.addEventListener('click', function (evt) {
        var target = evt.target;

        if (target.type !== 'radio') {
          return;
        }

        effectImagePreview.className = target.getAttribute('name') + '-' + target.getAttribute('value');
        filterHandle.style.display = 'block';
        filterHandle.style.left = window.constants.RANGE_MAXCOORD / window.constants.PERCENT_MAXVALUE * window.constants.INITIAL_INPUT_VALUE + 'px';
        rangeValue.style.width = window.constants.RANGE_MAXCOORD / window.constants.PERCENT_MAXVALUE * window.constants.INITIAL_INPUT_VALUE - window.constants.HALF_FILTERHANDLE + 'px';
        effectValue.value = window.constants.INITIAL_INPUT_VALUE;

        callback();
      });
    },

    controlSlider: function (callback) {
      filterHandle.addEventListener('mousedown', function (evt) {
        var startCoords = {
          x: evt.clientX
        };

        var mouseMoveHandler = function (moveEvt) {

          window.shift = {
            x: startCoords.x - moveEvt.clientX,
          };

          startCoords = {
            x: moveEvt.clientX
          };

          if (window.shift.x <= filterHandle.offsetLeft) {
            filterHandle.style.left = filterHandle.offsetLeft - window.shift.x + 'px';
            rangeValue.style.width = parseInt(filterHandle.style.left, 10) - window.constants.HALF_FILTERHANDLE + 'px';
            effectValue.value = Math.round((filterHandle.offsetLeft + window.shift.x) / window.constants.RANGE_MAXCOORD * window.constants.PERCENT_MAXVALUE);

            if (filterHandle.offsetLeft > window.constants.RANGE_MAXCOORD) {
              filterHandle.style.left = filterHandle.offsetLeft + window.shift.x + 'px';
              rangeValue.style.width = parseInt(filterHandle.style.left, 10) - window.constants.HALF_FILTERHANDLE + 'px';
              effectValue.value = Math.round((filterHandle.offsetLeft + window.shift.x) / window.constants.RANGE_MAXCOORD * window.constants.PERCENT_MAXVALUE);
            }
          }

          callback();
        };

        var mouseUpHandler = function () {
          uploadEffectLevel.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
        };

        uploadEffectLevel.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });
    }
  };
})();

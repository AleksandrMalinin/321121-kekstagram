'use strict';

(function () {
  window.util = {
    escEvent: function (evt, closeWindow) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        closeWindow();
      }
    },

    enterEvent: function (evt, closeWindow) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        closeWindow();
      }
    },

    getRandomNumber: function (minValue, maxValue) {
      return Math.round(Math.random() * (maxValue - minValue) + minValue);
    },

    getRandomIndex: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getArrayRandomComments: function (array) {
      return window.util.getRandomNumber(1, 2) === 1 ? [window.util.getRandomIndex(array)] : [window.util.getRandomIndex(array), window.util.getRandomIndex(array)];
    },

    errorHandler: function (errorMessage) {
      var template = document.createElement('div');
      template.textContent = errorMessage;

      var styles = [
        'position: fixed',
        'top: 50%',
        'left: 50%',
        'z-index: 100',
        'width: 800px',
        'padding: 20px',
        'color: #fff',
        'text-align: center',
        'transform: translate(-50%, -50%)',
        'border-radius: 2px',
        'background-color: #DC143C'
      ];

      template.style.cssText = styles.join(';');
      document.body.appendChild(template);
    }
  };
})();

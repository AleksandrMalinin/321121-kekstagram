'use strict';

(function () {
  var lastTimeout;

  window.util = {
    debounce: function (action) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(action, window.constants.DEBOUNCE_INTERVAL);
    },

    escEvent: function (evt, callback) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        callback();
      }
    },

    enterEvent: function (evt, callback) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        callback();
      }
    },

    getRandomNumber: function (minValue, maxValue) {
      return Math.round(Math.random() * (maxValue - minValue) + minValue);
    },

    getRandomIndex: function (array) {
      return array[Math.floor(Math.random() * array.length)];
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
    },

    getUniqueElements: function (element, index, self) {
      return self.indexOf(element) === index;
    }
  };
})();

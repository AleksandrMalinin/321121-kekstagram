'use strict';

(function () {
  window.util = {
    escEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        action();
      }
    },

    enterEvent: function (evt, action) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        action();
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
    }
  };
})();

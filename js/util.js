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
    }
  };
})();

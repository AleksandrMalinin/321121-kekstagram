'use strict';

(function () {
  var reactToServer = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === window.constants.SERVER_STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      reactToServer(xhr, onLoad, onError);

      xhr.timeout = window.constants.SERVER_TIMEOUT;

      xhr.open('GET', window.constants.URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      reactToServer(xhr, onLoad, onError);

      xhr.timeout = window.constants.SERVER_TIMEOUT;

      xhr.open('POST', window.constants.URL);
      xhr.send(data);
    }
  };
})();

'use strict';

(function () {
  var URL = 'https://1510.dump.academy/kekstagram/data';
  var FORM_URL = 'https://1510.dump.academy/kekstagram';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
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

      xhr.timeout = 15000;

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('POST', FORM_URL);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.addEventListener('error', function () {
        onError('сообщение об ошибке!');
      });

      xhr.send(data);
    }
  };
})();

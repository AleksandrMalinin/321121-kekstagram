'use strict';

(function () {
  var photosList = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var data = [];

  var getDataPictures = function (pictures) {
    data = pictures;
    window.renderPicture(pictures);
  };

  window.backend.load(getDataPictures, window.util.errorHandler);
  filters.classList.remove('filters-inactive');

  var removePictures = function () {
    var picturesList = photosList.querySelectorAll('.picture');
    /*for (var i = 0; i < picturesList.length; i++) {
      photosList.removeChild(picturesList[i]);
    }*/
    picturesList.forEach(function (element) {
      photosList.removeChild(element);
    });
  };

  var sortingPictures = {
    'recommend': function (array) {
      return array;
    },

    'popular': function (array) {
      return array.slice(0).sort(function (first, second) {
        return second.likes - first.likes;
      });
    },

    'discussed': function (array) {
      return array.slice(0).sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    },

    'random': function (array) {
      return array.slice(0).sort(function () {
        return Math.random() - 0.5;
      });
    }
  };

  filters.addEventListener('click', function (evt) {
    if (evt.target.type === 'radio') {
      window.util.debounce(function () {
        removePictures();
        window.renderPicture(sortingPictures[evt.target.value](data));
      });
    }
  });
})();

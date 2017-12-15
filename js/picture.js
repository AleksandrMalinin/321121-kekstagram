'use strict';

(function () {
  var photosList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  window.meow();

    // созданные дом-элементы
    var renderPicture = function (picture) {
      var photoElement = pictureTemplate.cloneNode(true);

      photoElement.querySelector('img').src = picture.url;
      photoElement.querySelector('.picture-likes').textContent = picture.likes;
      photoElement.querySelector('.picture-comments').textContent = picture.comments.length;

      return photoElement;
    };

    // отрисовка дом-элементов в блоке .pictures при помощи documentFragment
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    photosList.appendChild(fragment);
})();

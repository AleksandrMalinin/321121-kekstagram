'use strict';

(function () {
  var photosList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  var createElements = function (picture) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('img').src = picture.url;
    photoElement.querySelector('.picture-likes').textContent = picture.likes;
    photoElement.querySelector('.picture-comments').textContent = picture.comments.length;

    return photoElement;
  };

  window.renderPicture = function (pictures) {
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (element) {
      fragment.appendChild(createElements(element));
    });
    photosList.appendChild(fragment);
  };
})();

'use strict';

(function () {
  var photosList = document.querySelector('.pictures');

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var uploadFile = document.querySelector('.upload-input');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');

  var keyPressHandlerGallery = function (e) {
    window.util.escEvent(e, closeGallery);
  };

  var openGallery = function () {
    galleryOverlay.classList.remove('hidden');
  };

  var closeGallery = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', keyPressHandlerGallery);
  };

  //  фотографии в галерее
  photosList.addEventListener('click', function (evt) {
    evt.preventDefault();
    openGallery();

    var target = evt.target;
    var parentNode = target.parentNode;

    galleryOverlay.querySelector('img').setAttribute('src', parentNode.querySelector('img').getAttribute('src'));
    galleryOverlay.querySelector('.likes-count').textContent = parentNode.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = parentNode.querySelector('.picture-comments').textContent;

    document.addEventListener('keydown', keyPressHandlerGallery);
  });

  // закрытие галереи
  galleryClose.addEventListener('click', function () {
    closeGallery();
  });

  // закрытие галереи через ENTER
  galleryClose.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, closeGallery);
  });

  var keyPressHandlerPopup = function (evt) {
    window.util.escEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', keyPressHandlerPopup);
    uploadFormDescription.addEventListener('keydown', function (evt) {
      window.util.escEvent(evt, evt.stopPropagation());
    });
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', keyPressHandlerPopup);
  };

  // показ окна формы при загрузке фотографии
  uploadFile.addEventListener('change', function () {
    openPopup();
  });

  // скрытие окна формы
  uploadFormCancel.addEventListener('click', function () {
    closePopup();
  });

  // закрытие через ENTER
  uploadFormCancel.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, closePopup);
  });
})();

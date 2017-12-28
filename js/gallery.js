'use strict';

(function () {
  var photosList = document.querySelector('.pictures');

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var uploadFile = document.querySelector('.upload-input');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');

  var keyPressGalleryHandler = function (evt) {
    window.util.escEvent(evt, closeGallery);
  };

  var openGallery = function () {
    galleryOverlay.classList.remove('hidden');
  };

  var closeGallery = function () {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', keyPressGalleryHandler);
  };

  //  фотографии в галерее
  photosList.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target.closest('.picture');

    galleryOverlay.querySelector('img').setAttribute('src', target.querySelector('img').getAttribute('src'));
    galleryOverlay.querySelector('.likes-count').textContent = target.querySelector('.picture-likes').textContent;
    galleryOverlay.querySelector('.comments-count').textContent = target.querySelector('.picture-comments').textContent;

    openGallery();

    document.addEventListener('keydown', keyPressGalleryHandler);
  });

  // закрытие галереи
  galleryClose.addEventListener('click', closeGallery);

  // закрытие галереи через ENTER
  galleryClose.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, closeGallery);
  });

  var keyPressPopupHandler = function (evt) {
    window.util.escEvent(evt, closePopup);
  };

  var openPopup = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', keyPressPopupHandler);
    uploadFormDescription.addEventListener('keydown', function (evt) {
      window.util.escEvent(evt, evt.stopPropagation());
    });
  };

  var closePopup = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', keyPressPopupHandler);
  };

  // показ окна формы при загрузке фотографии
  uploadFile.addEventListener('change', openPopup);

  // скрытие окна формы
  uploadFormCancel.addEventListener('click', closePopup);

  // закрытие через ENTER
  uploadFormCancel.addEventListener('keydown', function (evt) {
    window.util.enterEvent(evt, closePopup);
  });
})();

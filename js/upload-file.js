'use strict';

(function () {
  var fileChooser = document.querySelector('.upload-input');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.constants.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

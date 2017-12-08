'use strict';

var PICTURES_LENGTH = 25;
var LIKE_MINCOUNTS = 15;
var LIKE_MAXCOUNTS = 200;

var galleryOverlay = document.querySelector('.gallery-overlay');
var photosList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');

var getRandomNumber = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

var getRandomIndex = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayRandomComments = function () {
  return getRandomNumber(1, 2) === 1 ? [getRandomIndex(picturesComments)] : [getRandomIndex(picturesComments), getRandomIndex(picturesComments)];
};

var picturesComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var pictures = [];

// генерация постов
for (var i = 0; i < PICTURES_LENGTH; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomNumber(LIKE_MINCOUNTS, LIKE_MAXCOUNTS),
    comments: getArrayRandomComments()
  };
}

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
for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
photosList.appendChild(fragment);

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var uploadFile = document.querySelector('.upload-input');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadFormDescription = uploadOverlay.querySelector('.upload-form-description');
var uploadEffectControls = uploadOverlay.querySelector('.upload-effect-controls');
var effectImagePreview = uploadOverlay.querySelector('.effect-image-preview');
var uploadResizeDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
var uploadResizeIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValue = uploadOverlay.querySelector('.upload-resize-controls-value');
var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');
var submit = uploadOverlay.querySelector('.upload-form-submit');

var openGallery = function () {
  galleryOverlay.classList.remove('hidden');
};

var closeGallery = function () {
  galleryOverlay.classList.add('hidden');
  document.removeEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeGallery();
    }
  });
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

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      closeGallery();
    }
  });
});

// закрытие галереи
galleryClose.addEventListener('click', function () {
  closeGallery();
});

// закрытие галереи через ENTER
galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeGallery();
  }
});

var escapePressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', escapePressHandler);
  uploadFormDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
};

var closePopup = function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', escapePressHandler);
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
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// смена фильтра
uploadEffectControls.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.type !== 'radio') {
    return;
  }

  effectImagePreview.className = target.getAttribute('name') + '-' + target.getAttribute('value');
});

// уменьшение масштаба
uploadResizeDecrease.addEventListener('click', function () {
  if (parseInt(uploadResizeValue.value, 10) <= parseInt(uploadResizeValue.min, 10)) {
    return;
  }

  uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) - parseInt(uploadResizeValue.step, 10) + '%');
  effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
});

// увеличение масштаба
uploadResizeIncrease.addEventListener('click', function () {
  if (parseInt(uploadResizeValue.value, 10) >= parseInt(uploadResizeValue.max, 10)) {
    return;
  }

  uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) + parseInt(uploadResizeValue.step, 10) + '%');
  if (parseInt(uploadResizeValue.value, 10) < 100) {
    effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
  } else {
    effectImagePreview.style.transform = 'scale(1)';
  }
});

// хэштеги
hashTags.addEventListener('change', function () {
  var separator = ' ';
  var hashTagsSplit = hashTags.value.split(separator);
  hashTags.style.outlineColor = '';

  for (i = 0; i < hashTagsSplit.length; i++) {
    hashTagsSplit[i] = hashTagsSplit[i].toLowerCase();

    if (hashTagsSplit[i].lastIndexOf('#') !== 0) {
      hashTags.setCustomValidity('Хэш-тег должен начинаться с #!');
      hashTags.style.outlineColor = 'red';
    }

    if (hashTagsSplit[i].length > 20) {
      hashTags.setCustomValidity('Длина хэш-тега должна быть не больше 20 символов!');
      hashTags.style.outlineColor = 'red';
    }

    for (var j = i; j < hashTagsSplit.length; j++) {
      if (hashTagsSplit[i] === hashTagsSplit[j + 1]) {
        hashTags.setCustomValidity('Хэш-теги не должны повторяться!');
        hashTags.style.outlineColor = 'red';
      }
    }
  }

  if (hashTagsSplit.length > 5) {
    hashTags.setCustomValidity('Хэш-тегов не может быть больше 5!');
    hashTags.style.outlineColor = 'red';
  }
});

submit.addEventListener('click', function () {

});

'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
var photosList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');

var getRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
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
for (var i = 0; i < 25; i++) {
  var urlRandom = i + 1;
  var likesRandom = Math.floor(getRandomNumber(15, 200));
  var commentsRandom = Math.floor(Math.random() * picturesComments.length);

  pictures[i] = {
    url: 'photos/' + urlRandom + '.jpg',
    likes: likesRandom,
    comments: [picturesComments[commentsRandom]]
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
// var hashTags = uploadOverlay.querySelector('.upload-form-hashtags');

//  фотографии в галерее
photosList.addEventListener('click', function (evt) {
  evt.preventDefault();
  galleryOverlay.classList.remove('hidden');

  var target = evt.target;
  var parentNode = target.parentNode;

  galleryOverlay.querySelector('img').setAttribute('src', parentNode.querySelector('img').getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = parentNode.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = parentNode.querySelector('.picture-comments').textContent;

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === ESC_KEYCODE) {
      galleryOverlay.classList.add('hidden');
    }
  });
});

// закрытие галереи
galleryClose.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});

// закрытие галереи через ENTER
galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    galleryOverlay.classList.add('hidden');
  }
});

// показ окна формы при загрузке фотографии
uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');

  // закрытие через ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      uploadOverlay.classList.add('hidden');
    }
  });

  // при фокусе на комментарии форма не закрывается
  uploadFormDescription.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
});

// скрытие окна формы
uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      uploadOverlay.classList.add('hidden');
    }
  });
});

// закрытие через ENTER
uploadFormCancel.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    uploadOverlay.classList.add('hidden');
  }
});

// смена фильтра
uploadEffectControls.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.type !== 'radio') {
    return;
  }

  effectImagePreview.classList.add(target.getAttribute('name') + '-' + target.getAttribute('value'));
});

// уменьшение масштаба
uploadResizeDecrease.addEventListener('click', function () {
  if (parseInt(uploadResizeValue.value, 10) === parseInt(uploadResizeValue.min, 10)) {
    return;
  }

  uploadResizeValue.setAttribute('value', parseInt(uploadResizeValue.value, 10) - parseInt(uploadResizeValue.step, 10) + '%');
  effectImagePreview.style.transform = 'scale(0.' + parseInt(uploadResizeValue.value, 10) + ')';
});

// увеличение масштаба
uploadResizeIncrease.addEventListener('click', function () {
  if (parseInt(uploadResizeValue.value, 10) === parseInt(uploadResizeValue.max, 10)) {
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

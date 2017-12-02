'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
// var galleryOverlayPreview = galleryOverlay.querySelector('.gallery-overlay-preview');
var photosList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
var galleryClose = galleryOverlay.querySelector('.gallery-overlay-close');

var getRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

var picturesComments = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
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

  pictures[i] = {};
  pictures[i].url = 'photos/' + urlRandom + '.jpg';
  pictures[i].likes = likesRandom;
  pictures[i].comments = [picturesComments[commentsRandom]];
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

// заполнение данными из первого массива

/*  for (i = 0; i < pictures.length; i++) {
  galleryOverlayPreview.querySelector('img').src = pictures[i].url;
  galleryOverlayPreview.querySelector('.likes-count').textContent = pictures[i].likes;
  galleryOverlayPreview.querySelector('.comments-count').textContent = pictures[i].comments.length;
}*/

photosList.addEventListener('click', function (evt) {
  evt.preventDefault();
  galleryOverlay.classList.remove('hidden');

  var target = evt.target;
  var parentNode = target.parentNode;

  galleryOverlay.querySelector('img').setAttribute('src', parentNode.querySelector('img').getAttribute('src'));
  galleryOverlay.querySelector('.likes-count').textContent = parentNode.querySelector('.picture-likes').textContent;
  galleryOverlay.querySelector('.comments-count').textContent = parentNode.querySelector('.picture-comments').textContent;

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      galleryOverlay.classList.add('hidden');
    }
  });
});

galleryClose.addEventListener('click', function () {
  galleryOverlay.classList.add('hidden');
});

galleryClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    galleryOverlay.classList.add('hidden');
  }
});

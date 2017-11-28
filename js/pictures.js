'use strict';

var galleryOverlay = document.querySelector('.gallery-overlay');
galleryOverlay.classList.remove('hidden');
var galleryOverlayPreview = galleryOverlay.querySelector('.gallery-overlay-preview');

var photosList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

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
  var urlrand = i + 1;
  var likesrand = Math.floor(getRandomNumber(15, 200));
  var commentsrand = Math.floor(Math.random() * picturesComments.length);

  pictures[i] = {};
  pictures[i].url = 'photos/' + urlrand + '.jpg';
  pictures[i].likes = likesrand;
  pictures[i].comments = picturesComments[commentsrand];
}

console.log(pictures)

// созданные дом-элементы
var renderPicture = function (picture) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').src = picture.url;
  photoElement.querySelector('.picture-likes').textContent = picture.likes;
  photoElement.querySelector('.picture-comments').textContent = picture.comments;

  return photoElement;
};

// отрисовка дом-элементов в блоке .pictures при помощи documentFragment
var fragment = document.createDocumentFragment();
for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}
photosList.appendChild(fragment);


// заполнение данными из первого массива
galleryOverlayPreview.querySelector('img').src = pictures[0].url;
galleryOverlayPreview.querySelector('.likes-count').textContent = pictures[0].likes;
galleryOverlayPreview.querySelector('.comments-count').textContent = pictures[0].comments;

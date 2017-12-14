'use strict';

(function () {
  var PICTURES_LENGTH = 25;
  var LIKE_MINCOUNTS = 15;
  var LIKE_MAXCOUNTS = 200;

  var photosList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  var getRandomNumber = function (minValue, maxValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  };

  var getRandomIndex = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getArrayRandomComments = function (array) {
    return getRandomNumber(1, 2) === 1 ? [getRandomIndex(array)] : [getRandomIndex(array), getRandomIndex(array)];
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
  for (var i = 0; i < PICTURES_LENGTH; i++) { // и здесь?
    pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(LIKE_MINCOUNTS, LIKE_MAXCOUNTS), // вот здесь мне что, тоже писать константы через window? Это же длинно и глупо!
      comments: getArrayRandomComments(picturesComments)
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
})();

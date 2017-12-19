'use strict';

(function () {
  var picturesComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.pictures = [];

  // генерация постов
  for (var i = 0; i < window.constants.PICTURES; i++) {
    window.pictures[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: window.util.getRandomNumber(window.constants.LIKE_MINCOUNTS, window.constants.LIKE_MAXCOUNTS),
      comments: window.util.getArrayRandomComments(picturesComments)
    };
  }
})();

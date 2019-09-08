'use strict';

(function () {
  let map = document.querySelector(".map");
  let mapWidth = map.offsetWidth;
  let mainPin = map.querySelector(".map__pin--main");

  window.data = {
    pinWidth: 40,
    pinHeight: 44,
    mainPinWidth: 65,
    mainPinHeight: 65,
    minY: 130,
    maxY: 630,
    pinsCount: 8,
    minRooms: 1,
    maxRooms: 5,
    minGuests: 1,
    maxGuests: 5,
    minPrice: 1000,
    maxPrice: 1000000,
    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде',
    ],
    types: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    minPrices: [
      '10000',
      '1000',
      '5000',
      '0'
    ],
    times: [
      '12:00',
      '13:00',
      '14:00',
    ],
    featuresList: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner',
    ],
    photos: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
    mapWidth: mapWidth,
    isActive: false,
    map: map,
    mainPin: mainPin,
  };
})();

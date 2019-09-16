'use strict';

(function () {
  let map = document.querySelector('.map');
  let mapWidth = map.offsetWidth;
  let mainPin = map.querySelector('.map__pin--main');

  window.data = {
    pinWidth: 40,
    pinHeight: 44,
    mainPinWidth: 65,
    mainPinHeight: 65,
    minY: 130,
    maxY: 700,
    mainPinStartPos: {
      x: mainPin.style.left,
      y: mainPin.style.top,
    },
    offersAmount: 5,
    mapWidth: mapWidth,
    map: map,
    mainPin: mainPin,
    offers: [],
    filteredOffers: [],
  };
})();

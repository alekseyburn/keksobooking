"use strict";

(function () {

  //создание массива из pinCount элементов, заполнение элемента данными
  let createAdvertsList = () => {
    let pins = [];

    for (let i = 0; i < window.data.pinsCount; i++) {
      // let pinCoordX = window.utils.getRandomDigit(-window.data.pinWidth / 2, window.data.mapWidth - window.data.pinWidth / 2);
      // let pinCoordY = window.utils.getRandomDigit(window.data.minY, window.data.maxY);

      let pin = {
        author: {
          avatar: `img/avatars/user0${i+1}.png`
        },
        offer: {
          title: window.utils.takeFromArr(window.data.titles),
          address: `${pinCoordX}, ${pinCoordY}`,
          price: window.utils.getRandomDigit(window.data.minPrice, window.data.maxPrice),
          type: window.data.types[window.utils.getRandomDigit(0, window.data.types.length - 1)],
          rooms: window.utils.getRandomDigit(window.data.minRooms, window.data.maxRooms),
          guests: window.utils.getRandomDigit(window.data.minGuests, window.data.maxGuests),
          checkin: window.data.times[window.utils.getRandomDigit(0, window.data.times.length - 1)],
          checkout: window.data.times[window.utils.getRandomDigit(0, window.data.times.length - 1)],
          features: window.utils.getSubArr(window.data.featuresList),
          description: "",
          photos: window.utils.shuffleArray(window.data.photos)
        },
        location: {
          x: pinCoordX,
          y: pinCoordY
        }
      }

      pins.push(pin);
    }

    return pins;
  }

  window.card = {
    createAdvertsList: createAdvertsList
  };
})();

'use strict';

(function () {
  let pinTemplate = document.getElementById('pin').
    content.
    querySelector('.map__pin');

  //копирование разметки из тимплейта, заполнение информации элемента
  let createPin = (id, pin) => {
    let pinElement = pinTemplate.cloneNode(true);
    let pinImg = pinElement.querySelector('img');

    pinElement.dataset.id = id;
    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.type;
    pinElement.style.left = `${pin.location.x - window.data.pinWidth / 2}px`;
    pinElement.style.top = `${pin.location.y - window.data.pinHeight}px`;

    return pinElement;
  };

  window.pin = {
    createPin: createPin,
  };
})();

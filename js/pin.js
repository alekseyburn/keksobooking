"use strict";

(function () {
  let similarTemplateElement = document.getElementById("pin").content.querySelector(".map__pin");

  //копирование разметки из тимплейта, заполнение информации элемента
  let renderPin = (pin) => {
    let pinElement = similarTemplateElement.cloneNode(true);
    let pinImg = pinElement.querySelector("img");

    pinImg.src = pin.author.avatar;
    pinImg.alt = pin.offer.type;
    pinElement.style.left = `${pin.location.x - window.data.pinWidth / 2}px`
    pinElement.style.top = `${pin.location.y - window.data.pinHeight}px`;

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();

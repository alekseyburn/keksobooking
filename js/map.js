'use strict';
(function () {
  let map = document.querySelector('.map');
  let mapPins = document.querySelector('.map__pins');
  let createdPins = [];
  let activePin = null;
  let isCardRendered = false;

//создание pinsCount объектов pin, добавление их в разметку
  let renderPins = (pins) => {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < pins.length; i++) {
      fragment.appendChild(window.pin.createPin(i, pins[i]));
    }
    mapPins.appendChild(fragment);

    createdPins = mapPins.querySelectorAll('.map__pin:not([class$="main"])');
    createdPins.forEach(pin => pin.addEventListener('click', onPinClick));
  };

  let clearPins = () => {
    createdPins.forEach((item) => item.remove());
    createdPins = [];
  };

  let onPinClick = (evt) => {
    let pin = evt.currentTarget;

    if (activePin === pin) {
      return;
    }
    if (isCardRendered) {
      clearCard();
      resetActivePin();
    }
    pin.classList.add('map__pin--active');
    activePin = pin;
    openCard(+pin.dataset.id);
  };

  let onCardCloseBtnClick = () => closeCard();

  let onCardEscPress = evt => window.utils.onEscPress(evt, closeCard);

  let resetActivePin = () => {
    activePin.classList.remove('map__pin--active');
    activePin = null;
  };

  let openCard = (pinId) => {
    let card = window.card.createCard(window.data.filteredOffers[pinId]);
    map.appendChild(card);
    isCardRendered = true;

    let cardCloseBtn = card.querySelector('.popup__close');

    cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
    document.addEventListener('keydown', onCardEscPress);
  };

  let clearCard = () => {
    map.querySelector('.map__card').remove();
    isCardRendered = false;

    document.removeEventListener('keydown', onCardEscPress);
  };

  let closeCard = () => {
    if (isCardRendered) {
      clearCard();
      activePin.focus();
      resetActivePin();
    }
  };

  window.map = {
    closeCard: closeCard,
    renderPins: renderPins,
    clearPins: clearPins,
    mapPins: mapPins,
  };
})();

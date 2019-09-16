'use strict';

(function () {
  let templateCard = document.getElementById('card').
    content.
    querySelector('.map__card');
  let cardElement = templateCard.cloneNode(true);
  let cardImg = cardElement.querySelector('img');
  let cardTitle = cardElement.querySelector('.popup__title');
  let cardAddress = cardElement.querySelector('.popup__text--address');
  let cardPrice = cardElement.querySelector('.popup__text--price');
  let cardType = cardElement.querySelector('.popup__type');
  let cardCapacity = cardElement.querySelector('.popup__text--capacity');
  let cardTime = cardElement.querySelector('.popup__text--time');
  let cardFeatures = cardElement.querySelector('.popup__features');
  let cardDescription = cardElement.querySelector('.popup__description');
  let cardPhotos = cardElement.querySelector('.popup__photos');

  //копирование разметки из тимплейта, заполнение информации элемента
  let createCard = (card) => {
    cardImg.src = card.author.avatar;
    cardImg.alt = card.offer.title;
    cardTitle.textContent = card.offer.title;
    cardAddress.textContent = card.offer.address;
    cardPrice.textContent = card.offer.price;
    cardType.textContent = card.offer.type;
    cardCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд после ${card.offer.checkout}`;
    cardFeatures.innerHTML = '';
    card.offer.features.forEach((item) => {
      let li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${item}`);
      cardFeatures.appendChild(li);
    });
    cardDescription.textContent = card.offer.description;
    cardPhotos.innerHTML = '';
    card.offer.photos.forEach((item) => {
      let img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      img.src = item;
      cardPhotos.appendChild(img);
    });

    return cardElement;
  };

  window.card = {
    createCard: createCard,
  };
})();

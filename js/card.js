"use strict";

(function () {
  let similarTemplateElement = document.getElementById("card").content.querySelector(".map__card");

  //копирование разметки из тимплейта, заполнение информации элемента
  let renderCard = (card) => {
    let cardElement = similarTemplateElement.cloneNode(true);
    let cardImg = cardElement.querySelector("img");
    let cardTitle = cardElement.querySelector(".popup__title");
    let cardAddress = cardElement.querySelector(".popup__text--address");
    let cardPrice = cardElement.querySelector(".popup__text--price");
    let cardType = cardElement.querySelector(".popup__type");
    let cardCapacity = cardElement.querySelector(".popup__text--capacity");
    let cardTime = cardElement.querySelector(".popup__text--time");
    let cardFeatures = cardElement.querySelector(".popup__features");
    let cardDescription = cardElement.querySelector(".popup__description");
    let cardPhotos = cardElement.querySelector(".popup__photos");

    cardImg.src = card.author.avatar;
    cardImg.alt = card.offer.title;
    cardTitle.textContent = card.offer.title;
    cardAddress.textContent = card.offer.address;
    cardPrice.textContent = card.offer.price;
    cardType.textContent = card.offer.type;
    cardCapacity.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardTime.textContent = `Заезд после ${card.offer.checkin}, выезд после ${card.offer.checkout}`;
    cardFeatures.innerHTML = "";
    card.offer.features.forEach((item) => {
      let li = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${item}`);
      cardFeatures.appendChild(li);
    });
    cardDescription.textContent = card.offer.description;
    cardPhotos.innerHTML = "";
    card.offer.photos.forEach((item) => {
      let img = document.createElement("img");
      img.classList.add("popup__photo");
      img.width = 45;
      img.height = 40;
      img.alt = "Фотография жилья";
      img.src = item;
      cardPhotos.appendChild(img);
    });

    return cardElement;
  };


  //закрытие карточки при ее наличии
  let closeCard = () => {
    let card = document.querySelector(".map__card");
    if (card) {
      document.removeEventListener("keydown", onEscPressCard);
      card.querySelector(".popup__close").removeEventListener("click", closeCard);
      card.remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }
  };

  let onEscPressCard = (evt) => {
    if (evt.keyCode === 27) {
      closeCard();
    }
  };

  //показать карточку при клике на пин
  let showCard = function (data) {
    closeCard();
    window.map.mapPins.appendChild(renderCard(data));
    document.addEventListener("keydown", onEscPressCard);
    document.querySelector(".popup__close").addEventListener("click", closeCard);
  };

  window.card = {
    renderCard: renderCard,
    closeCard: closeCard,
    showCard: showCard,
  };
})();

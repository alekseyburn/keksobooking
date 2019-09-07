'use strict'

let map = document.querySelector(".map");
let mapWidth = map.offsetWidth;
let similarListElement = document.querySelector(".map__pins");
let similarTemplateElement = document.getElementById("pin").content.querySelector(".map__pin");
let adForm = document.querySelector(".ad-form");
let fieldsetForm = document.querySelectorAll("fieldset");
let filterForm = document.querySelectorAll(".map__filter")
let mainPin = map.querySelector(".map__pin--main");
let addressInput = document.getElementById("address");
let houseType = document.getElementById("type");
let nightPrice = document.getElementById("price");

const pinWidth = 40;
const pinHeight = 44;
const mainPinWidth = 65;
const mainPinHeight = 65;
const minY = 130;
const maxY = 630;

let minMainPinY = minY - mainPinHeight;
let maxMainPinY = maxY - mainPinHeight;
let minMainPinX = -mainPinWidth / 2;
let maxMainPinX = mapWidth - mainPinWidth / 2;

let isActive = false;

const pinsCount = 8;
const minRooms = 1;
const maxRooms = 5;
const minGuests = 1;
const maxGuests = 5;
const minPrice = 1000;
const maxPrice = 1000000;

const titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
];
const types = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
const minPrices = [
  '10000',
  '1000',
  '5000',
  '0'
];
const times = [
  '12:00',
  '13:00',
  '14:00',
]
const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
]
const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

//рандомное число
let getRandomDigit = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

//перемешивание массива
let shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

//Выбор значения из массива и возврат массива без этого значения
let takeFromArr = (arr) => {
  let clone = arr.slice();
  return clone.splice(clone.indexOf(clone[getRandomDigit(0, clone.length - 1)]), 1);
};

//Получение массива с рандомными элементами из другого массива
let getSubArr = (arr) => shuffleArray(arr.slice()).splice(0, getRandomDigit(0, arr.length - 1));

//получение центральной нижней точки элемента
let getCoords = (item) => {
  return {
    x: Math.round(item.offsetLeft + item.getBoundingClientRect().width / 2),
    y: Math.round(item.offsetTop + item.getBoundingClientRect().height)
  }
};

//переключение элементов формы в disabled если они доступны и наоборот
let toggleElement = (elem) => elem.forEach((item) => item.disabled ? item.disabled = false : item.disabled = true);

//создание массива из pinCount элементов, заполнение элемента данными
let createAdvertsList = () => {
  let pins = [];

  for (let i = 0; i < pinsCount; i++) {
    let pinCoordX = getRandomDigit(-pinWidth / 2, mapWidth - pinWidth / 2);
    let pinCoordY = getRandomDigit(minY, maxY);

    let pin = {
      author: {
        avatar: `img/avatars/user0${i+1}.png`
      },
      offer: {
        title: takeFromArr(titles),
        address: `${pinCoordX}, ${pinCoordY}`,
        price: getRandomDigit(minPrice, maxPrice),
        type: types[getRandomDigit(0, types.length - 1)],
        rooms: getRandomDigit(minRooms, maxRooms),
        guests: getRandomDigit(minGuests, maxGuests),
        checkin: times[getRandomDigit(0, times.length - 1)],
        checkout: times[getRandomDigit(0, times.length - 1)],
        features: getSubArr(featuresList),
        description: "",
        photos: shuffleArray(photos)
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

//копирование разметки из тимплейта, заполнение информации элемента
let renderPin = (pin) => {
  let pinElement = similarTemplateElement.cloneNode(true);
  let pinImg = pinElement.querySelector("img");

  pinImg.src = pin.author.avatar;
  pinImg.alt = pin.offer.type;
  pinElement.style.left = `${pin.location.x - pinWidth / 2}px`
  pinElement.style.top = `${pin.location.y - pinHeight}px`;

  return pinElement;
};

//создание pinsCount объектов pin, добавление их в разметку
let createFragment = (pins) => {
  let fragment = document.createDocumentFragment();
  pins.forEach(pin => fragment.appendChild(renderPin(pin)));
  similarListElement.appendChild(fragment);
}

//дизейблим элементы формы при открытии страницы
toggleElement(fieldsetForm);
toggleElement(filterForm);

//запись координат главного пина в Адрес Формы
let setAddressCoords = () => {
  let mainPinCoords = getCoords(mainPin);
  addressInput.value = `${mainPinCoords.x}, ${mainPinCoords.y}`;
};

setAddressCoords();

//При нажатии на центральный пин активируем страницу
let onMainPinClick = () => {
  map.classList.remove("map--faded");
  adForm.classList.remove("ad-form--disabled");
  toggleElement(fieldsetForm);
  toggleElement(filterForm);
  createFragment(createAdvertsList());

  isActive = true;
}

//При выборе типа жилья ставит минимальную соответствующую цену за ночь
let onTypeChange = (evt) => {
  nightPrice.min = minPrices[types.indexOf(evt.currentTarget.value)];
  nightPrice.placeholder = minPrices[types.indexOf(evt.currentTarget.value)];
};

houseType.addEventListener("change", onTypeChange);

//реализация перетаскивания главного пина
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  //перемещение пина и запись в координаты адрес
  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    setAddressCoords();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    //ограничение по краям(верх и низ - высота пина, лево и право - половина ширины пина)
    mainPin.style.top = `${Math.min(Math.max(minMainPinY, mainPin.offsetTop - shift.y), maxMainPinY)}px`;
    mainPin.style.left = `${Math.min(Math.max(minMainPinX, mainPin.offsetLeft - shift.x), maxMainPinX)}px`;

  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    if (!isActive) {
      onMainPinClick();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

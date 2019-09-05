'use strict'

let map = document.querySelector(".map");
let mapWidth = map.offsetWidth;
let pins = document.querySelector(".map__pins");
let similarListElement = document.querySelector(".map__pins");
let similarTemplateElement = document.getElementById("pin").content.querySelector(".map__pin");


const pinWidth = 40;
const pinHeight = 44;
const minY = 130;
const maxY = 630;
const pinsCount = 8;

const titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде',
]
const types = [
  'palace',
  'flat',
  'house',
  'bungalo'
]
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

let getRandomDigit = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

let shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

let takeFromArr = (arr) => {
  let clone = arr.slice();
  return clone.splice(clone.indexOf(clone[getRandomDigit(0, clone.length - 1)]), 1);
}

//создание массива из pinCount элементов, заполнение элемента данными
let createAdvertsList = () => {
  let pins = [];

  for (let i = 0; i < pinsCount; i++) {
    let pin = {
      author: {
        avatar: `img/avatars/user0${i+1}.png`
      },
      offer: {
        title: takeFromArr(titles),
        address: `${this.location.x}, ${this.location.y}`,
        price: getRandomDigit(1000, 1000000),
        type: types[getRandomDigit(0, types.length - 1)],
        rooms: getRandomDigit(1, 5),
        guests: getRandomDigit(1, 5),
        checkin: times[getRandomDigit(0, times.length - 1)],
        checkout: times[getRandomDigit(0, times.length - 1)],
        description: "",
        photos: shuffleArray(photos)
      },
      location: {
        x: getRandomDigit(0, mapWidth),
        y: getRandomDigit(minY, maxY)
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
  for (let i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  similarListElement.appendChild(fragment);
}

createFragment(createAdvertsList());

map.classList.remove("map--faded");

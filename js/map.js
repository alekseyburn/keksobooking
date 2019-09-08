'use strict'

let similarListElement = document.querySelector(".map__pins");
let similarTemplateElement = document.getElementById("pin").content.querySelector(".map__pin");
let adForm = document.querySelector(".ad-form");

//создание pinsCount объектов pin, добавление их в разметку
let createFragment = (pins) => {
  let fragment = document.createDocumentFragment();
  pins.forEach(pin => fragment.appendChild(window.pin.renderPin(pin)));
  similarListElement.appendChild(fragment);
}

//При нажатии на центральный пин активируем страницу
let onMainPinClick = () => {
  window.data.map.classList.remove("map--faded");
  adForm.classList.remove("ad-form--disabled");
  window.utils.toggleElement(window.form.fieldsetForm);
  window.utils.toggleElement(window.form.filterForm);
  createFragment(window.card.createAdvertsList());

  window.data.isActive = true;
}

window.map = {
  onMainPinClick: onMainPinClick
}

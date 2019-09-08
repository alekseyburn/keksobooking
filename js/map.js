'use strict'

let similarListElement = document.querySelector(".map__pins");


//создание pinsCount объектов pin, добавление их в разметку
let createFragment = (pins) => {
  let fragment = document.createDocumentFragment();
  pins.forEach(pin => fragment.appendChild(window.pin.renderPin(pin)));
  similarListElement.appendChild(fragment);
};

//При нажатии на центральный пин активируем страницу
let onMainPinClick = () => {
  window.data.map.classList.remove("map--faded");
  window.form.adForm.classList.remove("ad-form--disabled");
  window.utils.toggleElement(window.form.fieldsetForm);
  window.utils.toggleElement(window.form.filterForm);

  window.load(createFragment, errorHandler);
  window.data.isActive = true;
}

let errorHandler = (message) => {

  console.error(message);
};

window.map = {
  onMainPinClick: onMainPinClick
}

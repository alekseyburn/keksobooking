'use strict'

let mapPins = document.querySelector(".map__pins");
let errorBlock = window.form.errorMessageElement.cloneNode(true);
let errorBlockButton = errorBlock.querySelector(".error__button");

//создание pinsCount объектов pin, добавление их в разметку
let createFragment = (pins) => {
  let fragment = document.createDocumentFragment();
  pins.forEach(pin => fragment.appendChild(window.pin.renderPin(pin)));
  mapPins.appendChild(fragment);
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
  errorBlock.querySelector(".error__message").textContent = message;
  errorBlockButton.textContent = "Закрыть";
  window.form.body.appendChild(errorBlock);
  errorBlock.classList.remove("hidden");
  errorBlockButton.addEventListener("click", () => {
    errorBlock.classList.add("hidden");
  });
  console.error(message);
};

window.map = {
  onMainPinClick: onMainPinClick,
  mapPins: mapPins,
}

"use strict";

(function () {
  let fieldsetForm = document.querySelectorAll("fieldset");
  let filterForm = document.querySelectorAll(".map__filter");
  let nightPrice = document.getElementById("price");
  let houseType = document.getElementById("type");
  let addressInput = document.getElementById("address");

  //дизейблим элементы формы при открытии страницы
  window.utils.toggleElement(fieldsetForm);
  window.utils.toggleElement(filterForm);

  //При выборе типа жилья ставит минимальную соответствующую цену за ночь
  let onTypeChange = (evt) => {
    nightPrice.min = window.data.minPrices[window.data.types.indexOf(evt.currentTarget.value)];
    nightPrice.placeholder = window.data.minPrices[window.data.types.indexOf(evt.currentTarget.value)];
  };

  houseType.addEventListener("change", onTypeChange);

  //запись координат главного пина в Адрес Формы
  let setAddressCoords = () => {
    let mainPinCoords = window.utils.getCoords(window.data.mainPin);
    addressInput.value = `${mainPinCoords.x}, ${mainPinCoords.y}`;
  };

  setAddressCoords();

  window.form = {
    setAddressCoords: setAddressCoords,
    fieldsetForm: fieldsetForm,
    filterForm: filterForm
  };
})();

"use strict";

(function () {
  let fieldsetForm = document.querySelectorAll("fieldset");
  let filterForm = document.querySelectorAll(".map__filter");
  let nightPrice = document.getElementById("price");
  let houseType = document.getElementById("type");
  let addressInput = document.getElementById("address");
  let adForm = document.querySelector(".ad-form");
  let successMessageElement = document.getElementById("success").content.querySelector(".success");
  let errorMessageElement = document.getElementById("error").content.querySelector(".error");
  let errorCloseButton = errorMessageElement.querySelector(".error__button");
  let body = document.querySelector("body");

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

  //показываем сообщение об успешной загрузке и сбрасываем форму
  let onSuccess = () => {
    body.appendChild(successMessageElement);
    errorMessageElement.classList.remove("hidden");
    successMessageElement.addEventListener("click", () => {
      successMessageElement.classList.add("hidden");
      adForm.reset();
    });
  };

  //показываем сообщение об ошибке
  let onError = () => {
    body.appendChild(errorMessageElement);
    errorMessageElement.classList.remove("hidden");
    errorCloseButton.addEventListener("click", () => {
      errorMessageElement.classList.add("hidden");
    });
  };

  //отправка данных на сервер
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
      window.upload(new FormData(adForm), onSuccess ,onError);
    }
  );

  window.form = {
    setAddressCoords: setAddressCoords,
    fieldsetForm: fieldsetForm,
    filterForm: filterForm,
    adForm: adForm,
    errorMessageElement: errorMessageElement,
    errorCloseButton: errorCloseButton,
    body: body
  };
})();

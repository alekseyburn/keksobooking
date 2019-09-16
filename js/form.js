'use strict';

(function () {
  let fieldsetForm = document.querySelectorAll('fieldset');
  let filterMap = document.querySelector('.map__filters');
  let filterForm = document.querySelectorAll('.map__filter');
  let priceInput = document.getElementById('price');
  let typeInput = document.getElementById('type');
  let addressInput = document.getElementById('address');
  let timeinSelect = document.querySelector('#timein');
  let timeoutSelect = document.querySelector('#timeout');
  let roomNumberSelect = document.querySelector('#room_number');
  let capacitySelect = document.querySelector('#capacity');
  let adForm = document.querySelector('.ad-form');
  let errorMessageElement = document.getElementById('error').
    content.
    querySelector('.error');
  let errorCloseButton = errorMessageElement.querySelector('.error__button');
  let body = document.querySelector('body');
  let formReset = document.querySelector('.ad-form__reset');
  let isFormActive = false;

  let OffersMinPrices = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  let setPrice = (value) => {
    priceInput.min = OffersMinPrices[value];
    priceInput.placeholder = OffersMinPrices[value];
  };

  let setTimes = (value) => {
    timeinSelect.value = value;
    timeoutSelect.value = value;
  };

  let setCapacity = (roomNumber) => {
    let options = capacitySelect.options;

    if (+roomNumber < 100) {
      Array.prototype.forEach.call(options, function (option) {
        option.disabled = (+option.value > +roomNumber || +option.value === 0);
      });
    } else {
      Array.prototype.forEach.call(options, function (option) {
        option.disabled = (+option.value > 0);
      });
    }
    setCapacityValidity();
  };

  let setCapacityValidity = () => {
    let selectedOption = capacitySelect.options[capacitySelect.selectedIndex];

    if (selectedOption.disabled) {
      capacitySelect.setCustomValidity('Укажите подходящее количество мест');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  let onFormChange = (evt) => {
    let target = evt.target;

    switch (target.id) {
      case 'type':
        setPrice(target.value);
        break;
      case 'timein':
      case 'timeout':
        setTimes(target.value);
        break;
      case 'room_number':
        setCapacity(target.value);
        break;
      case 'capacity':
        setCapacityValidity();
    }
  };

  let activateForm = () => {
    adForm.classList.remove('ad-form--disabled');
    setPrice(typeInput.value);
    setTimes(timeinSelect.value);
    setCapacity(roomNumberSelect.value);
    setCapacityValidity();
    activateFormFields(fieldsetForm);

    adForm.addEventListener('change', onFormChange);

    isFormActive = true;
  };

  let deactivateForm = () => {
    adForm.classList.add('ad-form--disabled');
    deactivateFormFields(fieldsetForm);

    if (isFormActive) {
      adForm.reset();
      adForm.removeEventListener('change', onFormChange);
    }

    isFormActive = false;
  };

  //запись координат главного пина в Адрес Формы
  let setAddress = (pinCoords) => {
    addressInput.value = `${pinCoords.x}, ${pinCoords.y}`;
  };

  let activateFormFields = (form) => {
    form.forEach((item) => {
      item.disabled = false;
    });
  };

  let deactivateFormFields = (form) => {
    form.forEach((item) => {
      item.disabled = true;
    });
  };

  window.form = {
    setAddress: setAddress,
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    activateFormFields: activateFormFields,
    deactivateFormFields: deactivateFormFields,
    fieldsetForm: fieldsetForm,
    filterForm: filterForm,
    adForm: adForm,
    errorMessageElement: errorMessageElement,
    errorCloseButton: errorCloseButton,
    body: body,
    formReset: formReset,
    filterMap: filterMap,
  };
})();

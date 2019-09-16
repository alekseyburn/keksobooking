'use strict';

(function () {
  let main = document.querySelector('main');
  let errorTemplate = document.querySelector('#error').
    content.
    querySelector('.error');
  let successTemplate = document.querySelector('#success').
    content.
    querySelector('.success');

  let onAlertEscPress = (evt) => window.utils.onEscPress(evt, hideAlert);

  let onErrorClick = (evt) => {
    if (!evt.target.classList.contains('error__button')) {
      hideAlert();
    }
  };

  let onSuccessClick = () => hideAlert();

  let hideAlert = () => {
    let alerts = main.querySelectorAll('.error, .success');
    alerts.forEach(alert => alert.remove());
    document.removeEventListener('keydown', onAlertEscPress);
  };


  let showError = (errorMessage, cb) => {
    let errorElement = errorTemplate.cloneNode(true);
    let errorBtn = errorElement.querySelector('.error__button');

    let onErrorBtnClick = function () {
      hideAlert();
      cb();
    };

    errorElement.querySelector('.error__message').innerHTML = errorMessage;
    main.appendChild(errorElement);

    errorBtn.addEventListener('click', onErrorBtnClick);
    errorElement.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onAlertEscPress);
  };


  let showSuccess = (successMessage) => {
    let successElement = successTemplate.cloneNode(true);

    successElement.querySelector(
      '.success__message').innerHTML = successMessage;
    main.appendChild(successElement);

    successElement.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onAlertEscPress);
  };

  window.alerts = {
    showError: showError,
    showSuccess: showSuccess,
  };
})();

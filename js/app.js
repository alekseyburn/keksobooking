'use strict';
(function () {
  let isPageActive = false;

  let onMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    //перемещение пина и запись в координаты адрес
    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      if (!isPageActive) {
        window.app.activatePage();
        window.load(onAdsLoad, onAdsError);
      }

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      let pinX = window.data.mainPin.offsetLeft - shift.x;
      let pinY = window.data.mainPin.offsetTop - shift.y;

      if (pinX < minMainPinX) {
        pinX = minMainPinX;
      }
      if (pinX > maxMainPinX) {
        pinX = maxMainPinX;
      }
      if (pinY < minMainPinY) {
        pinY = minMainPinY;
      }
      if (pinY > maxMainPinY) {
        pinY = maxMainPinY;
      }

      //ограничение по краям(верх и низ - высота пина, лево и право - половина ширины пина)
      window.data.mainPin.style.top = `${pinY}px`;
      window.data.mainPin.style.left = `${pinX}px`;
      window.form.setAddress(window.utils.getCoords(window.data.mainPin));
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  let onAdFormResetClick = (evt) => {
    evt.preventDefault();
    resetPage();
  };

  let onFiltersFormChange = (evt) => {
    window.filters.updateFilterState(evt.target);
    updatePins(evt);
  };

  let onAdsLoad = (ads) => {
    window.data.ads = ads;
    window.filters.initAds();
    window.map.renderPins(window.data.filteredOffers);
    window.form.activateFormFields(window.form.filterForm);

    window.form.filterMap.addEventListener("change", onFiltersFormChange);
  };

  let onAdsError = (errorText) => {
    window.alerts.showError(`Ошибка - ${errorText}`, () => {
      window.load(onAdsLoad, onAdsError);
    });
  };

  let updatePins = (evt) => {
    window.map.closeCard();
    window.map.clearPins();
    window.filters.filterAds();
    window.map.renderPins(window.data.filteredOffers);
    evt.target.focus();
  };

  let activatePage = () => {
    window.data.map.classList.remove('map--faded');
    window.form.activateForm();
    window.form.formReset.addEventListener('click', onAdFormResetClick);
    isPageActive = true;
  };

  let resetPage = () => {
    if (isPageActive) {
      window.map.closeCard();
      window.map.clearPins();
      window.form.filterMap.reset();
      window.data.mainPin.style.top = window.data.mainPinStartPos.y;
      window.data.mainPin.style.left = window.data.mainPinStartPos.x;
      window.scrollTo(0, 0);

      window.form.formReset.removeEventListener('click', onAdFormResetClick);
      window.form.filterMap.removeEventListener("change", onFiltersFormChange);
    }

    window.data.map.classList.add('map--faded');
    window.form.deactivateForm();
    window.form.deactivateFormFields(window.form.filterForm);
    window.form.setAddress(window.utils.getCoords(window.data.mainPin));

    isPageActive = false;
  };

  let initPage = () => {
    resetPage();
    window.data.mainPin.addEventListener('mousedown', onMouseDown);
  };

  initPage();

  let minMainPinY = window.data.minY - window.data.mainPinHeight;
  let maxMainPinY = window.data.maxY - window.data.mainPinHeight;
  let minMainPinX = -window.data.mainPinWidth / 2;
  let maxMainPinX = window.data.mapWidth - window.data.mainPinWidth / 2;

  //реализация перетаскивания главного пина

  window.app = {
    onAdsLoad: onAdsLoad,
    onAdsError: onAdsError,
    activatePage: activatePage,
    isPageActive: isPageActive
  }
})();

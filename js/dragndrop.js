"use strict";

(function () {
  let minMainPinY = window.data.minY - window.data.mainPinHeight;
  let maxMainPinY = window.data.maxY - window.data.mainPinHeight;
  let minMainPinX = -window.data.mainPinWidth / 2;
  let maxMainPinX = window.data.mapWidth - window.data.mainPinWidth / 2;

  //реализация перетаскивания главного пина
  let onMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    //перемещение пина и запись в координаты адрес
    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      if (!window.app.isPageActive) {
        window.app.activatePage();
        window.load(window.app.onOffersLoad, window.app.onOffersError);
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

  window.dragndrop = {
    onMouseDown: onMouseDown,
  }
})();

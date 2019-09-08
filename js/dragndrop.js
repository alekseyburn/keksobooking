"use strict";

(function () {
  let minMainPinY = window.data.minY - window.data.mainPinHeight;
  let maxMainPinY = window.data.maxY - window.data.mainPinHeight;
  let minMainPinX = -window.data.mainPinWidth / 2;
  let maxMainPinX = window.data.mapWidth - window.data.mainPinWidth / 2;

  //реализация перетаскивания главного пина
  window.data.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    //перемещение пина и запись в координаты адрес
    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.form.setAddressCoords();

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      //ограничение по краям(верх и низ - высота пина, лево и право - половина ширины пина)
      window.data.mainPin.style.top = `${Math.min(Math.max(minMainPinY, window.data.mainPin.offsetTop - shift.y), maxMainPinY)}px`;
      window.data.mainPin.style.left = `${Math.min(Math.max(minMainPinX, window.data.mainPin.offsetLeft - shift.x), maxMainPinX)}px`;

    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (!window.data.isActive) {
        window.map.onMainPinClick();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

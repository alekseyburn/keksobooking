'use strict';

(function () {
  //рандомное число
  let getRandomDigit = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

  //перемешивание массива
  let shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  //Выбор значения из массива и возврат массива без этого значения
  let takeFromArr = (arr) => {
    let clone = arr.slice();
    return clone.splice(clone.indexOf(clone[getRandomDigit(0, clone.length - 1)]), 1);
  };

  //Получение массива с рандомными элементами из другого массива
  let getSubArr = (arr) => shuffleArray(arr.slice()).splice(0, getRandomDigit(0, arr.length - 1));

  //получение центральной нижней точки элемента
  let getCoords = (item) => {
    return {
      x: Math.round(item.offsetLeft + item.getBoundingClientRect().width / 2),
      y: Math.round(item.offsetTop + item.getBoundingClientRect().height)
    }
  };

  //переключение элементов формы в disabled если они доступны и наоборот
  let toggleElement = (elem) => elem.forEach((item) => item.disabled ? item.disabled = false : item.disabled = true);

  window.utils = {
    getRandomDigit: getRandomDigit,
    shuffleArray: shuffleArray,
    takeFromArr: takeFromArr,
    getSubArr: getSubArr,
    getCoords: getCoords,
    toggleElement: toggleElement
  };
})();

'use strict';

(function () {
  let isFilterOn = false;

  let filterOffers = () => {
    let result = [];
    let amount = (window.data.offers.length > window.data.offersAmount)
      ? window.data.offersAmount
      : window.data.offers.length;

    if (!isFilterOn) {
      let shuffledOffers = window.utils.shuffleArray(
        window.data.offers.slice());

      for (let i = 0; i < shuffledOffers.length; i++) {
        if (result.length === amount) {
          break;
        }
        if (shuffledOffers[i].hasOwnProperty('offer')) {
          result.push(shuffledOffers[i]);
        }
      }
    }
    window.data.filteredOffers = result;
  };

  window.filters = {
    filterOffers: filterOffers,
  };
})();

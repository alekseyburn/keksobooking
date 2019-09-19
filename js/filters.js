'use strict';

(function () {
  let PriceLevel = {
    LOW: 10000,
    HIGH: 50000
  };

  let filtersNameMap = {
    "housing-type": "type",
    "houseing-rooms": "rooms",
    "houseing-guests": "guests"
  };

  let filterState;
  let checkedFeatures;

  let checkPrice = (ad, priceLevel) => {
    switch (priceLevel) {
      case "low":
        return ad.offer.price < PriceLevel.LOW;
      case "middle":
        return (ad.offer.price >= PriceLevel.LOW && ad.offer.price <=
          PriceLevel.HIGH);
      case "high":
        return ad.offer.price > PriceLevel.HIGH;
      default:
        return true;
    }
  };

  let checkFeatures = (ad) => {
    return checkedFeatures.every((feature) => {
      return ad.offers.features.includes(feature);
    });
  };

  let initAds = () => {
    filterState = {};
    checkedFeatures = [];
    window.data.ads = window.data.ads.filter((ad) => {
      return ad.hasOwnProperty('offer');
    });

    let shuffledAds = window.utils.shuffleArray(window.data.ads.slice());
    window.data.filteredOffers = shuffledAds.slice(0, window.data.offersAmount);
  };

  let updateFilterState = (filter) => {
    if (filterState.hasOwnProperty(filter.name) && filter.value === 'any') {
      delete filterState[filter.name];
    } else if (filter.classList.contains('map__filter')) {
      filterState[filter.name] = filter.value;
    } else if (filter.checked) {
      checkedFeatures.push(filter.value);
      filterState[filter.name] = checkedFeatures;
    } else {
      checkedFeatures.splice(checkedFeatures.indexOf(filter.value), 1);
      if (checkedFeatures.length === 0) {
        delete filterState[filter.name];
      } else {
        filterState[filter.name] = checkedFeatures;
      }
    }
  };

  let filterAds = () => {
    window.data.filteredOffers = window.data.ads.filter((ad) => {
      let isProperAd = true;
      for (let filter in filterState) {
        if (filterState.hasOwnProperty(filter)) {
          if (filter === 'housing-price') {
            isProperAd = checkPrice(ad, filterState[filter]);
          } else if (filter === 'features') {
            isProperAd = checkFeatures(ad);
          } else {
            isProperAd = filterState[filter] ===
              ad.offer[filtersNameMap[filter]].toString();
          }

          if (!isProperAd) {
            return false;
          }
        }
      }

      return isProperAd;
    }).slice(0, window.data.offersAmount);
  };


  window.filters = {
    updateFilterState: updateFilterState,
    initAds: initAds,
    filterAds: filterAds,

  };
})();

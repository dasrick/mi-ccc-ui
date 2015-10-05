'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return function (products, type) {
    var dt, endDate, filteredProducts, product, startDate, _i, _len;
    filteredProducts = [];
    dt = (new Date()).getTime();
    if (products != null) {
      for (_i = 0, _len = products.length; _i < _len; _i++) {
        product = products[_i];
        startDate = new Date(product.duration.startDate);
        endDate = new Date(product.duration.endDate);
        switch (type) {
          case "active":
            if ((startDate.getTime() < dt && dt < endDate.getTime()) && !product.inactive) {
              filteredProducts.push(product);
            }
            break;
          case "inactive":
            if (dt > endDate.getTime() || product.inactive) {
              filteredProducts.push(product);
            }
            break;
          case "future":
            if (dt < startDate.getTime() && !product.inactive) {
              filteredProducts.push(product);
            }
        }
      }
    }
    return filteredProducts;
  };
};

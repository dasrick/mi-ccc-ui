'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state) {
  return {
    deactivateProduct: function (id, reviewer) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/products/" + id + "/deactivate",
        headers: {
          Accept: 'application/json'
        },
        data: {
          reviewer: reviewer,
          baseUrl: $state.href("profile.reviews.detail", {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall);
    },
    deactivateFeature: function (id, reviewer) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/features/" + id + "/deactivate",
        headers: {
          Accept: 'application/json'
        },
        data: {
          reviewer: reviewer,
          baseUrl: $state.href("profile.reviews.detail", {}, {
            absolute: true
          })
        }
      };
      return HttpService(httpCall);
    }
  };
};

'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state) {
  return {
    deactivate: function (id, reviewer) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/transcoderprofiles/" + id + "/deactivate",
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

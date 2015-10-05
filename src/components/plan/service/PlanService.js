'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state) {
  return {
    deletePlan: function (id, reviewer) {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/plans/" + id + "/review",
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

'use strict';

/**
 * @ngInject
 */
module.exports = function ($modal) {
  return {
    restrict: 'A',
    scope: {
      action: '&',
      exclude: '=',
      right: '@'
    },
    link: function (scope, elem) {
      elem.bind('click', function () {
        var modalInstance;
        modalInstance = $modal.open({
          templateUrl: 'views/review/review_modal.html',
          controller: 'ReviewModalController',
          resolve: {
            right: function () {
              return scope.right;
            },
            exclude: function () {
              return scope.exclude;
            }
          }
        });
        modalInstance.result.then(function (value) {
          scope.action({
            reviewer: value
          });
        });
      });
    }
  };
};

'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, ReviewService) {
  ReviewService.all().then(function (value) {
    $scope.reviews = value;
  });
};

'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, ReviewService) {
  ReviewService.all().then(function (reviews) {
    $scope.reviews = reviews;
  });
};

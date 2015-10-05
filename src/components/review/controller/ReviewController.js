'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, $state, ReviewService, $translate, User, $modal) {
  ReviewService.getReview($state.params.token).then(function (review) {
    var user;
    $scope.review = review;
    switch ($scope.review.reviewObject.type) {
      case 'user':
        user = $scope.review.reviewObject.currentObject;
        $scope.review.reviewObject.name = "" + user.lastName + ", " + user.firstName;
        break;
      case 'customer':
        $scope.review.reviewObject.name = $scope.review.reviewObject.currentObject.name;
        break;
      case 'product':
      case 'player_skin':
        $scope.review.reviewObject.name = $scope.review.reviewObject.currentObject.name[$translate.use()];
        break;
      case 'plan':
      case 'transcoder_profile':
        $scope.review.reviewObject.name = $scope.review.reviewObject.currentObject.title;
        break;
    }
  });
  $scope.allow = function () {
    ReviewService.allow($state.params.token).then(function () {
      $scope.$emit('alert', 'success', 'review.allow_action.success');
      $state.go('base.dashboard-default', {
        customerId: User.getCurrentUser().customer.id
      });
    });
  };
  $scope.deny = function () {
    ReviewService.deny($state.params.token).then(function () {
      $scope.$emit('alert', 'success', 'review.deny_action.success');
      $state.go('base.dashboard-default', {
        customerId: User.getCurrentUser().customer.id
      });
    });
  };
  $scope.showChanges = function () {
    $modal.open({
      templateUrl: 'views/review/review_changes.html',
      controller: 'ReviewChangesController',
      resolve: {
        type: function () {
          return $scope.review.reviewObject.type;
        },
        draft: function () {
          return $scope.review.reviewObject.draftObject;
        },
        current: function () {
          return $scope.review.reviewObject.currentObject;
        }
      }
    });
  };
};

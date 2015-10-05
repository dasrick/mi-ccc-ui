'use strict';

module.exports = {
  'profile.reviews': {
    url: '/review',
    views: {
      'data': {
        templateUrl: '/views/review/list.html',
        controller: 'ReviewListController'
      }
    }
  },
  'profile.reviews.detail': {
    url: '/{token}',
    views: {
      'data@profile': {
        controller: 'ReviewController',
        templateUrl: '/views/review/review.html'
      }
    }
  }
};
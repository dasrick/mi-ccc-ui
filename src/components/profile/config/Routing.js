'use strict';

module.exports = {
  'profile': {
    abstract: true,
    url: '/profile',
    views: {
      'main': {
        templateUrl: '/views/profile/base.html',
        controller: 'ProfileBaseController'
      }
    }
  },
  'profile.user': {
    abstract: true,
    url: '/user',
    views: {
      'data': {
        templateUrl: '/views/profile/user.html'
      }
    }
  },
  'profile.user.data': {
    url: '/data',
    views: {
      'detail': {
        templateUrl: '/views/user/edit_data.html',
        controller: 'ProfileUserEditDataController'
      }
    }
  },
  'profile.user.password': {
    url: '/password',
    views: {
      'detail': {
        templateUrl: '/views/user/edit_password.html',
        controller: 'ProfileUserEditPasswordController'
      }
    }
  },
  'profile.customer': {
    url: '/customer',
    views: {
      'data': {
        templateUrl: '/views/profile/customer.html',
        controller: 'ProfileCustomerController'
      }
    }
  }
};

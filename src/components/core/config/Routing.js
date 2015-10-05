'use strict';

module.exports = {
  'admin': {
    abstract: true,
    url: '/admin',
    views: {
      'main': {
        templateUrl: '/views/core/base.html',
        controller: 'CommonBaseController'
      },
      'customer-select': {
        templateUrl: '/views/core/customer_select.html',
        controller: 'CommonBaseController'
      }
    }
  },
  'base': {
    abstract: true,
    url: '/customer/{customerId:[0-9]{1,}}',
    views: {
      'main': {
        templateUrl: '/views/core/base.html',
        controller: 'CommonBaseController'
      },
      'customer-select': {
        templateUrl: '/views/core/customer_select.html',
        controller: 'CommonBaseController'
      }
    }
  },
  'base.dashboard-default': {
    url: '',
    views: {
      'data': {
        templateUrl: '/views/core/dashboard.html'
      }
    }
  },
  'base.dashboard': {
    url: '/dashboard',
    views: {
      'data': {
        templateUrl: '/views/core/dashboard.html'
      }
    }
  }
};

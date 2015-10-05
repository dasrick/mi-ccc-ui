'use strict';

module.exports = {
  'admin': {
    abstract: true,
    url: '/admin',
    views: {
      'main': {
        templateUrl: '/views/common/base.html',
        controller: 'CommonBaseController'
      },
      'customer-select': {
        templateUrl: '/views/common/customer_select.html',
        controller: 'CommonBaseController'
      }
    }
  },
  'base': {
    abstract: true,
    url: '/customer/{customerId:[0-9]{1,}}',
    views: {
      'main': {
        templateUrl: '/views/common/base.html',
        controller: 'CommonBaseController'
      },
      'customer-select': {
        templateUrl: '/views/common/customer_select.html',
        controller: 'CommonBaseController'
      }
    }
  },
  'base.dashboard-default': {
    url: '',
    views: {
      'data': {
        templateUrl: '/views/common/dashboard.html'
      }
    }
  },
  'base.dashboard': {
    url: '/dashboard',
    views: {
      'data': {
        templateUrl: '/views/common/dashboard.html'
      }
    }
  }
};

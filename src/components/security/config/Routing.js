'use strict';

module.exports = {
  'security': {
    abstract: true
  },
  'security.set_password': {
    url: '/set-password/{token}',
    views: {
      "main@": {
        controller: 'SecuritySetPasswordController',
        templateUrl: '/views/security/set_password.html'
      }
    }
  },
  'security.request_password': {
    url: '/request-password',
    views: {
      "main@": {
        controller: 'SecurityRequestPasswordController',
        templateUrl: '/views/security/request_password.html'
      }
    }
  },
  'security.login': {
    url: '/login',
    views: {
      "main@": {
        controller: 'SecurityLoginController',
        templateUrl: '/views/security/login.html'
      }
    }
  }
};
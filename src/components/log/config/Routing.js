'use strict';

module.exports = {
  'base.log': {
    url: '/logs',
    views: {
      'data': {
        templateUrl: '/views/log/list.html',
        controller: 'Log.ListController'
      }
    }
  }
};
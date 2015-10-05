'use strict';

/**
 * @ngInject
 */
module.exports = function (StompService, $scope, CacheClearService, $rootScope, CacheFactory) {
  var userDataCache;
  userDataCache = CacheFactory.get('userData');
  $scope.$watch(function () {
    return userDataCache.get('token');
  }, function (newValue) {
    if (newValue != null) {
      StompService.connect().then(function () {
        var subscribe, subscribeToQueue, _i, _len, _ref, _results;
        subscribeToQueue = function (queuePart) {
          StompService.subscribe("/exchange/cache-clear/" + queuePart, function (message) {
            CacheClearService.clear(queuePart);
            $scope.$broadcast("cache_clear_" + queuePart);
            if (queuePart === 'user') {
              $rootScope.$broadcast(JSON.parse(message.body).id);
            }
          });
        };
        _ref = CacheClearService.getTypes();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subscribe = _ref[_i];
          _results.push(subscribeToQueue(subscribe));
        }
        _results;
      });
    } else {
      StompService.disconnect();
    }
  });
  $scope.$on('$destroy', function () {
    StompService.disconnect();
  });
};

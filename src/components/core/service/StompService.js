'use strict';

/**
 * @ngInject
 */
module.exports = function ($q, CacheFactory, $log) {
  var client;
  client = null;
  return {
    connect: function () {
      var deferred, onConnect, onError, stompConfig, userDataCache, ws;
      userDataCache = CacheFactory.get('userData');
      stompConfig = userDataCache.get('stomp');
      deferred = $q.defer();
      ws = new SockJS(stompConfig.host);
      client = Stomp.over(ws);
      client.heartbeat.incoming = 0;
      client.heartbeat.outgoing = 0;
      client.debug = function (message) {
        $log.debug("STOMP DEBUG:'" + message + "'");
      };
      onConnect = function () {
        return deferred.resolve();
      };
      onError = function () {
        return deferred.reject();
      };
      client.connect(stompConfig.user, stompConfig.password, onConnect, onError);
      return deferred.promise;
    },
    subscribe: function (queue, onMessage) {
      return client.subscribe(queue, onMessage);
    },
    disconnect: function () {
      var deferred;
      deferred = $q.defer();
      if (client != null) {
        client.disconnect(function () {
          return deferred.resolve();
        });
      }
      return deferred.promise;
    }
  };
};

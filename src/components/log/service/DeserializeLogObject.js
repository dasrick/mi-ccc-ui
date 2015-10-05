'use strict';

/**
 * @ngInject
 */
module.exports = function ($translate) {
  return function (data) {
    var object, translateObject, translatedData, _i, _len;
    translateObject = function (obj) {
      if (!angular.isObject(obj)) {
        return obj;
      }
      obj.action = $translate.instant("log.action." + obj.action + ".label");
      obj.type = $translate.instant("review.object." + obj.type + ".label");
      obj.loggedAt = new Date(obj.loggedAt);
      return obj;
    };
    if (angular.isArray(data)) {
      translatedData = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        object = data[_i];
        translatedData.push(translateObject(object));
      }
      return translatedData;
    } else {
      return translateObject(data);
    }
  };
};

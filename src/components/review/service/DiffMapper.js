'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  var diffMapper;
  diffMapper = {
    VALUE_CREATED: "created",
    VALUE_UPDATED: "updated",
    VALUE_DELETED: "deleted",
    VALUE_UNCHANGED: "unchanged",
    map: function (obj1, obj2) {
      var diff, key, value2;
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: obj1 || obj2
        };
      }
      diff = {};
      for (key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }
        value2 = void 0;
        if ("undefined" !== typeof obj2[key]) {
          value2 = obj2[key];
        }
        diff[key] = this.map(obj1[key], value2);
      }
      for (key in obj2) {
        if (this.isFunction(obj2[key]) || ("undefined" !== typeof diff[key])) {
          continue;
        }
        diff[key] = this.map(void 0, obj2[key]);
      }
      return diff;
    },
    compareValues: function (value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if ("undefined" === typeof value1) {
        return this.VALUE_CREATED;
      }
      if ("undefined" === typeof value2) {
        return this.VALUE_DELETED;
      }
      return this.VALUE_UPDATED;
    },
    isFunction: function (obj) {
      return toString.apply(obj) === "[object Function]";
    },
    isArray: function (obj) {
      return toString.apply(obj) === "[object Array]";
    },
    isObject: function (obj) {
      return toString.apply(obj) === "[object Object]";
    },
    isValue: function (obj) {
      return !this.isObject(obj) && !this.isArray(obj);
    }
  };
  return function (obj1, obj2) {
    return diffMapper.map(obj1, obj2);
  };
};

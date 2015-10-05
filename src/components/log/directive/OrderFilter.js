'use strict';

var _ = require('lodash');
/**
 * @ngInject
 */
module.exports = function () {
  return {
    restrict: 'A',
    scope: {
      ngModel: '=',
      orderFilter: '=?'
    },
    link: function (scope, elem) {
      var removeClass, setClass, watch;
      if (scope.orderFilter == null) {
        scope.orderFilter = ['', 'desc', 'asc'];
      }
      scope.ngModel = scope.orderFilter[0];
      removeClass = function () {
        var classPart;
        classPart = scope.ngModel;
        if (classPart.length > 0) {
          classPart = "-" + classPart;
        }
        elem.removeClass("fa-sort" + classPart);
      };
      setClass = function (idx) {
        var classPart;
        if (idx === scope.orderFilter.length) {
          idx = 0;
        }
        classPart = scope.ngModel = scope.orderFilter[idx];
        if (classPart.length > 0) {
          classPart = "-" + classPart;
        }
        elem.addClass("fa-sort" + classPart);
      };
      elem.bind('click', function () {
        var idx;
        removeClass();
        idx = _.indexOf(scope.orderFilter, scope.ngModel) + 1;
        setClass(idx);
        scope.$parent.$broadcast('order_changed', elem);
        scope.$apply();
      });
      watch = function () {
        return scope.ngModel;
      };
      scope.$watch(watch, function (newValue) {
        if (newValue.length > 0) {
          removeClass();
          scope.ngModel = newValue;
          setClass(_.indexOf(scope.orderFilter, newValue));
          scope.$parent.$broadcast('order_changed', elem);
        }
      });
      scope.$on('order_changed', function (event, eventElement) {
        if (eventElement !== elem) {
          if (scope.ngModel.length > 0) {
            removeClass();
            scope.ngModel = '';
            setClass(_.indexOf(scope.orderFilter, scope.ngModel));
          }
        }
      });
    }
  };
};

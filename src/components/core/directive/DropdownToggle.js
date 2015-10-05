'use strict';

/**
 * @ngInject
 */
module.exports = function ($location) {
  var closeMenu, openElement;
  openElement = null;
  closeMenu = angular.noop;
  return {
    restrict: "CA",
    link: function (scope, element) {
      scope.$watch("$location.path", function () {
        closeMenu();
      });
      element.bind("click", function (event) {
        var elementWasOpen;
        elementWasOpen = element === openElement;
        event.preventDefault();
        event.stopPropagation();
        if (!!openElement) {
          closeMenu();
        }
        if (!elementWasOpen && !element.hasClass("disabled") && !element.prop("disabled")) {
          element.parent().addClass("open");
          openElement = element;
          closeMenu = function () {
            element.parent().removeClass("open");
            closeMenu = angular.noop;
            openElement = null;
          };
        }
      });
    }
  };
};

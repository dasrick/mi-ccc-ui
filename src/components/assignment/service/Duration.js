'use strict';

/**
 * @ngInject
 */
module.exports = function () {
  return {
    setValidDuration: function (duration) {
      var endDate, newDuration, startDate;
      startDate = new Date(duration.startDate);
      endDate = new Date(duration.endDate);
      if ((new Date).getTime() < startDate.getTime()) {
        newDuration = {
          startDate: startDate,
          endDate: endDate
        };
      } else if ((new Date).getTime() < endDate.getTime()) {
        newDuration = {
          startDate: new Date(),
          endDate: endDate
        };
      } else {
        newDuration = {
          startDate: new Date()
        };
      }
      return newDuration;
    }
  };
};

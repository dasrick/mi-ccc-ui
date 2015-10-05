'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, DS) {
  DS.findAll('plan', {});
  DS.bindAll($scope, 'plans', 'plan', {});
};

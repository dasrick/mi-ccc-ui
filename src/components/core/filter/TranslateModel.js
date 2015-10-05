'use strict';

/**
 * @ngInject
 */
module.exports = function ($translate) {
  return function (translateModel) {
    return translateModel[$translate.use()];
  };
};

'use strict';

var _ = require('lodash');

/**
 * @ngInject
 */
module.exports = function ($translate) {
  return function (skins, search) {
    var filteredSkins, skin, _i, _len;
    if (search.length === 0) {
      return skins;
    }
    filteredSkins = [];
    for (_i = 0, _len = skins.length; _i < _len; _i++) {
      skin = skins[_i];
      if (_.contains(skin.name[$translate.use()], search)) {
        filteredSkins.push(skin);
      }
    }
    return filteredSkins;
  };
};

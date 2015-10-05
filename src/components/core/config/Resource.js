'use strict';

module.exports = [
  {
    name: 'locale',
    endpoint: 'common/locales',
    idAttribute: 'short'
  }, {
    name: 'country',
    endpoint: 'common/countries',
    idAttribute: 'short'
  }, {
    name: 'assignment',
    endpoint: 'assignments',
    idAttribute: 'id'
  }, {
    name: 'plan',
    endpoint: 'plans',
    idAttribute: 'id'
  }, {
    name: 'product',
    endpoint: 'products',
    idAttribute: 'id'
  }, {
    name: 'feature',
    endpoint: 'features',
    idAttribute: 'id'
  }, {
    name: 'reviewer',
    endpoint: 'reviewers',
    idAttribute: 'id'
  }, {
    name: 'player_skin',
    endpoint: 'player-skins',
    idAttribute: 'id'
  }, {
    name: 'log',
    endpoint: 'logs',
    idAttribute: 'id'
  }, {
    name: 'user',
    endpoint: 'users',
    idAttribute: 'id'
  }, {
    name: 'transcoder_profile',
    endpoint: 'transcoderprofiles',
    idAttribute: 'key'
  }
];

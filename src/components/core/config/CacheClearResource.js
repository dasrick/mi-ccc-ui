'use strict';

module.exports = [
  {
    type: 'customer',
    routePrefix: '/customers'
  }, {
    type: 'assignment',
    routePrefix: '/assignments',
    useDataStore: true
  }, {
    type: 'plan',
    routePrefix: '/plans',
    useDataStore: true
  }, {
    type: 'product',
    routePrefix: '/products',
    useDataStore: true
  }, {
    type: 'feature',
    routePrefix: '/features',
    useDataStore: true
  }, {
    type: 'transcoder_profile',
    routePrefix: '/transcoderprofiles',
    useDataStore: true
  }, {
    type: 'user',
    routePrefix: '/users',
    useDataStore: true
  }, {
    type: 'player_skin',
    routePrefix: '/player-skins',
    useDataStore: true
  }, {
    type: 'log',
    routePrefix: '/logs',
    useDataStore: true
  }
];
'use strict';

module.exports = {
  'admin.player_skin': {
    abstract: true,
    url: '/player-skin',
    views: {
      'data': {
        templateUrl: '/views/player_skin/base.html'
      },
      'header@': {
        templateUrl: '/views/player_skin/header.html'
      }
    }
  },
  'admin.player_skin.list': {
    url: '',
    views: {
      'titleExtension@admin.player_skin': {
        template: "<span> - </span><span translate>player_skin.list.label</span>"
      },
      '@admin.player_skin': {
        templateUrl: '/views/player_skin/list.html',
        controller: 'PlayerSkin.ListController'
      }
    }
  },
  'admin.player_skin.new': {
    url: '/new',
    views: {
      'titleExtension@admin.player_skin': {
        template: "<span> - </span><span translate>player_skin.new.label</span>"
      },
      '@admin.player_skin': {
        templateUrl: '/views/player_skin/new.html',
        controller: 'PlayerSkin.NewController'
      }
    }
  }
};
'use strict';

module.exports = {
  'admin.transcoderprofile': {
    abstract: true,
    url: '/transcoderprofile',
    views: {
      'data': {
        templateUrl: '/views/transcoderprofile/base.html'
      },
      'header@': {
        templateUrl: '/views/transcoderprofile/header.html'
      }
    }
  },
  'admin.transcoderprofile.list': {
    url: '',
    views: {
      'titleExtension@admin.transcoderprofile': {
        template: "<span> - </span><span translate>transcoderprofile.list.label</span>"
      },
      '@admin.transcoderprofile': {
        templateUrl: '/views/transcoderprofile/list.html',
        controller: 'TranscoderProfile.ListController'
      }
    }
  },
  'admin.transcoderprofile.new': {
    views: {
      'titleExtension@admin.transcoderprofile': {
        template: "<span> - </span><span translate>transcoderprofile.new.label</span>"
      },
      '@admin.transcoderprofile': {
        templateUrl: '/views/transcoderprofile/new_edit.html',
        controller: 'TranscoderProfile.NewController'
      }
    }
  },
  'admin.transcoderprofile.detail': {
    url: '/{id:[0-9a-zA-Z]{1,}}',
    abstract: true
  },
  'admin.transcoderprofile.detail.edit': {
    url: '/edit',
    views: {
      'titleExtension@admin.transcoderprofile': {
        template: "<span> - </span><span translate>transcoderprofile.edit.label</span>"
      },
      '@admin.transcoderprofile': {
        templateUrl: '/views/transcoderprofile/new_edit.html',
        controller: 'TranscoderProfile.EditController'
      }
    }
  }
};
'use strict';

module.exports = {
  'admin.instance': {
    abstract: true,
    url: '/instance',
    views: {
      'data': {
        templateUrl: '/views/instance/base.html'
      },
      'header@': {
        templateUrl: '/views/instance/header.html'
      }
    }
  },
  'admin.instance.list': {
    url: '',
    views: {
      'titleExtension@admin.instance': {
        template: '<span> - </span><span translate="instance.list.label"></span>'
      },
      '@admin.instance': {
        templateUrl: '/views/instance/list.html',
        controller: 'Instance.ListController'
      }
    }
  },
  'admin.instance.new': {
    views: {
      'titleExtension@admin.instance': {
        template: '<span> - </span><span translate="instance.new.label"></span>'
      },
      '@admin.instance': {
        templateUrl: '/views/instance/form.html',
        controller: 'Instance.NewController'
      }
    }
  },
  'admin.instance.detail': {
    url: '/{id:[0-9a-zA-Z]{1,}}',
    abstract: true
  },
  'admin.instance.detail.edit': {
    url: '/edit',
    views: {
      'titleExtension@admin.instance': {
        template: '<span> - </span><span translate="instance.edit.label"></span>'
      },
      '@admin.instance': {
        templateUrl: '/views/instance/form.html',
        controller: 'Instance.EditController'
      }
    }
  }
};

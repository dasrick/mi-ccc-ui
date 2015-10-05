'use strict';

module.exports = {
  'admin.user': {
    abstract: true,
    url: '/user',
    views: {
      'data': {
        templateUrl: '/views/user/base.html'
      },
      'header@': {
        templateUrl: '/views/user/header.html'
      }
    }
  },
  'admin.user.global': {
    url: '',
    views: {
      'titleExtension@admin.user': {
        template: "<span> - </span><span translate>user.global.label</span>"
      },
      '@admin.user': {
        templateUrl: '/views/user/list.html',
        controller: 'User.ListController'
      }
    }
  },
  'base.usermanagement': {
    abstract: true,
    url: '/usermanagement',
    views: {
      'data': {
        templateUrl: '/views/user/base.html'
      },
      'header@': {
        templateUrl: '/views/user/header.html'
      }
    }
  },
  'base.usermanagement.list': {
    url: '',
    views: {
      'titleExtension@base.usermanagement': {
        template: "<span> - </span><span translate>user.list.label</span>"
      },
      '@base.usermanagement': {
        templateUrl: '/views/user/list.html',
        controller: 'User.ListController'
      }
    }
  },
  'base.usermanagement.new': {
    views: {
      'titleExtension@base.usermanagement': {
        template: "<span> - </span><span translate>user.new.label</span>"
      },
      '@base.usermanagement': {
        templateUrl: '/views/user/new.html',
        controller: 'User.NewController'
      }
    }
  },
  'base.usermanagement.detail': {
    url: '/{userId:[0-9a-zA-Z]{1,}}',
    abstract: true
  },
  'base.usermanagement.detail.edit_roles': {
    url: '/edit_roles',
    views: {
      'titleExtension@base.usermanagement': {
        template: "<span> - </span><span translate>user.edit_roles.label</span>"
      },
      '@base.usermanagement': {
        templateUrl: '/views/user/edit_roles.html',
        controller: 'User.EditRolesController'
      }
    }
  },
  'base.usermanagement.detail.edit_data': {
    url: '/edit_data',
    views: {
      'titleExtension@base.usermanagement': {
        template: "<span> - </span><span translate>user.edit_data.label</span>"
      },
      '@base.usermanagement': {
        templateUrl: '/views/user/edit_data.html',
        controller: 'User.EditDataController'
      }
    }
  }
};
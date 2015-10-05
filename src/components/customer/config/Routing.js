'use strict';

module.exports = {
  'admin.customermanagement': {
    abstract: true,
    url: '/customer',
    views: {
      'data': {
        templateUrl: '/views/customer/base.html'
      },
      'header@': {
        templateUrl: '/views/customer/header.html'
      }
    }
  },
  'admin.customermanagement.global': {
    url: '',
    views: {
      'titleExtension@admin.customermanagement': {
        template: "<span> - </span><span translate>customer.global.label</span>"
      },
      '@admin.customermanagement': {
        templateUrl: '/views/customer/list.html',
        controller: 'Customer.ListController'
      }
    }
  },
  'base.customermanagement': {
    abstract: true,
    url: '/customermanagement',
    views: {
      'data': {
        templateUrl: '/views/customer/base.html'
      },
      'header@': {
        templateUrl: '/views/customer/header.html'
      }
    }
  },
  'base.customermanagement.list': {
    url: '',
    views: {
      'titleExtension@base.customermanagement': {
        template: "<span> - </span><span translate>customer.list.label</span>"
      },
      '@base.customermanagement': {
        templateUrl: '/views/customer/list.html',
        controller: 'Customer.ListController'
      }
    }
  },
  'base.customermanagement.new': {
    views: {
      'titleExtension@base.customermanagement': {
        template: "<span> - </span><span translate>customer.new.label</span>"
      },
      '@base.customermanagement': {
        templateUrl: '/views/customer/new_edit.html',
        controller: 'Customer.NewController'
      }
    }
  },
  'base.customermanagement.detail': {
    url: '/{id:[0-9]{1,}}',
    abstract: true
  },
  'base.customermanagement.detail.edit': {
    url: '/edit',
    views: {
      'titleExtension@base.customermanagement': {
        template: "<span> - </span><span translate>customer.edit.label</span>"
      },
      '@base.customermanagement': {
        templateUrl: '/views/customer/new_edit.html',
        controller: 'Customer.EditController'
      }
    }
  }
};
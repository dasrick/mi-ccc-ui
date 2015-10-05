'use strict';

module.exports = {
  'admin.plan': {
    abstract: true,
    url: '/plan',
    views: {
      'data': {
        templateUrl: '/views/plan/base.html'
      },
      'header@': {
        templateUrl: '/views/plan/header.html'
      }
    }
  },
  'admin.plan.list': {
    url: '',
    views: {
      'titleExtension@admin.plan': {
        template: "<span> - </span><span translate>plan.list.label</span>"
      },
      '@admin.plan': {
        templateUrl: '/views/plan/list.html',
        controller: 'PlanListController'
      }
    }
  },
  'admin.plan.new': {
    views: {
      'titleExtension@admin.plan': {
        template: "<span> - </span><span translate>plan.new.label</span>"
      },
      '@admin.plan': {
        templateUrl: '/views/plan/form.html',
        controller: 'PlanNewController'
      }
    }
  },
  'admin.plan.detail': {
    abstract: true,
    url: '/{id:[0-9a-zA-Z]{1,}}'
  },
  'admin.plan.detail.edit': {
    url: '/edit',
    views: {
      'titleExtension@admin.plan': {
        template: "<span> - </span><span translate>plan.edit.label</span>"
      },
      '@admin.plan': {
        templateUrl: '/views/plan/form.html',
        controller: 'PlanEditController'
      }
    }
  }
};
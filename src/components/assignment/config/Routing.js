'use strict';

module.exports = {
  'base.assignment': {
    abstract: true,
    url: '/assignment',
    views: {
      'data': {
        templateUrl: '/views/assignment/base.html'
      },
      'header@': {
        templateUrl: '/views/assignment/header.html'
      }
    }
  },
  'base.assignment.list': {
    url: '',
    views: {
      'titleExtension@base.assignment': {
        template: '<span> - </span><span translate="assignment.list.label"></span>'
      },
      '@base.assignment': {
        templateUrl: '/views/assignment/list.html',
        controller: 'Assignment.ListController'
      }
    }
  },
  'base.assignment.detail': {
    url: '/{assignmentId:[0-9a-zA-Z]{1,}},{type:[0-9]{1,}}',
    views: {
      '@base.assignment': {
        templateUrl: function ($stateParams) {
          switch ($stateParams.type) {
            case "1":
              return '/views/assignment/vm_pro/detail.html';
            default:
              return '/views/assignment/detail_not_supported.html';
          }
        },
        controller: 'Assignment.DetailController'
      },
      'titleExtension@base.assignment': {
        template: '<span> - </span><span translate="assignment.detail.label"></span>'
      }
    }
  },
  'base.assignment.detail.features': {
    views: {
      'detail': {
        templateUrl: '/views/assignment/vm_pro/features.html',
        controller: 'Assignment.DetailFeaturesController'
      }
    }
  },
  'base.assignment.detail.plans': {
    views: {
      'detail': {
        templateUrl: '/views/assignment/vm_pro/plans.html',
        controller: 'Assignment.DetailPlansController'
      }
    }
  },
  'base.assignment.detail.player_skins': {
    views: {
      'detail': {
        templateUrl: '/views/assignment/vm_pro/player_skins.html',
        controller: 'Assignment.DetailPlayerSkinsController'
      }
    }
  },
  'base.assignment.detail.transcoder_profiles': {
    views: {
      'detail': {
        templateUrl: '/views/assignment/vm_pro/transcoder_profiles.html',
        controller: 'Assignment.DetailTranscoderProfilesController'
      }
    }
  },
  'base.assignment.detail.playout_script': {
    views: {
      'detail': {
        templateUrl: '/views/assignment/vm_pro/playout_script.html',
        controller: 'Assignment.DetailPlayoutScriptController as assignmentDetailPlayoutScriptVm'
      }
    },
    resolve: {
      /**
       * @ngInject
       */
      playoutScript: function (PlayoutScript, $stateParams) {
        return PlayoutScript.get({assignmentId: $stateParams.assignmentId}).$promise.then(function(playoutScript) {
          playoutScript.assignmentId = $stateParams.assignmentId;
          return playoutScript;
        });
      }
    }
  },
  'base.assignment.add': {
    views: {
      'titleExtension@base.assignment': {
        template: '<span> - </span><span translate="assignment.new.label"></span>'
      },
      '@base.assignment': {
        templateUrl: '/views/assignment/add_product.html',
        controller: 'Assignment.AssignController'
      }
    }
  },
  'base.assignment.detail.reactivate': {
    url: '/reactivate',
    views: {
      'titleExtension@base.assignment': {
        template: '<span> - </span><span translate="assignment.reactivate.label"></span>'
      },
      '@base.assignment': {
        templateUrl: function ($stateParams) {
          switch ($stateParams.type) {
            case "1":
              return '/views/assignment/vm_pro/reactivate.html';
            default:
              return '/views/assignment/detail_not_supported.html';
          }
        },
        controller: 'Assignment.ReactivateController'
      }
    }
  },
  'base.assignment.detail.renew': {
    url: '/renew',
    views: {
      'titleExtension@base.assignment': {
        template: '<span> - </span><span translate="assignment.renew.label"></span>'
      },
      '@base.assignment': {
        templateUrl: function ($stateParams) {
          switch ($stateParams.type) {
            case "1":
              return '/views/assignment/vm_pro/renew.html';
            default:
              return '/views/assignment/detail_not_supported.html';
          }
        },
        controller: 'Assignment.RenewController'
      }
    }
  }
};

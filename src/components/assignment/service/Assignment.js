'use strict';

/**
 * @ngInject
 */
module.exports = function (HttpService, $state) {

  return {
    addAdditionalAssignment: function (assignment, type) {
      var httpCall;
      httpCall = {
        method: 'POST',
        url: "/api/assignments/" + $state.params.assignmentId + "/additional/" + type,
        headers: {
          Accept: 'application/json'
        },
        data: assignment
      };
      return HttpService(httpCall);
    },
    addPlayerSkin: function (skin) {
      var httpCall;
      httpCall = {
        method: 'POST',
        url: "/api/assignments/" + $state.params.assignmentId + "/player-skins",
        headers: {
          Accept: 'application/json'
        },
        data: skin
      };
      return HttpService(httpCall);
    },
    addTranscoderProfile: function (profile) {
      var httpCall;
      httpCall = {
        method: 'POST',
        url: "/api/assignments/" + $state.params.assignmentId + "/transcoderprofile",
        headers: {
          Accept: 'application/json'
        },
        data: profile
      };
      return HttpService(httpCall);
    },
    deactivateAdditionalAssignment: function (additionalAssignmentId, type) {
      var httpCall;
      httpCall = {
        method: 'DELETE',
        url: "/api/assignments/" + $state.params.assignmentId + "/additional/" + type + "/" + additionalAssignmentId,
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall);
    },
    renew: function (duration) {
      var httpCall;
      httpCall = {
        method: 'POST',
        url: "/api/assignments/" + $state.params.assignmentId + "/renew",
        headers: {
          Accept: 'application/json'
        },
        data: duration
      };
      return HttpService(httpCall);
    },
    refresh: function () {
      var httpCall;
      httpCall = {
        method: 'PUT',
        url: "/api/assignments/" + $state.params.assignmentId + "/refresh",
        headers: {
          Accept: 'application/json'
        }
      };
      return HttpService(httpCall);
    }
  };
};

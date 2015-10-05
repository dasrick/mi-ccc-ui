'use strict';

/**
 * @ngInject
 */
function PlayoutScript($resource) {
  return $resource('/api/assignments/:assignmentId/playout-script', {assignmentId: '@assignmentId'}, {
    'update': {
      method: 'PUT'
    }
  });
}

module.exports = PlayoutScript;



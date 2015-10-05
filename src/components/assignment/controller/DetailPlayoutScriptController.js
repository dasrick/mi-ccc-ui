'use strict';

/**
 * @ngInject
 */
function DetailPlayoutScriptController(playoutScript) {
  var vm = this;

  vm.playoutScript = playoutScript;
  vm.save = save;

  function save() {
    playoutScript.$update();
  }
}

module.exports = DetailPlayoutScriptController;

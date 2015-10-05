'use strict';

/**
 * @ngInject
 */
module.exports = function ($scope, AVAILABLE_LANGUAGES, $translate, $upload, $state) {
  var fileFormDataName, filesContainer;
  $scope.AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  $scope.language = $translate.use();
  $scope.dataURL = {};
  filesContainer = [];
  fileFormDataName = [];
  $scope.saveFile = function (name, files) {
    var fr;
    filesContainer.push(files[0]);
    fileFormDataName.push(name);
    $scope[name] = files[0];
    if (FileReader) {
      fr = new FileReader();
      fr.onload = function () {
        $scope.dataURL[name] = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  };
  $scope.reset = function () {
    var lang, name, player_skin;
    name = {};
    $scope.dataURL = {};
    for (lang in $scope.player_skin.name) {
      name[lang] = '';
    }
    player_skin = {
      name: name
    };
    $scope.player_skin = player_skin;
    $scope.skinfile = '';
    $scope.bigPlayButtonFile = '';
    filesContainer = [];
    fileFormDataName = [];
  };
  $scope.colorsOptions = {
    slider: ['text', 'progress', 'background'],
    button: ['active', 'default', 'hover'],
    background: ['default']
  };
  $scope.create = function () {
    $upload.upload({
      url: '/api/player-skins',
      data: {
        obj: $scope.player_skin
      },
      file: filesContainer,
      fileFormDataName: fileFormDataName
    }).success(function () {
      $state.go('^.list');
    });
  };
};

'use strict';

var appName = 'Mi24CCCApp';

window.SockJS = require('sockjs-client');
window.Stomp = require('stompjs/lib/stomp.min').Stomp;

var angular = require('angular');

require('angular-bootstrap');
require('angular-ui-router');
require('angular-translate');
require('angular-translate-loader-partial');

//require('angular-data');
//require('angular-cache');
//require('angular-sanitize');
//require('angular-checklist');
//require('angular-wizard');
//require('angular-ui-unique');
//require('angular-ui-validate');
//require('angular-ui-select');
//require('angular-file-upload-shim');
//require('angular-loading-bar');
//require('angular-bootstrap-colorpicker');
//require('angular-toggle-switch');

var requires = [
  'ui.bootstrap',
  'ui.router',
  'pascalprecht.translate',

  //'angular-data.DS',
  //'angular-cache',
  //'checklist-model',
  //'mgo-angular-wizard',
  //'ui.validate',
  //'ui.unique',
  //'angularFileUpload',
  //'ui.select',
  //'ngSanitize',
  //'angular-loading-bar',
  //'colorpicker.module',
  //'toggle-switch',
  //require('angular-resource'),
  //require('./common').name,
  //require('./customer').name,
  //require('./translation').name,
  //require('./user').name,
  //require('./transcoderprofile').name,
  //require('./security').name,
  //require('./review').name,
  //require('./profile').name,
  //require('./product').name,
  //require('./plan').name,
  //require('./player_skin').name,
  //require('./log').name,
  //require('./assignment').name,
  //require('./instance').name
  require('./shared').name,
  require('./components').name
];


angular.module(appName, requires)

  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/i18n/{part}/{lang}.json'
    });
    // add translation table
    $translateProvider
      .registerAvailableLanguageKeys(['en', 'de'], {
        'en_*': 'en',
        'de_*': 'de'
      })
      .determinePreferredLanguage();

    /*
     The fallback language is not working ...
     $translateProvider.fallbackLanguage('en');
     The following workaround sets the preferred language to english,
     if the detection failed or the detected language is not known.
     */
    var language = $translateProvider.preferredLanguage();
    if ((language !== null) || !language.match(/(de).*/)) {
      return $translateProvider.preferredLanguage('de');
    }
  })

;

angular.bootstrap(document, [appName]);
//angular.element(document).ready(function () {
//  angular.bootstrap(angular.element(document.getElementsByTagName('html')[0]), ['Mi24CCCApp']);
//});

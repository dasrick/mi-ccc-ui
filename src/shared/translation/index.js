'use strict';

module.exports = angular.module('Mi24CCCApp.Translation', []);

angular.module('Mi24CCCApp.Translation').constant('AVAILABLE_LANGUAGES', ['de', 'en']);
angular.module('Mi24CCCApp.Translation').config(function ($translateProvider, $translatePartialLoaderProvider, AVAILABLE_LANGUAGES) {
  var language;
  $translatePartialLoaderProvider.addPart('common');
  $translatePartialLoaderProvider.addPart('user');
  $translatePartialLoaderProvider.addPart('security');
  $translatePartialLoaderProvider.addPart('customer');
  $translatePartialLoaderProvider.addPart('transcoderprofile');
  $translatePartialLoaderProvider.addPart('log');
  $translatePartialLoaderProvider.addPart('review');
  $translatePartialLoaderProvider.addPart('profile');
  $translatePartialLoaderProvider.addPart('product');
  $translatePartialLoaderProvider.addPart('assignment');
  $translatePartialLoaderProvider.addPart('plan');
  $translatePartialLoaderProvider.addPart('player_skin');
  $translatePartialLoaderProvider.addPart('instance');
  $translateProvider.useLoader('$translatePartialLoader', {
    urlTemplate: '/dist/translation/{part}/{lang}.json'
  });
  $translateProvider.registerAvailableLanguageKeys(AVAILABLE_LANGUAGES);
  $translateProvider.determinePreferredLanguage();
  $translateProvider.useSanitizeValueStrategy('escaped');

  /*
   The fallback language is not working ...
   $translateProvider.fallbackLanguage('en');
   The following workaround sets the preferred language to english,
   if the detection failed or the detected language is not known.
   */
  language = $translateProvider.preferredLanguage();
  if ((language != null) || !language.match(/(de).*/)) {
    $translateProvider.preferredLanguage("de");
  }
});

var appName = 'AddictionNetworkApp';

angular.module(appName, [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  require('./home'),
  require('./sponsorHome'),
  require('./treatmentCenterDetail'),
  require('./treatmentCenterMap'),
  require('./advertisement'),
  require('./myProfile'),
  require('./featuredTreatmentCenter'),
  require('./addListing'),
  require('./sponsorAds'),
  require('./bannerAds')
]).component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);

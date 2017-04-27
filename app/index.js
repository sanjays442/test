var appName = 'AddictionNetworkApp';

angular.module(appName, [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  require('./home'),
  require('./sponsorHome'),
  require('./treatmentCenterDetail'),
  require('./treatmentCenterMap'),
  require('./advertisement'),
  require('./myProfile'),
  require('./featuredTreatmentCenter'),
  require('./addListing'),
  require('./aboutUs'),
  require('./login'),
  require('./logout'),
  require('./blog')
]).component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);

// eslint-disable-next-line angular/document-service
angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);

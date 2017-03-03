var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    require('./home/'),
    require('./sidePanel'),
    require('./sponsoredListing'),
	require('./treatment-center'),
	require('./about-us')
  ])
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);

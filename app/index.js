var angular = require('angular'),
  appName = 'AddictionNetworkApp';

angular.module(appName, [
    'ngRoute',
    require('./home'),
    require('./sidePanel'),
    require('./sponsoredListing'),
    require('./treatmentcenterDetail')
  ])
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
  }])
  .controller('advertisements',["$scope", "$http", function($scope, $http) {
	$http({
		  method: 'GET',
		  url: 'https://ancient-everglades-10056.herokuapp.com/advertisements',
		}).then(function successCallback(response) {
			$scope.header_adv_banner = response.data.advertisements.header;
			$scope.footer_adv_banner = response.data.advertisements.footer;
			$scope.sidebar_adv_banner = response.data.advertisements.side_bar;
		  }, function errorCallback(response) {
			$scope.advertisements = response.statusText;
		  });
	}]);

angular.bootstrap(document.getElementsByTagName('body')[0], [appName]);

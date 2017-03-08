var angular = require('angular'),
  // ngRoute = require('angular-route'),
  ctrl = require('./listingCtrl'),
  service = require('./listingService'),
  htmlTemplate = require('./home.html'),
  moduleName = 'app.home';

angular.module(moduleName, ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      template: htmlTemplate,
      controller: 'HomeCtrl'
    })
  }])
  .factory('SponsoredListingService', service)
  .controller('HomeCtrl', ctrl)
  .controller('advertisements', function($scope, $http) {
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
	});

module.exports = moduleName;

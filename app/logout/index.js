var angular = require('angular'),
  moduleName = 'app.logout';

angular.module(moduleName, ['ui.router', 'LocalStorageModule', require('../components')])
  .component('logout', {
    // template: require('./view.html'),
    controller: 'logoutCtrl'
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'logout',
      url: '/logout',
      template: '<logout></logout>'
    });
  }])
  .controller('logoutCtrl', require('./ctrl'));

module.exports = moduleName;

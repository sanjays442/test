var angular = require('angular'),
  moduleName = 'app.login';

angular.module(moduleName, ['ui.router', 'LocalStorageModule', require('../components')])
  .component('login', {
    template: require('./view.html'),
    controller: 'loginCtrl'
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'login',
      url: '/login',
      template: '<login></login>'
    });
  }]).controller('loginCtrl', require('./ctrl'));

module.exports = moduleName;

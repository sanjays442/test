var angular = require('angular'),
  moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, ['ui.router', require('../components')])
  .factory('addTreatmentCenterSignUpService', require('./service'))
  .component('centerDetail', {
    template: require('./view.html'),
    controller: 'addListingCtrl'
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'centerDetail',
      url: '/center-detail',
      template: '<center-detail></center-detail>'
    });
  }]).controller('addListingCtrl', require('./ctrl'));

module.exports = moduleName;

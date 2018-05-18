var moduleName = 'app.logout';

angular.module(moduleName, ['ui.router', 'LocalStorageModule', require('../components')])
  .component('logout', {
    // template: require('./view.html'),
    controller: 'logoutCtrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.LOGOUT,
      url: '/logout',
      template: '<logout></logout>'
    });
  }])
  .controller('logoutCtrl', require('./ctrl'));

module.exports = moduleName;

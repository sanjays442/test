var moduleName = 'app.loginHelp';

angular.module(moduleName, ['ui.router', 'LocalStorageModule', require('../components')])
  .component('loginHelp', {
    template: require('./view.html'),
    controller: 'loginHelpCtrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.LOGINHELP,
      url: '/loginhelp',
      template: '<login-help></login-help>'
    });
  }]).controller('loginHelpCtrl', require('./ctrl'));

module.exports = moduleName;

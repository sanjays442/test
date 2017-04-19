var moduleName = 'app.login';

angular.module(moduleName, ['ui.router', 'LocalStorageModule', require('../components')])
  .component('login', {
    template: require('./view.html'),
    controller: 'loginCtrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.LOGIN,
      url: '/login',
      template: '<login></login>'
    });
  }]).controller('loginCtrl', require('./ctrl'));

module.exports = moduleName;

var moduleName = 'app.notfound';

angular.module(moduleName, ['ui.router'])
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.NOT_FOUND,
      url: '/404',
      template: require('./view.html')
    });
  }]).controller('notFoundCtrl', require('./ctrl'));

module.exports = moduleName;

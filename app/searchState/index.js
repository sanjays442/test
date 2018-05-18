var moduleName = 'app.searchState';

angular.module(moduleName, ['ui.router'])
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.SEARCH_STATE,
      url: '/searchState',
      template: require('./view.html')
    });
  }]).controller('searchStateCtrl', require('./ctrl'));

module.exports = moduleName;

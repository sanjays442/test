var moduleName = 'app.blog';

angular.module(moduleName, [
  'ui.router'
]).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
  $stateProvider.state({
    name: UIState.BLOG
  });
}]);

module.exports = moduleName;

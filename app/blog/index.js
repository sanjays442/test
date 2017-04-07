var moduleName = 'app.blog';

angular.module(moduleName, [
  'ui.router'
]).config(['$stateProvider', function ($stateProvider) {
  $stateProvider.state({
    name: 'blog'
  });
}]);

module.exports = moduleName;

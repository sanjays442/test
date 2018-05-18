var moduleName = 'app.about';

angular.module(moduleName, ['ui.router'])
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ABOUT,
      url: '/about/',
      template: require('./view.html')
    });
    $stateProvider.state({
      name: UIState.ABOUTSINGLE,
      url: '/about/{single}/',
      template: require('./single.html')
    });
  }]).controller('aboutCtrl', require('./ctrl'))
  .controller('aboutSingleCtrl', require('./single'))
  .filter('replaceurl', function () {
    return function (input) {
      return input.replace('http://www.addictionnetwork.com/blog/', '//blog.addictionnetwork.com/blog/');
    };
  })

module.exports = moduleName;

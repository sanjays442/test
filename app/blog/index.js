var moduleName = 'app.blog';

angular.module(moduleName, ['ui.router'])
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.BLOG,
      url: '/blog/',
      template: require('./view.html')
    });
    $stateProvider.state({
      name: UIState.BLOGSINGLE,
      url: '/blog/{single}/',
      template: require('./single.html')
    });
    $stateProvider.state({
      name: UIState.BLOGMORE,
      url: '/blog/page/{next}/',
      template: require('./more.html')
    });
  }]).controller('blogCtrl', require('./ctrl'))
  .controller('blogSingleCtrl', require('./single'))
  .filter('replaceurl', function () {
    return function (input) {
      return input.replace('http://www.addictionnetwork.com/blog/', '//blog.addictionnetwork.com/blog/');
    };
  })
  .controller('nextCtrl', require('./more'));

module.exports = moduleName;

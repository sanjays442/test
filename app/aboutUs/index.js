var angular = require('angular'),
  moduleName = 'app.aboutUs';

angular.module(moduleName, ['ui.router'])
  .component('about', {
    template: require('./view.html')
  })
  .component('content', require('./content'))
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'aboutUs',
      url: '/about',
      template: '<about></about>'
    });
  }]);

module.exports = moduleName;

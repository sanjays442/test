var moduleName = 'app.aboutUs';

angular.module(moduleName, ['ui.router'])
  .component('about', {
    template: require('./view.html')
  })
  .component('content', require('./content'))
  .controller('aboutUsCtrl', require('./ctrl'))
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ABOUT_US,
      url: '/about-us',
      template: '<about></about>'
    });
  }]);

module.exports = moduleName;

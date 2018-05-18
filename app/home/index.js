var moduleName = 'app.home';

angular.module(moduleName, [
  'ui.router',
  require('../components'),
  require('../services'),
  require('../sidePanel')
]).component('welcome', require('./welcome'))
  .component('featuredTreatmentCenter', require('./featuredTreatmentCenter'))
  .component('searchByState', require('./searchByState'))
  .component('slider', require('./slider'))
  .component('home', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.HOME,
      url: '/?auth_token',
      template: '<home></home>',
      // lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
      //   return $ocLazyLoad.load('preload'); // Resolve promise and load before view
      //     }]
      resolve: {
        lazyLoad: function ($transition$) {
          return $transition$.injector().get('$ocLazyLoad').load('preload');
        }
      }
      // lazyLoad: function ($transition$) {
      //   return $transition$.injector().get('$ocLazyLoad').load('preload');
      // }
    });
  }]);

module.exports = moduleName;

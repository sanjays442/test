var moduleName = 'app.contactUs';
console.log('index of contact us');
angular.module(moduleName, ['ui.router', require('../services')])
  .component('contact', {
    template: require('./view.html'),
    controller: require('./ctrl'),
    controllerAs: '$ctrl'
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CONTACT_US,
      url: '/contact',
      template: '<contact></contact>',
      // controller: require('./ctrl'),
      // resolve: {
      //   controller: function ($ocLazyLoad) {
      //     return $ocLazyLoad.load('/app/contactUs/ctrl.js');
      //     //  return $ocLazyLoad.load(require('./ctrl.js'));
      //   }
      // }

      // resolve: {
      //   AddictionNetworkApp: ['$ocLazyLoad', function ($ocLazyLoad) {
      //     return $ocLazyLoad.load({
      //       name: "AddictionNetworkApp",
      //       files: ['contactUs/ctrl.js']
      //     })
      //            }]
      // }
    });
  }]);

module.exports = moduleName;

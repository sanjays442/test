var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
  'ui.router', 'angularjs-dropdown-multiselect',
  require('../components'),
  require('../services')
]).component('thumbnailDelete', require('./sub/thumbnailDelete'))
  .component('centerTable', require('./sub/centerTable'))
  .component('pagination', require('./sub/pagination'))
  .component('profileMain', require('./profileMain'))
  .component('accountSettings', require('./accountSettings'))
  .component('changePassword', require('./changePassword'))
  .component('myTreatmentCenters', require('./myTreatmentCenters'))
  .component('addTreatmentCenter', require('./addTreatmentCenter'))
  .component('editTreatmentCenter', require('./editTreatmentCenter'))
  .component('myProfile', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'myProfile',
      url: '/my-profile',
      abstract: true,
      template: '<my-profile></my-profile>'
    });
    $stateProvider.state({
      name: 'myProfile.index',
      url: '/index',
      template: '<profile-main profile="$ctrl.profile"></profile-main>'
    });
    $stateProvider.state({
      name: 'myProfile.accountSettings',
      url: '/account-settings',
      template: '<account-settings profile="$ctrl.profile"></account-settings>'
    });
    $stateProvider.state({
      name: 'myProfile.changePassword',
      url: '/change-password',
      template: '<change-password></change-password>'
    });
    $stateProvider.state({
      name: 'myProfile.myTreatmentCenters',
      url: '/my-treatment-centers',
      template: '<my-treatment-centers></my-treatment-centers>'
    });
    $stateProvider.state({
      name: 'myProfile.addTreatmentCenter',
      url: '/add-treatment-center',
      template: '<add-treatment-center></add-treatment-center>'
    });
    $stateProvider.state({
      name: 'myProfile.editTreatmentCenter',
      url: '/edit-treatment-center/:id',
      template: '<edit-treatment-center></edit-treatment-center>'
    });
  }]);

module.exports = moduleName;

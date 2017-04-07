var angular = require('angular'),
  moduleName = 'app.myProfile';

angular.module(moduleName, [
  'ui.router',
  'angularjs-dropdown-multiselect',
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
  .component('bannerAds', require('./bannerAds'))
  .component('bannerAdsAdd', require('./bannerAds/add'))
  .component('bannerAdsEdit', require('./bannerAds/edit'))
  .component('bannerAdsView', require('./bannerAds/view'))
  .component('sponsorAds', require('./sponsorAds'))
  .component('sponsorAdsAdd', require('./sponsorAds/add'))
  .component('sponsorAdsEdit', require('./sponsorAds/edit'))
  .component('sponsorAdsView', require('./sponsorAds/view'))
  .component('paymentDetails', require('./paymentDetails'))
  .component('paymentDetailsAdd', require('./paymentDetails/add'))
  .component('paymentDetailsEdit', require('./paymentDetails/edit'))
  .component('paymentDetailsView', require('./paymentDetails/view'))
  .filter('urlFilter', require('./urlFilter'))
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
    $stateProvider.state({
      name: 'myProfile.bannerAds',
      url: '/banner-ads',
      template: '<banner-ads></banner-ads>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsAdd',
      url: '/banner-ads/add-banner',
      template: '<banner-ads-add></banner-ads-add>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsEdit',
      url: '/banner-ads/edit-banner/:id',
      template: '<banner-ads-edit></banner-ads-edit>'
    });
    $stateProvider.state({
      name: 'myProfile.bannerAdsView',
      url: '/banner-ads/view-banner/:id',
      template: '<banner-ads-view></banner-ads-view>'
    });
    $stateProvider.state({
      name: 'myProfile.sponsorAds',
      url: '/sponsor-ads',
      template: '<sponsor-ads></sponsor-ads>'
    });
    $stateProvider.state({
      name: 'myProfile.sponsorAdsAdd',
      url: '/sponsor-ads/add-sponsor',
      template: '<sponsor-ads-add></sponsor-ads-add>'
    });
    $stateProvider.state({
      name: 'myProfile.sponsorAdsEdit',
      url: '/sponsor-ads/edit-sponsor/:id',
      template: '<sponsor-ads-edit></sponsor-ads-edit>'
    });
    $stateProvider.state({
      name: 'myProfile.sponsorAdsView',
      url: '/sponsor-ads/view-sponsor/:id',
      template: '<sponsor-ads-view></sponsor-ads-view>'
    });
    // paymentDetails
    $stateProvider.state({
      name: 'myProfile.paymentDetails',
      url: '/payment-details',
      template: '<payment-details></payment-details>'
    });
    $stateProvider.state({
      name: 'myProfile.paymentDetailsAdd',
      url: '/payment-details/add-payment',
      template: '<payment-details-add></payment-details-add>'
    });
    $stateProvider.state({
      name: 'myProfile.paymentDetailsEdit',
      url: '/payment-details/edit-detail/:id',
      template: '<payment-details-edit></payment-details-edit>'
    });
    $stateProvider.state({
      name: 'myProfile.paymentDetailsView',
      url: '/payment-details/view-payments/:id',
      template: '<payment-details-view></payment-details-view>'
    });
  }]);

module.exports = moduleName;

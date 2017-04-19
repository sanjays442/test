var moduleName = 'app.myProfile';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  'angularjs-dropdown-multiselect',
  require('../components'),
  require('../services')
]).component('thumbnailDelete', require('./sub/thumbnailDelete'))
  .component('centerTable', require('./sub/centerTable'))
  .component('profileNavSection', require('./profileNavSection'))
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
  .component('myProfile', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.MY_PROFILE.INDEX,
      url: '/my-profile',
      abstract: true,
      template: '<my-profile></my-profile>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PROFILE,
      url: '/profile',
      template: '<profile-main profile="$ctrl.profile"></profile-main>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.ACCOUNT_SETTING,
      url: '/account-settings',
      template: '<account-settings profile="$ctrl.profile"></account-settings>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.CHANGE_PASSWORD,
      url: '/change-password',
      template: '<change-password></change-password>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.MY_CENTERS,
      url: '/my-treatment-centers',
      template: '<my-treatment-centers></my-treatment-centers>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.ADD_CENTER,
      url: '/add-treatment-center',
      template: '<add-treatment-center></add-treatment-center>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.EDIT_CENTER,
      url: '/edit-treatment-center/:id',
      template: '<edit-treatment-center></edit-treatment-center>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.BANNER_ADS,
      url: '/banner-ads',
      template: '<banner-ads></banner-ads>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.BANNER_ADS_ADD,
      url: '/banner-ads/add-banner',
      template: '<banner-ads-add></banner-ads-add>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.BANNER_ADS_EDIT,
      url: '/banner-ads/edit-banner/:id',
      template: '<banner-ads-edit></banner-ads-edit>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.BANNER_ADS_VIEW,
      url: '/banner-ads/view-banner/:id',
      template: '<banner-ads-view></banner-ads-view>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSOR_ADS,
      url: '/sponsor-ads',
      template: '<sponsor-ads></sponsor-ads>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSOR_ADS_ADD,
      url: '/sponsor-ads/add-sponsor',
      template: '<sponsor-ads-add></sponsor-ads-add>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSOR_ADS_EDIT,
      url: '/sponsor-ads/edit-sponsor/:id',
      template: '<sponsor-ads-edit></sponsor-ads-edit>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSOR_ADS_VIEW,
      url: '/sponsor-ads/view-sponsor/:id',
      template: '<sponsor-ads-view></sponsor-ads-view>'
    });
    // paymentDetails
    $stateProvider.state({
      name: UIState.MY_PROFILE.PAYMENT_DETAILS,
      url: '/payment-details',
      template: '<payment-details></payment-details>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PAYMENT_DETAILS_ADD,
      url: '/payment-details/add-payment',
      template: '<payment-details-add></payment-details-add>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PAYMENT_DETAILS_EDIT,
      url: '/payment-details/edit-payment/:id',
      template: '<payment-details-edit></payment-details-edit>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PAYMENT_DETAILS_VIEW,
      url: '/payment-details/view-payment/:id',
      template: '<payment-details-view></payment-details-view>'
    });
  }]);

module.exports = moduleName;

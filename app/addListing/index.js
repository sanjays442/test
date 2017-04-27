var moduleName = 'app.addTreatmentCenterSignUp';

angular.module(moduleName, [
  'ui.router',
  'angularjs-dropdown-multiselect',
  require('../components'),
  require('../services')
])
  .component('contactInfo', require('./contactInfo'))
  .component('userInfo', require('./userInfo'))
  .component('centerInfo', require('./centerInfo'))
  .component('centerDetails', require('./centerDetails'))
  .component('formNavSection', require('./formNavSection'))
  .component('paidMember', require('./paidMember'))
  .component('paymentDetail', require('./paymentDetail'))
  .component('sponsoredPage', require('./sponsoredPage'))
  .component('bannerAd', require('./bannerAd'))
  .component('addListing', {
    template: require('./view.html'),
    controller: require('./ctrl')
  }).config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.ADD_LISTING.INDEX,
      url: '/add-listing',
      abstract: true,
      template: '<add-Listing></add-Listing>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CONTACT_INFO,
      url: '/step1',
      template: '<contact-info></contact-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.USER_INFO,
      url: '/step2',
      template: '<user-info></user-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.PAID_MEMBER,
      url: '/step3',
      template: '<paid-member></paid-member>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_INFO,
      url: '/step4',
      template: '<center-info></center-info>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CENTER_DETAILS,
      url: '/step5',
      template: '<center-details></center-details>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.PAYMENT_DETAILS,
      url: '/step6',
      template: '<payment-detail></payment-detail>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.SPONSORED_PAGES,
      url: '/step7',
      template: '<sponsored-page></sponsored-page>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.BANNER_AD,
      url: '/step8',
      template: '<banner-ad></banner-ad>'
    });
  }]);

module.exports = moduleName;

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
  // .component('accountSettings', require('./accountSettings'))
  .component('changePassword', require('./changePassword'))
  // .component('myTreatmentCenters', require('./myTreatmentCenters'))
  .component('addTreatmentCenter', require('./addTreatmentCenter'))
  .component('editTreatmentCenter', require('./editTreatmentCenter'))
  //  .component('bannerAds', require('./bannerAds'))
  //  .component('bannerAdsAdd', require('./bannerAds/add'))
  //  .component('bannerAdsEdit', require('./bannerAds/edit'))
  //  .component('bannerAdsView', require('./bannerAds/view'))
  //  .component('sponsorAds', require('./sponsorAds'))
  // .component('sponsorAdsAdd', require('./sponsorAds/add'))
  //  .component('sponsorAdsEdit', require('./sponsorAds/edit'))
  //  .component('sponsorAdsView', require('./sponsorAds/view'))
  .component('sponsorStateSelectView', require('./sponsorAds/view/sponsoredAdsStateSelect'))
  .component('sponsorCartView', require('./sponsorAds/view/sponsoredCart'))
  .component('sponsorStateSelectEdit', require('./sponsorAds/edit/sponsoredAdsStateSelect'))
  .component('sponsorCartEdit', require('./sponsorAds/edit/sponsoredCart'))
  .component('paymentDetails', require('./paymentDetails'))
  .component('paymentDetailsAdd', require('./paymentDetails/add'))
  .component('paymentDetailsEdit', require('./paymentDetails/edit'))
  .component('paymentDetailsView', require('./paymentDetails/view'))
  // .component('upgradeAccount', require('./upgradeAccount'))
  .component('testCenterDetails', require('./testCenterDetails'))
  // .component('testCenterDetails', require('./testCenterDetails'))
  //  .component('sponsoredAdsStateSelect', require('./sponsoredAdsStateSelect'))
  //  .component('sponsorAdsSponsoredCart', require('./sponsorAds/sponsoredCart'))
  .component('addTestCenter', require('./addTestCenter'))
  .component('optionalFields', require('./addTestCenter/optionalFields'))
  .component('updateMembership', require('./addTestCenter/updateMembership'))
  .component('sponserPage', require('./addTestCenter/sponserPage'))
  .component('publishAds', require('./addTestCenter/publishAds'))
  .component('sponsoredPage', require('./addTestCenter/sponsoredPage'))
  .component('myprofileSponsorStateSelect', require('./addTestCenter/myprofileSponsorStateSelect'))
  .component('myprofileCartDetail', require('./addTestCenter/myprofileCartDetail'))
  .component('productDetails', require('./addTestCenter/productDetails'))
  .component('centerPayment', require('./addTestCenter/centerPayment'))
  .component('signupCompleted', require('./addTestCenter/signupCompleted'))
  .component('testCenterDone', require('./addTestCenter/testCenterDone'))
  .component('contactMyprof', require('./contactMyprof'))

  // .component('editTestCenter', require('./editTestCenter'))
  .component('editPublishAds', require('./editTestCenter/editPublishAds'))
  .component('editSponsoredPage', require('./editTestCenter/editSponsoredPage'))
  .component('myprofileEditSponsorStateSelect', require('./editTestCenter/myprofileEditSponsorStateSelect'))
  .component('myprofileEditCartDetail', require('./editTestCenter/myprofileEditCartDetail'))
  .component('doPayment', require('./doPayment'))
  .component('cartItems', require('./editTestCenter/cartItems'))

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
      name: UIState.MY_PROFILE.CHANGE_PASSWORD,
      url: '/change-password',
      template: '<change-password></change-password>'
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
    // $stateProvider.state({
    //   name: UIState.MY_PROFILE.SPONSOR_ADS_ADD,
    //   url: '/sponsor-ads/add-sponsor',
    //   template: '<sponsor-ads-add></sponsor-ads-add>'
    // });
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
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSOR_ADS_ADVERTISE,
      url: '/sponsor-ads/advertise',
      template: '<sponsor-ads-advertise></sponsor-ads-advertise>'
    });
    // paymentDetails
    $stateProvider.state({
      name: UIState.MY_PROFILE.PAYMENT_DETAILS,
      url: '/payment-details/',
      template: '<payment-details-add></payment-details-add>'
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
    // $stateProvider.state({
    //   name: UIState.MY_PROFILE.UPGRADE_ACCOUNT,
    //   url: '/upgrade-account',
    //   template: '<upgrade-account></upgrade-account>'
    // });
    $stateProvider.state({
      name: UIState.MY_PROFILE.TEST_CENTER_DETAILS,
      url: '/test-center-details',
      template: '<test-center-details></test-center-details>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.ADD_TEST_CENTER,
      url: '/add-test-center',
      template: '<add-test-center></add-test-center>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.OPTIONAL_FIELDS,
      url: '/optional-fields',
      template: '<optional-fields></optional-fields>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.UPDATE_MEMBERSHIP,
      url: '/update-membership',
      template: '<update-membership></update-membership>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSER,
      url: '/sponser-page',
      template: '<sponser-page></sponser-page>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PUBLISH_ADS,
      url: '/publish-ads',
      template: '<publish-ads></publish-ads>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSORED_PAGE,
      url: '/sponsored-page',
      template: '<sponsored-page></sponsored-page>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.DETAILS,
      url: '/product-details',
      template: '<product-details></product-details>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.CENTER_PAYMENT,
      url: '/center-payment',
      template: '<center-payment></center-payment>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SIGNUP_COMPLETED,
      url: '/signup-completed',
      template: '<signup-completed></signup-completed>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.PUBLISH_ADS_EDIT,
      url: '/edit-banner-ads',
      template: '<edit-publish-ads></edit-publish-ads>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.SPONSORED_PAGE_EDIT,
      url: '/edit-sponsored-page',
      template: '<edit-sponsored-page></edit-sponsored-page>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.TEST_CENTER_DONE,
      url: '/test-center-done',
      template: '<test-center-done></test-center-done>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.CONTACT_MYPROF,
      url: '/contact',
      template: '<contact-myprof></contact-myprof>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.DO_PAYMENT,
      url: '/do-payment',
      template: '<do-payment></do-payment>'
    });
    $stateProvider.state({
      name: UIState.MY_PROFILE.CART_ITEMS,
      url: '/edit-center/cart-items',
      template: '<cart-items></cart-items>'
    });
  }]);

module.exports = moduleName;

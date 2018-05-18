var moduleName = 'app.addTreatmentCenterSignUp';

require('./style.css');

angular.module(moduleName, [
  'ui.router',
  'angularjs-dropdown-multiselect',
  require('../components'),
  require('../services')
])
  .directive('phoneInput', ['$filter', '$browser', function ($filter, $browser) {
    return {
      require: 'ngModel',
      link: function ($scope, $element, $attrs, ngModelCtrl) {
        var listener = function () {
          var value = $element.val().replace(/[^0-9]/g, '');
          $element.val($filter('tel')(value, false));
        };

        // This runs when we update the text field
        ngModelCtrl.$parsers.push(function (viewValue) {
          return viewValue.replace(/[^0-9]/g, '').slice(0, 10);
        });

        // This runs when the model gets updated on the scope directly and keeps our view in sync
        ngModelCtrl.$render = function () {
          $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
        };

        $element.bind('change', listener);
        $element.bind('keydown', function (event) {
          var key = event.keyCode;
          // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          if (key === 91 || (key > 15 && key < 19) || (key >= 37 && key <= 40)) {
            return;
          }
          $browser.defer(listener); // Have to do this or changes don't get picked up properly
        });
        $element.bind('paste cut', function () {
          $browser.defer(listener);
        });
      }
    };
  }])
  .filter('tel', function () {
    return function (tel) {
      if (!tel) {
        return '';
      }
      var value = tel.toString().trim().replace(/^\+/, '');

      if (value.match(/[^0-9]/)) {
        return tel;
      }
      var city, number;
      switch (value.length) {
      case 1:
      case 2:
      case 3:
        city = value;
        break;

      default:
        city = value.slice(0, 3);
        number = value.slice(3);
      }

      if (number) {
        if (number.length > 3) {
          number = number.slice(0, 3) + '-' + number.slice(3, 7);
        } else {
          number = number;
        }
        return ('(' + city + ') ' + number).trim();
      }
      return '(' + city;
    };
  })
  .component('contactInfo', require('./contactInfo'))
  // .component('userInfo', require('./userInfo'))
  .component('centerInfo', require('./centerInfo'))
  .component('centerDetails', require('./centerDetails'))
  .component('formNavSection', require('./formNavSection'))
  .component('paidMember', require('./paidMember'))
  .component('paymentDetail', require('./paymentDetail'))
  .component('sponsoredPage', require('./sponsoredPage'))
  .component('bannerAd', require('./bannerAd'))
  .component('sponsoredStateSelect', require('./sponsoredStateSelect'))
  .component('cartDetail', require('./cartDetail'))
  .component('featuredListing', require('./featuredListing'))
  .component('featuredLastStep', require('./featuredLastStep'))
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
      name: UIState.ADD_LISTING.PAID_MEMBER,
      url: '/step2',
      template: '<paid-member></paid-member>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.PAYMENT_DETAILS,
      url: '/step3',
      template: '<payment-detail></payment-detail>'
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
      name: UIState.ADD_LISTING.SPONSORED_PAGES,
      url: '/step6',
      views: {
        '': {
          template: '<sponsored-page></sponsored-page>'
        },
        'cartDetails': {
          // template: '<cart-detail></cart-detail>'
          // controller: require('./cartDetail/ctrl')
        }
      }
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.BANNER_AD,
      url: '/step7',
      template: '<banner-ad></banner-ad>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.CART_DETAILS,
      url: '/cart',
      template: '<cart-detail></cart-detail>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING,
      url: '/step8',
      template: '<div class="scroll soft"><featured-listing></featured-listing></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE1,
      url: '/step8_1',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<div id="page1">' +
        '<div class="cloud-green zoomIn"><span class="shadow"></span><h2 class="text-center">Still Confused Why choose featured listing?</h2></div>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE2 + '" class="btn btn-default button-next">' +
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>' +
        '</button>' +
        '</div><div class="col-sm-12 text-center"><a ng-click="$root.cancelState()" class="btn btn-danger">Finish</a></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE2,
      url: '/step8_2',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<div id="page2">' +
        '<div class="cloud-blue zoomIn"><span class="shadow"></span><h2 class="text-center" style="top: 10px;">We advertise Your Treatment Center on our home page</h2></div>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE1 + '" class="btn btn-default button-previous">' +
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
        '</button>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE3 + '" class="btn btn-default button-next">' +
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>' +
        '</button>' +
        '</div><div class="col-sm-12 text-center"><a ng-click="$root.cancelState()" class="btn btn-danger">Finish</a></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE3,
      url: '/step8_3',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<div id="page3">' +
        '<div class="cloud-green zoomIn"><span class="shadow"></span><h2 class="text-center">But how does it benefit?</h2></div>' +
        '<a ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE2 + '" class="btn btn-default button-previous">' +
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
        '</a>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE4 + '" class="btn btn-default button-next">' +
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>' +
        '</button>' +
        '</div><div class="col-sm-12 text-center"><a ng-click="$root.cancelState()" class="btn btn-danger">Finish</a></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE4,
      url: '/step8_4',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<div id="page3">' +
        '<div class="cloud-blue zoomIn">' +
        '<span class="shadow"></span>' +
        '<div class="b">' +
        '<div>1) Your treatment center will be on top views list.</div>' +
        '<div>2) More customers get to see your treatment center advertisement.</div>' +
        '<div>3) This will keep you ahead in competetion getting more customer in your website.</div>' +
        '</div>' +
        '</div>' +
        '<a ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE3 + '" class="btn btn-default button-previous">' +
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
        '</a>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE5 + '" class="btn btn-default button-next">' +
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>' +
        '</button>' +
        '</div><div class="col-sm-12 text-center"><a ng-click="$root.cancelState()" class="btn btn-danger">Finish</a></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE5,
      url: '/step8_5',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<div id="page3">' +
        '<div class="cloud-green zoomIn"><span class="shadow"></span><h2 class="text-center">Still Not Satisfied</h2><a class="btn btn-default btn-not-satisfied" ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE6 + '">Click Here</a></div>' +
        '<a ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE4 + '" class="btn btn-default button-previous">' +
        '<i class="fa fa-arrow-left" aria-hidden="true"></i>' +
        '</a>' +
        '<button ui-sref="' + UIState.ADD_LISTING.FEATURED_LISTING_PAGE6 + '" class="btn btn-default button-next">' +
        '<i class="fa fa-arrow-right" aria-hidden="true"></i>' +
        '</button>' +
        '</div><div class="col-sm-12 text-center"><a ng-click="$root.cancelState()" class="btn btn-danger">Finish</a></div>'
    });
    $stateProvider.state({
      name: UIState.ADD_LISTING.FEATURED_LISTING_PAGE6,
      url: '/step8_6',
      parent: UIState.ADD_LISTING.FEATURED_LISTING,
      template: '<featured-last-step></featured-last-step>'
    });
  }]);

module.exports = moduleName;

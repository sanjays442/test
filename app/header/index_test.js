var UIState = require('../components/uiStateConstants');

var internalLinks = [{
    uiSref: UIState.HOME,
    name: 'Home',
    slug: 'home'
}, {
    uiSref: UIState.CENTER_MAP.MAP,
    name: 'Treatment Centers',
    slug: 'treatment_center'
}, {
    uiSref: UIState.INSURANCE,
    name: 'Insurance',
    slug: 'insurance'
}, {
    uiSref: UIState.ABOUT_US,
    name: 'About Us',
    slug: 'about_us'
}, {
    uiSref: UIState.BLOG,
    name: 'Blog',
    slug: 'blog'
}, {
    uiSref: UIState.CONTACT_US,
    name: 'Contact Us',
    slug: 'contact_us'
}
// {
//   uiSref: UIState.MY_PROFILE.PROFILE,
//   name: 'My Profile',
//   slug: 'my_profile'
// }
// {
//   uiSref: UIState.LOGOUT,
//   name: 'Logout',
//   slug: 'logout'
// }
];

var internalLinksNoAuth = [{
    uiSref: UIState.HOME,
    name: 'Home',
    slug: 'home'
}, {
    uiSref: UIState.CENTER_MAP.MAP,
    name: 'Treatment Centers',
    slug: 'treatment_center'
}, {
    uiSref: UIState.INSURANCE,
    name: 'Insurance',
    slug: 'insurance'
}, {
    uiSref: UIState.ABOUT_US,
    name: 'About Us',
    slug: 'about_us'
}, {
    uiSref: UIState.BLOG,
    name: 'Blog',
    slug: 'blog'
}, {
    uiSref: UIState.CONTACT_US,
    name: 'Contact Us',
    slug: 'contact_us'
}
// {
//   // uiSref: UIState.ADD_LISTING.CONTACT_INFO,
//   uiSref: UIState.SIGN_UP.WELCOME,
//   name: 'Signup',
//   slug: 'signup'
// }
// {
//   uiSref: UIState.LOGIN,
//   name: 'Login',
//   slug: 'login'
// }
];

var socialLinks = [{
  href: 'https://www.facebook.com/theaddictionnetwork',
  img: 'themes/addiction/images/fb-2.png'
}, {
  href: 'https://twitter.com/AddictionNet1',
  img: 'themes/addiction/images/twitter-ff-2.png'
}, {
  href: 'https://www.google.com/+Addictionnetwork1',
  img: 'themes/addiction/images/gglplus.png'
}];

function HeaderCtrl($location, $anchorScroll, $state, $log, $timeout, $scope, $rootScope, $window, localStorageService, service, centerService, $sce) {
  /* todo */
  localStorageService.remove('loginToken');
  localStorageService.remove('token');
  var vm = this;
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;
  vm.loginSref = UIState.LOGIN;
  vm.logoutSref = UIState.LOGOUT;
  vm.signupSref = UIState.SIGN_UP.WELCOME;
  vm.myProfSref = UIState.MY_PROFILE.TEST_CENTER_DETAILS;

  var token = localStorageService.get('token');
  var loginToken = localStorageService.get('loginToken', 'sessionStorage');
  if (token || loginToken) {
    $rootScope.login = 1;
  } else {
    $rootScope.login = 0;
  }
  vm.setActiveMenu = function (slug) {
    vm.activeMenu = {};
    vm.activeMenu[slug] = 'active';
  };
  vm.searchExpandClass = '';
  vm.toggleSearch = function () {
    if (vm.searchExpandClass === '') {
      vm.hideIcon = '';
      vm.searchExpandClass = 'expanded';
      var element = $window.document.getElementById('search-pnl-searchbox');
      element.focus();
    } else {
      vm.searchExpandClass = '';
      vm.hideIcon = 'ng-hide';
    }
  };
  vm.myProfile = function () {
    //  localStorageService.set('myprofileCurrentMenu', 'my-profile', 'sessionStorage');
    $rootScope.addCenterInitialize = 0;
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };

  // scroll
  vm.gotoAnchor = function (x) {
    $anchorScroll.yOffset = 50;
    var newHash = 'anchor_top_header';
    if ($location.hash() !== newHash) {
      // set the $location.hash to `newHash` and
      // $anchorScroll will automatically scroll to it
      // $location.hash('anchor_top_header');
    } else {
      // call $anchorScroll() explicitly,
      // since $location.hash hasn't changed
      $anchorScroll();
    }
    $anchorScroll();
  };

  $scope.$on('$stateChangeStart',
    function (event, toState) {
      // trigger scroll
      vm.gotoAnchor(1);

      token = localStorageService.get('token');
      loginToken = localStorageService.get('loginToken', 'sessionStorage');
      //  console.log('----token from index: ' + token + '   logintoken: ' + loginToken);
      var tostate = toState.name.split('.');
      // if (tostate[0] === 'add-listing') {
      //   $window.onbeforeunload = function () {
      //     var message = 'Sure you want to leave?';
      //     if (angular.isUndefined(event) === 'undefined') {
      //       //  event = $window.event;
      //     }
      //     if (event) {
      //       event.returnValue = message;
      //     }
      //     return message;
      //   };
      // }
      if (tostate[0] === 'blog') {
        //  $window.location = 'http://www.addictionnetwork.com/blog/';
      }

      if (token || loginToken) {
        $rootScope.login = 1;
        if (tostate[0] === 'addListing') {
          event.preventDefault();
        }
        //  $window.location.href = '/#my-profile/profile';
      } else if (tostate[0] === 'myProfile') {
        $rootScope.login = 0;
        $window.location.href = '/#/login';
        // $log.error('tostate: ' + tostate[0] + ' -->' + fromState.name);
        // event.preventDefault();
      } else {
        $rootScope.login = 0;
      }
      // for slider
      if (toState.name !== 'home') {
        vm.sliderShow = 0;
      } else {
        vm.sliderShow = 1;
      }
    });

  var slider = $rootScope.$on('$viewContentLoaded',
    function () {
      if (vm.sliderLoaded !== 1 || angular.isUndefined(vm.sliderLoaded)) {
        loadSlider(vm, service, $rootScope, $log, $sce);
        //  $log.info('slider called');
        vm.sliderLoaded = 1;
        vm.sliderShow = 1;
      }
      //  $log.info('slider html:  ' + vm.html);
    });
  vm.sliderLoaded = slider;
  vm.results = '';
  vm.removeAll = function () {
    angular.element("#search-pnl-searchbox").val("");
    vm.results = '';
  }
  vm.close_icon = function () {
    vm.results = '';
    vm.toggleSearch();
  }
  vm.search = function (srch) {
    angular.element('.list-group.search-results').removeClass('ng-hide');
    if (srch === 1 && angular.isDefined(vm.searchTxt) && vm.searchTxt.length > 1) {
      centerService.searchCenter(vm.searchTxt).then(function (result) {
        vm.results = result.results;
        if (result.results.length === 0) {
          vm.results = {
            0: {
              center_name: 'No result found',
              slug: ''
            }
          };
        }
      }).catch(function (err) {
        $log.error(err);
      });
    } else {
      vm.results = '';
    }
  };

  vm.gotoCart = function () {
    $state.go(UIState.MY_PROFILE.CART_ITEMS);
  };

}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl,
  controllerAs: '$ctrl'
};

HeaderCtrl.$inject = ['$location', '$anchorScroll', '$state', '$log', '$timeout', '$scope', '$rootScope', '$window', 'localStorageService', 'SliderService', 'TreatmentCenterService', '$sce'];

function loadSlider(vm, service, $rootScope, $log, $sce) {
  service.getSlider().then(function (result) {
    //  vm.html = $sce.trustAsHtml(result.data);
    vm.html = $sce.trustAsHtml(result.data);
    //  $log.info('recevied: ' + vm.html);
  }).catch(function (err) {
    // todo, display the error message in the page.
    $log.error(err);
  });
}

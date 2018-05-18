var UIState = require('../components/uiStateConstants');

var internalLinks = [{
  uiSref: UIState.HOME,
  name: 'Home'
}, {
  uiSref: UIState.CENTER_MAP.MAP,
  name: 'Treatment Centers'
}, {
  uiSref: UIState.INSURANCE,
  name: 'Insurance'
}, {
  uiSref: UIState.ABOUT_US,
  name: 'About Us'
}, {
  uiSref: UIState.BLOG,
  name: 'Blog'
}, {
  uiSref: UIState.CONTACT_US,
  name: 'Contact Us'
}, {
  uiSref: UIState.MY_PROFILE.PROFILE,
  name: 'My Profile'
}, {
  uiSref: UIState.LOGOUT,
  name: 'Logout'
}];

var internalLinksNoAuth = [{
  uiSref: UIState.HOME,
  name: 'Home'
}, {
  uiSref: UIState.CENTER_MAP.MAP,
  name: 'Treatment Centers'
}, {
  uiSref: UIState.INSURANCE,
  name: 'Insurance'
}, {
  uiSref: UIState.ABOUT_US,
  name: 'About Us'
}, {
  uiSref: UIState.BLOG,
  name: 'Blog'
}, {
  uiSref: UIState.CONTACT_US,
  name: 'Contact Us'
}, {
  uiSref: UIState.ADD_LISTING.CONTACT_INFO,
  // uiSref: UIState.SIGN_UP.WELCOME,
  name: 'Signup'
}, {
  uiSref: UIState.LOGIN,
  name: 'Login'
}];

var socialLinks = [{
  href: 'https://www.facebook.com/addictionnet1',
  img: 'themes/addiction/images/fb-2.png'
}, {
  href: 'https://twitter.com/AddictionNet1',
  img: 'themes/addiction/images/twitter-ff-2.png'
}, {
  href: 'https://www.google.com/+Addictionnetwork1',
  img: 'themes/addiction/images/gglplus.png'
}];

function HeaderCtrl($log, $timeout, $scope, $rootScope, $window, localStorageService, service, centerService, $sce) {
  /* todo */
  localStorageService.remove('loginToken');
  localStorageService.remove('token');
  var vm = this;
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;

  var token = localStorageService.get('token');
  var loginToken = localStorageService.get('loginToken', 'sessionStorage');
  if (token || loginToken) {
    $rootScope.login = 1;
  } else {
    $rootScope.login = 0;
  }

  $scope.$on('$stateChangeStart',
    function (event, toState) {
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
      // console.log(tostate);
      //  console.log(event);

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
        (function (i, n, v, o, c, a){i.InvocaTagId = o;var s = n.createElement("script");s.type = "text/javascript";s.async = true;s.src = ("https:" === n.location.protocol ? "https://" : "http://") + v;var fs = n.getElementsByTagName("script")[0];fs.parentNode.insertBefore(s, fs);})(window, document, "solutions.invocacdn.com/js/pnapi_integration-latest.min.js", "1282/3910429119");
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

  vm.search = function (srch) {
    angular.element('.list-group.search-results').removeClass('ng-hide');
    if (srch === 1) {
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
}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl
};

HeaderCtrl.$inject = ['$log', '$timeout', '$scope', '$rootScope', '$window', 'localStorageService', 'SliderService', 'TreatmentCenterService', '$sce'];

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

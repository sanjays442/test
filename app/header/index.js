var UIState = require('../components/uiStateConstants');

var internalLinks = [{
  uiSref: UIState.HOME,
  name: 'Home'
}, {
  uiSref: UIState.CENTER_MAP.MAP,
  name: 'Treatment Centers'
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
  uiSref: UIState.ABOUT_US,
  name: 'About Us'
}, {
  uiSref: UIState.BLOG,
  name: 'Blog'
}, {
  uiSref: UIState.CONTACT_US,
  name: 'Contact Us'
}, {
  uiSref: UIState.ADD_LISTING,
  name: 'Add Listing'
}, {
  uiSref: UIState.LOGIN,
  name: 'Login'
}];

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

function HeaderCtrl($log, $scope, $rootScope, $window, localStorageService, service, $sce) {
  /* todo */
  var vm = this;
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
  this.internalLinksNoAuth = internalLinksNoAuth;
  $scope.$on('$stateChangeStart',
    function (event, toState) {
      var token = localStorageService.get('token');
      var tostate = toState.name.split('.');
      if (tostate[0] === 'blog') {
        $window.location = 'http://www.addictionnetwork.com/blog/?angular_ads=advertisement';
      }
      if (token) {
        $rootScope.login = 1;
      } else if (tostate[0] === 'myProfile') {
        $window.location.href = '/#/login';
        // $log.error('tostate: ' + tostate[0] + ' -->' + fromState.name);
        event.preventDefault();
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
  //  $log.info(stateStart);
}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl
};

HeaderCtrl.$inject = ['$log', '$scope', '$rootScope', '$window', 'localStorageService', 'SliderService', '$sce'];

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

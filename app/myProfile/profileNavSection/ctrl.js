module.exports = ['$log', '$timeout', '$scope', '$state', '$rootScope', 'UIState', 'localStorageService', ctrl];

function ctrl($log, $timeout, $scope, $state, $rootScope, UIState, localStorageService) {
  var vm = this;
  vm.setCurrentMenu = setCurrentMenu;
  vm.currentMenu = getCurrentMenu();
  vm.hiddenMenu = {};
  vm.setHiddenMenu = hideMenu;
  $scope.$on('$stateChangeSuccess',
    function (event, toState) {
      if (toState.name === 'myProfile.testCenterDetails') {
        vm.currentMenu = 'test-center-details';
        vm.activeMenu = {};
        vm.activeMenu[vm.currentMenu] = 'selected';
        vm.setCurrentMenu(vm.currentMenu);
      }
      if (toState.name === 'myProfile.editTreatmentCenter') {
        vm.currentMenu = 'edit-test-center';
        vm.activeMenu = {};
        vm.activeMenu[vm.currentMenu] = 'selected';
        vm.setCurrentMenu(vm.currentMenu);
        vm.setHiddenMenu('add-test-center', true);
        vm.setHiddenMenu('edit-test-center', false);
      } else {
        vm.setHiddenMenu('add-test-center', false);
        vm.setHiddenMenu('edit-test-center', true);
      }
      // for cartitems in order details menu tab
      if (toState.name === 'myProfile.cartItems') {
        vm.currentMenu = 'order-details'; // menu slug
        vm.activeMenu = {};
        vm.activeMenu[vm.currentMenu] = 'selected';
        vm.setCurrentMenu(vm.currentMenu);
      }
      // navigation menu uisref / if menu add/del modify here too.
      var profMenu = [UIState.MY_PROFILE.PROFILE, UIState.MY_PROFILE.TEST_CENTER_DETAILS, UIState.MY_PROFILE.PAYMENT_DETAILS, UIState.MY_PROFILE.CONTACT_MYPROF, UIState.MY_PROFILE.ADD_TEST_CENTER, UIState.MY_PROFILE.EDIT_CENTER, UIState.MY_PROFILE.CART_ITEMS];
      if (profMenu.indexOf(toState.name) === -1) {
        $log.info($rootScope.myprofileAddcenter);
        if (angular.isUndefined($rootScope.myprofileAddcenter) && $rootScope.myprofileAddcenter !== 1) {
          vm.activeMenu = {};
        }
      }

      // Add testcenter last step test
      // if(toState.name==='myProfile.addTestCenter'){
      //   $log.info('came into addcenter'+toState.name);
      //   var addCenterProgress = localStorageService.get('addCenterProgress','sessionStorage');
      //   $log.info(addCenterProgress);
      //   if(angular.isDefined(addCenterProgress)){
      //     if(addCenterProgress.stepsCompleted===0 && addCenterProgress.lastStep!=='myProfile.addTestCenter'){
      //       $log.info('state go exec: '+toState.name+'     '+addCenterProgress.lastStep);
      //       // $state.go(addCenterProgress.lastStep);
      //     }
      //   }
      // }
    });

  function setCurrentMenu(slug) {
    localStorageService.set('myprofileCurrentMenu', slug, 'sessionStorage');
    vm.activeMenu = {};
    vm.activeMenu[slug] = 'selected';
  }

  function getCurrentMenu() {
    return localStorageService.get('myprofileCurrentMenu') ? localStorageService.get('myprofileCurrentMenu') : 'my-profile';
  }

  function hideMenu(slug, tf) {
    vm.hiddenMenu = getHiddenMenu();
    if (angular.isDefined(vm.hiddenMenu) && vm.hiddenMenu !== '') {
      vm.hiddenMenu[slug] = tf;
    } else {
      vm.hiddenMenu = {};
      vm.hiddenMenu[slug] = tf;
    }
    localStorageService.set('myprofileHiddenMenu', vm.hiddenMenu, 'sessionStorage');
  }

  function getHiddenMenu() {
    var hidMenu = localStorageService.get('myprofileHiddenMenu', 'sessionStorage') ? localStorageService.get('myprofileHiddenMenu', 'sessionStorage') : '';
    return hidMenu;
  }
  if (vm.currentMenu) {
    vm.activeMenu = {};
    vm.activeMenu[vm.currentMenu] = 'selected';
  }
  var hidMenu = getHiddenMenu();
  // set hidden menu
  if (angular.isUndefined(hidMenu) || hidMenu === '') {
    vm.setHiddenMenu('edit-test-center', true);
  } else {
    vm.hiddenMenu = hidMenu;
  }
  vm.addTestCenter = function () {
    vm.setCurrentMenu('add-test-center');
    // *************initial steps*************//
    // reset previous localstorage
    //  localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded', 'signupToken');
    // /    localStorageService.set('addCenterInitialize', 1, 'sessionStorage');
    var signUp = {
      'signupStep': {}
    };
    $log.info('setting...empty');
    var addCenterProgress = localStorageService.get('addCenterProgress', 'sessionStorage');
    if (angular.isUndefined(addCenterProgress) || addCenterProgress == null || addCenterProgress.stepsCompleted === 1) {
      localStorageService.set('signupStepsData', signUp, 'sessionStorage');
      localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded', 'signupToken');

    }
    //  $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };
  vm.linksPaid = [
    {
      uiSref: UIState.MY_PROFILE.PROFILE,
      name: 'Account Details',
      slug: 'my-profile'
    },
    {
      uiSref: UIState.MY_PROFILE.TEST_CENTER_DETAILS,
      name: 'Treatment Center Details',
      slug: 'test-center-details'
  },
    {
      uiSref: UIState.MY_PROFILE.ADD_TEST_CENTER,
      name: 'Add Treatment Center',
      slug: 'add-test-center'
  },
    {
      uiSref: UIState.MY_PROFILE.EDIT_CENTER,
      name: 'Editing Treatment Center',
      slug: 'edit-test-center'
  },
  // {
  //   uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
  //   name: 'Change Password',
  //   slug: 'change-password'
  // },
  // {
  //   uiSref: UIState.MY_PROFILE.UPGRADE_ACCOUNT,
  //   name: 'Upgrade Account'
  // },
    {
      uiSref: UIState.MY_PROFILE.PAYMENT_DETAILS,
      name: 'Payment Details',
      slug: 'payment-details'
  },
    {
      uiSref: UIState.MY_PROFILE.CONTACT_MYPROF,
      name: 'Contact',
      slug: 'contact'
  }
  ];

  vm.linksFree = [
    {
      uiSref: UIState.MY_PROFILE.PROFILE,
      name: 'Account Details',
      slug: 'my-profile'
    },
    {
      uiSref: UIState.MY_PROFILE.TEST_CENTER_DETAILS,
      name: 'Treatment Center Details',
      slug: 'test-center-details'
  },
    {
      uiSref: UIState.MY_PROFILE.ADD_TEST_CENTER,
      name: 'Add Treatment Center',
      slug: 'add-test-center'
  },
    {
      uiSref: UIState.MY_PROFILE.EDIT_CENTER,
      name: 'Editing Treatment Center',
      slug: 'edit-test-center'
  },
  // {
  //   uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
  //   name: 'Change Password',
  //   slug: 'change-password'
  // },
  // {
  //   uiSref: UIState.MY_PROFILE.UPGRADE_ACCOUNT,
  //   name: 'Upgrade Account'
  // },

    {
      uiSref: UIState.MY_PROFILE.PAYMENT_DETAILS,
      name: 'Payment Details',
      slug: 'payment-details'
  },
    {
      uiSref: UIState.MY_PROFILE.CART_ITEMS,
      name: 'Order Details',
      slug: 'order-details'
  },
    {
      uiSref: UIState.MY_PROFILE.CONTACT_MYPROF,
      name: 'Tech Help',
      slug: 'contact'
  }

  ];
  vm.linksCallback = function (slug) {
    // must execute funtions
    vm.setCurrentMenu(slug);
    // end
    $rootScope.myprofileAddcenter = 0;
    if (slug === 'add-test-center') {
      $rootScope.myprofileAddcenter = 1;
      vm.addTestCenter();
    } else if (slug === 'edit-test-center') {

    }
  };
}

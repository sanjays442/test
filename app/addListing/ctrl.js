module.exports = ['Status', '$log', '$scope', '$rootScope', 'localStorageService', '$window', ctrl];

function ctrl(Status, $log, $scope, $rootScope, localStorageService, $window) {
  var lm = $rootScope;
  var vm = this;
  lm.cancelState = function () {
    $window.location.href = '/#/login';
  };

  // initialize
  localStorageService.remove('userInfo');
  $rootScope.addListingStepDone = 0;
  $rootScope.hideSteps = [];
  $rootScope.showSteps = ['contactInfo', 'paidMember', 'centerInfo', 'centerDetails', 'paymentDetails', 'sponsoredPage', 'bannerAd', 'featuredListing'];
  $rootScope.doneSteps = [];
  $rootScope.disableUserinfo = 0;

  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('addListingNavigation', 'sessionStorage'))) {
    var addListingNavigation = localStorageService.get('addListingNavigation', 'sessionStorage');
    if (addListingNavigation !== null) {
      $rootScope.addListingStepDone = addListingNavigation.stepNum;
      $rootScope.doneSteps = addListingNavigation.doneSteps;
      $rootScope.activeLink = addListingNavigation.activeLink;
      $rootScope.showSteps = addListingNavigation.showSteps;
    }
  }
  // addlisting navigation control
  $scope.$on('$stateChangeStart',
    function (event, toState) {
      var tostate = toState.name.split('.');
      if (toState.name !== 'addListing.cartDetail') {
        var step0 = ['contactInfo'];
        var step1 = step0.concat(['paidMember']);
        var step2 = step1.concat(['paymentDetails']);
        var step3 = step2.concat(['centerInfo']);
        var step4 = step3.concat(['centerDetails']);
        var step5 = step4.concat(['sponsoredPage']);
        var step6 = step5.concat(['bannerAd']);
        var step7 = step6.concat(['featuredListing']);
        // var step8 = step7.concat(['featuredListing']);
        var stepDone = $rootScope.addListingStepDone;
        if (tostate[0] === 'addListing') {
          if (stepDone === 0 && step0.indexOf(tostate[1]) === -1) {
            event.preventDefault();
          } else if (stepDone === 1 && step1.indexOf(tostate[1]) === -1) {
            event.preventDefault();
          } else if (stepDone === 2 && (step2.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          } else if (stepDone === 3 && (step3.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          } else if (stepDone === 4 && (step4.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          } else if (stepDone === 5 && (step5.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          } else if (stepDone === 6 && (step6.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          } else if (stepDone === 7 && (step7.indexOf(tostate[1]) === -1)) {
            event.preventDefault();
          }
          // trigger savestep for done steps, work like next button
          if (stepDone === 4 && tostate[1] === 'centerDetails') {
            $rootScope.saveStep4(); // only save the step
          }
          // trigger savestep for done steps, work like next button
          // if (tostate[1] === 'userInfo') {
          //   $rootScope.saveStep1Nav(); // only save the step
          // }
          // prevent to display steps other than treatment center and center detail
          if ($rootScope.showSteps.indexOf(tostate[1]) === -1) {
            event.preventDefault();
          }

          // save navigation data to localStorageService
          saveSteps($rootScope.addListingStepDone, $rootScope.doneSteps, $rootScope.activeLink, $rootScope.showSteps);
          $rootScope.addListingReset = 0;
        } else {
          // removing localstorage for tabs
          localStorageService.remove('addListingSponsoredPage', 'addListingPaymentDetail', 'addListingUserInfo', 'addListingCenterDetails', 'addListingBannerAds', 'addListingNavigation', 'addListingCanSkip', 'addListingCenteradded');
          $rootScope.addListingReset = 1;
          $rootScope.addlistForm.$setPristine();
        }
      }
    });

  $scope.$on('$stateChangeSuccess',
    function (event, toState) {
      var tostate = toState.name.split('.');
      // default
      vm.sideAdvertisement = 0;
      vm.colMd = 'col-md-8';
      // removing advertisemet sidebar for memebership, sponsoredPage section
      if ((tostate[0] === 'addListing' && (tostate[1] === 'paidMember' || tostate[1] === 'sponsoredPage' || tostate[1] === 'bannerAd'))) {
        vm.sideAdvertisement = 1;
        vm.colMd = 'col-md-12';
      }
      // else if (tostate[1] === 'cartDetail') {
      //   vm.sideAdvertisement = 1;
      //   vm.colMd = 'col-md-12';
      // }
      // if ((tostate[0] === 'addListing' && tostate[1] === 'paidMember') || (tostate[0] === 'addListing' && tostate[1] === 'sponsoredPage')) {
      //   vm.sideAdvertisement = 1;
      //   vm.colMd = 'col-md-12';
      // }
    });

  function saveSteps(stepNum, doneSteps, activeLink, showSteps) {
    // if (angular.isDefined(localStorageService.get('addListingNavigation', 'sessionStorage'))) {
    //   var navigationInfo = localStorageService.get('addListingNavigation', 'sessionStorage');
    //   if (navigationInfo === null) {
    //     console.log('nul');
    //     return;
    //   }
    // }
    addListingNavigation = {
      'stepNum': stepNum,
      'doneSteps': doneSteps,
      'activeLink': activeLink,
      'showSteps': showSteps
    };
    if (localStorageService.isSupported) {
      localStorageService.set('addListingNavigation', addListingNavigation, 'sessionStorage');
    }
  }
}

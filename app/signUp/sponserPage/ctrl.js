module.exports = ['$timeout', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', ctrl];

function ctrl($timeout, $injector, $scope, $log, $rootScope, $state, UIState, localStorageService) {
  var vm = this;
  // var curCenter = localStorageService.get('current_center');
  //  if(angular.isDefined(curCenter)){
  //    curCenter = curCenter.id;
  //  localStorageService.set('sponsorPages','0');

  //  }
  vm.sponsorAdded = localStorageService.get('sponsorAdded');
  vm.bannerAdded = localStorageService.get('bannerAdded');
  if (angular.isUndefined(vm.sponsorAdded) || vm.sponsorAdded === null) {
    localStorageService.set('sponsorAdded', '0');
    localStorageService.set('bannerAdded', '0');
  }

  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };
  function runProgress(startVal, endVal) {
    vm.progressValue =  startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  // vm.setProgressValues(60, 70);
  if (vm.sponsorAdded === 1 && vm.bannerAdded === 1) {
    vm.setProgressValues(70, 80);
  } else if (vm.bannerAdded === 1) {
    vm.setProgressValues(70, 75);
  } else if (vm.sponsorAdded === 1) {
    vm.setProgressValues(70, 75);
  } else {
    vm.setProgressValues(60, 70);
  }
  // END: progress values

  vm.publish_ads = function () {
    $state.go(UIState.SIGN_UP.PUBLISH_ADS);
  };
  vm.add_sponsor = function () {
    $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
  };
  vm.goBack = function () {
    $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
  };
  vm.goToCart = function () {
    $state.go(UIState.SIGN_UP.DETAILS);
  };

  // getting current center info
    vm.currentCenter = localStorageService.get('current_center');
    vm.loadCart = function () {
      $rootScope.cartCentersInfo = [];
      $rootScope.activeCenterInfo = '';
      // get cart details using api
      centerService.getCartDetails().then(function (result) {
        vm.cartInfo = result.cart_subscription;
        for (var key in vm.cartInfo.items) {
          var item = {
            'id': vm.cartInfo.items[key].id,
            'label': vm.cartInfo.items[key].name,
            'item': vm.cartInfo.items[key],
            'index': key
          }
          $rootScope.cartCentersInfo.push(item);
          if (vm.currentCenter[0].id === item.id) {
            $rootScope.activeCenterInfo = item;
          }
        }
        initCurrentCenter();
        $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
      }).catch(function (err) {
        $log.info(err);
      });
    };

    function initCurrentCenter(){
        var cartMode = {
          'mode': 'edit',
          'item': 'sponsored_layouts',
          'data': $rootScope.activeCenterInfo.item,
          'index': $rootScope.activeCenterInfo.index
        };
        localStorageService.set('cartMode', cartMode);
    }

}

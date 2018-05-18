module.exports = ['$injector', '$timeout', '$scope', '$log', '$rootScope', '$state', 'Status', 'UIState', 'TreatmentCenterService', 'localStorageService', ctrl];

function ctrl($injector, $timeout, $scope, $log, $rootScope, $state, Status, UIState, service, localStorageService) {
  var vm = this;
  //updating progress of steps
  var addCenterProgress = {'lastStep':'myProfile.productDetails', 'stepsCompleted':0};
  localStorageService.set('addCenterProgress',addCenterProgress, 'sessionStorage');

  vm.testCenter = function () {
    // removing variables related to sponsored page
    localStorageService.remove('signupSponsoredPage','lastAddedCenter', 'addCenterProgress');
    vm.clearRootscopeData();
    var signupData = localStorageService.get('signupStepsData', 'sessionStorage');
    signupData.signupStep.testCenter = {};
    localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };
  vm.goBack = function () {
     $state.go(UIState.MY_PROFILE.SPONSER);
  //  $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
  };

  vm.clearRootscopeData = function () {
    $rootScope.cityModel = {};
    $rootScope.countyModel = {};
    $rootScope.statesSel = {};
    $rootScope.checkedStateModel = {};
    $rootScope.checkedStateDetail = {};
    $rootScope.treatmentCentersModel = {};
    $rootScope.demographicModel = {};
    $rootScope.treatmentApproachModel = {};
    $rootScope.settingModel = {};
    $rootScope.additionalServicesModel = {};
    $rootScope.paymentModel = {};
    $rootScope.byDrugModel = {};
    $rootScope.checkedAllStates = {};
    $rootScope.centerSelected = {};
  };

  //  var token = localStorageService.get('signupToken');
  vm.cartDetails = [];
  // get cart details using api
  vm.loadCart = function (cenId, toggle) {
    service.getCartDetails().then(function (result) {
      vm.cartDetails = result.cart_subscription;
      // calculating subtotals
      calculateSubtotals();
      if (toggle === false) {
        return;
      }
      if (cenId !== '') {
        $timeout(function () {
          vm.centerToggle(cenId);
        }, 800);
      } else {
        $timeout(function () {
          vm.expandAllFun(true);
          //  for (var ct in vm.cartDetails.items) {
          //  vm.centerToggle(vm.cartDetails.items[ct].id);
          // console.log(vm.cartDetails.treatment_centers[ct].id);
          //  }
        }, 800);
      }
    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.loadCart('');

  function calculateSubtotals() {
    vm.centerSubTotals = {};
    var centerId = '';
    for (var item in vm.cartDetails.items) {
      centerId = vm.cartDetails.items[item].id;
      vm.centerSubTotals[centerId] = vm.cartDetails.items[item].subtotal ? vm.cartDetails.items[item].subtotal : 0;
      // sponsored layouts
      for (var sl in vm.cartDetails.items[item].sponsored_layouts) {
        for (var itm in vm.cartDetails.items[item].sponsored_layouts[sl]) {
          vm.centerSubTotals[centerId] += vm.cartDetails.items[item].sponsored_layouts[sl][itm].subtotal;
        }
      }
      // banner ads
      for (var ads in vm.cartDetails.items[item].banner_ads) {
        vm.centerSubTotals[centerId] += vm.cartDetails.items[item].banner_ads[ads].subtotal;
      }
    }
  }

  vm.gotoPayment = function () {
    localStorageService.set('cartTotal', vm.cartDetails.total_price);
    $state.go(UIState.MY_PROFILE.CENTER_PAYMENT);
  };

  vm.grandTotal = 0;
  vm.membership = '';
  vm.centersAdded = localStorageService.get('center_added');
  if (localStorageService.get('membership') !== null) {
    vm.membership = localStorageService.get('membership');
    vm.grandTotal += vm.membership.cost;
  } else {
    vm.centersAdded = [];
  }
  for (var key in vm.centersAdded) {
    vm.grandTotal += vm.centersAdded[key].cost;
  }

  vm.viewProfile = function () {
    $state.go(UIState.LOGIN);
  };

  vm.editCenter = function (cenId, cenName, item, index) {
    var centerInfo = [{
      'id': cenId,
      'label': cenName
    }];
    localStorageService.set('current_center', centerInfo);
    var cartMode = {
      'mode': 'edit',
      'item': 'sponsored_layouts',
      'data': item,
      'index': index
    };
    localStorageService.set('cartMode', cartMode);
    $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
  };
  // for delete icon
  vm.deleteLoader = {};
  vm.deletedRow = {};
  vm.deleteSponsorAds = function (itemId, cenId) {
    vm.deleteLoader[itemId] = 1;
    // delete sponsored ads using itemId
    service.deleteSponsorAds(itemId, cenId).then(function (result) {
      // $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.deleteLoader[itemId] = 0;
      vm.deletedRow[itemId] = 1;
      vm.loadCart(cenId, false);
    }).catch(function (err) {
      $log.info(err);
      vm.deleteLoader[itemId] = 0;
    });
  };
  vm.deleteBannerAds = function (itemId, cenId) {
    vm.deleteLoader[itemId] = 1;
    $log.info('delete: cen id: ' + cenId + ' itemid: ' + itemId);
    // delete sponsored ads using itemId
    service.deleteBannerAds(itemId, cenId).then(function (result) {
      //   $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.deleteLoader[itemId] = 0;
      vm.deletedRow[itemId] = 1;
      vm.loadCart(cenId, false);
    }).catch(function (err) {
      $log.info(err);
      vm.deleteLoader[itemId] = 0;
    });
  };
  vm.deleteConfirm = function (itemId, cenId, itemType) {
    var deleteConfHtml = '<div class="col-sm-12"><div class="modal-header"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Do you confirm?</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12 text-right"><button type="button" class="btn btn-primary" ng-click="ok(' + itemId + ',' + cenId + ')">Yes</button><button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      template: deleteConfHtml,
      controllerAs: 'vmModalCtrl',
      controller: function () {
        var vmModal = this;
        // if (angular.isDefined($rootScope.checkedStateModel) && $rootScope.checkedStateModel.indexOf(state.shortname) >= 0) {
        //   vmModal.stateSelectCheck = true;
        // }
        $rootScope.ok = function (itemId) {
          if (itemType === 'banner_ads') {
            vm.deleteBannerAds(itemId, cenId);
          } else {
            vm.deleteSponsorAds(itemId, cenId);
          }
          modalInstance.dismiss('cancel');
          return true;
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
          return true;
        };
      },
      bindToController: true
    });
  };

  /** ********************* Show/hide functionality for cart details *********************/
  vm.centerToggle = function (itemId) {
    if (angular.isUndefined(vm.productShow)) {
      vm.productShow[itemId] = 0;
    }
    if (vm.productShow[itemId]) {
      vm.productShow[itemId] = 0;
      vm.centerToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.productShow[itemId] = 1;
      vm.centerToggleIconClass[itemId] = 'fa-minus-square-o';
      vm.openCenterSubItems(itemId);
    }
  };

  vm.openCenterSubItems = function (itemId) {
    if (angular.isUndefined(vm.membershipShow)) {
      vm.membershipShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.sponsorshipShow)) {
      vm.sponsorshipShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.stateShow)) {
      vm.stateShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.cityShow)) {
      vm.cityShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.countyShow)) {
      vm.countyShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.categoryShow)) {
      vm.categoryShow[itemId] = 0;
    }
    if (angular.isUndefined(vm.adsShow)) {
      vm.adsShow[itemId] = 0;
    }

    if (vm.membershipShow[itemId] === 0) {
      vm.membershipToggle(itemId);
    }
    if (vm.sponsorshipShow[itemId] === 0) {
      vm.sponsorshipToggle(itemId);
    }
    if (vm.stateShow[itemId] === 0) {
      vm.stateToggle(itemId);
    }
    if (vm.cityShow[itemId] === 0) {
      vm.cityToggle(itemId);
    }
    if (vm.countyShow[itemId] === 0) {
      vm.countyToggle(itemId);
    }
    if (vm.categoryShow[itemId] === 0) {
      vm.categoryToggle(itemId);
    }
    if (vm.adsShow[itemId] === 0) {
      vm.adsToggle(itemId);
    }
  };

  vm.membershipToggle = function (itemId) {
    if (vm.membershipShow[itemId]) {
      vm.membershipShow[itemId] = 0;
      // vm.membershipToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.membershipShow[itemId] = 1;
      //  vm.membershipToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.sponsorshipToggle = function (itemId) {
    if (vm.sponsorshipShow[itemId]) {
      vm.sponsorshipShow[itemId] = 0;
      //  vm.sponsorshipToggleIconClass[itemId] = 'fa-plus-square-o';
    } else {
      vm.sponsorshipShow[itemId] = 1;
      // vm.sponsorshipToggleIconClass[itemId] = 'fa-minus-square-o';
    }
  };
  vm.stateToggle = function (itemId) {
    if (vm.stateShow[itemId]) {
      vm.stateShow[itemId] = 0;
    } else {
      vm.stateShow[itemId] = 1;
    }
  };
  vm.cityToggle = function (itemId) {
    if (vm.cityShow[itemId]) {
      vm.cityShow[itemId] = 0;
    } else {
      vm.cityShow[itemId] = 1;
    }
  };
  vm.countyToggle = function (itemId) {
    if (vm.countyShow[itemId]) {
      vm.countyShow[itemId] = 0;
    } else {
      vm.countyShow[itemId] = 1;
    }
  };
  vm.categoryToggle = function (itemId) {
    if (vm.categoryShow[itemId]) {
      vm.categoryShow[itemId] = 0;
    } else {
      vm.categoryShow[itemId] = 1;
    }
  };
  vm.adsToggle = function (itemId) {
    if (vm.adsShow[itemId]) {
      vm.adsShow[itemId] = 0;
    } else {
      vm.adsShow[itemId] = 1;
    }
  };

  vm.expandAllFun = function (tf) {
    for (var key in vm.cartDetails.items) {
      //  $log.info(key + ' : ' + vm.cartDetails.items[key]);
      //  $log.info(vm.cartDetails.items[key]);
      if (vm.productShow[vm.cartDetails.items[key].id] === 0 && tf === true) {
        vm.centerToggle(vm.cartDetails.items[key].id);
      }
      if (vm.productShow[vm.cartDetails.items[key].id] === 1 && tf === false) {
        vm.centerToggle(vm.cartDetails.items[key].id);
      }
    }
  };

  /** ********************* End Show/hide functionality for cart details *********************/
  localStorageService.remove('edit_bannerads');
  vm.publish_ads_edit = function (cenId) {
    var ads = {
      'cenId': cenId
    };
    localStorageService.set('edit_bannerads', ads, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.PUBLISH_ADS);
  };
}

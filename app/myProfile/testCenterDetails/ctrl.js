module.exports = ['$injector', '$timeout', '$state', 'UIState', '$log', 'Status', '$rootScope', 'localStorageService', 'TreatmentCenterService', ctrl];

function ctrl($injector, $timeout, $state, UIState, $log, Status, $rootScope, localStorageService, service) {
  var vm = this;
  var membershipType = localStorageService.get('membershipType', 'sessionStorage');
  // alert(membershipType);
  if (membershipType !== 'free' || membershipType !== null) {
    // $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  }
  vm.payment = function (type) {
    $rootScope.membershipType = type;
    localStorageService.set('membershipType', type, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS_ADD);
  };

  vm.cartDetails = [];
  // get cart details using api
  vm.loadCart = function (cenId, toggle) {
    service.getCentersList().then(function (result) {
      vm.cartDetailsMod = result;
      // calculate subtotals center wise
      calculateSubtotals();
      if (toggle === false) {
        return;
      }
      vm.cartDetails = result;
      if (cenId !== '') {
        $timeout(function () {
          vm.centerToggle(cenId);
        }, 500);
      } else {
        $timeout(function () {
          //  vm.expandAllFun(true);
          for (var ct in vm.cartDetails.treatment_centers) {
            vm.centerToggle(vm.cartDetails.treatment_centers[ct].id);
            // console.log(vm.cartDetails.treatment_centers[ct].id);
          }
        }, 400);
      }

    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.loadCart('');
  $rootScope.previousStep = 'test_center_details'; // used in do payement for back button to reteain previous values

  function calculateSubtotals() {
    vm.centerSubTotals = {};
    vm.sponsorItemsCount = {};
    vm.bannerAdsCount = {};
    var centerId = '';
    var centersItem = vm.cartDetailsMod.treatment_centers;
    for (var item in centersItem) {
      centerId = centersItem[item].id;
      vm.centerSubTotals[centerId] = 0; // centersItem[item].subtotal;
      vm.sponsorItemsCount[centerId] = 0; // item count;
      // sponsored layouts
      for (var sl in centersItem[item].sponsored_listing_layouts) {
        for (var itm in centersItem[item].sponsored_listing_layouts[sl]) {
          vm.centerSubTotals[centerId] += centersItem[item].sponsored_listing_layouts[sl][itm].subtotal;
          vm.sponsorItemsCount[centerId]++;
        }
      }

      vm.bannerAdsCount[centerId] = 0; // banner ads count;
      // banner ads
      for (var ads in centersItem[item].banner_ads) {
        vm.centerSubTotals[centerId] += centersItem[item].banner_ads[ads].subtotal;
        vm.bannerAdsCount[centerId]++;
      }
      if (centersItem[item].listing_type === 'paid' && centersItem[item].active === true) {
        vm.centerSubTotals[centerId] += vm.cartDetailsMod.plans.Gold;
      } else if (centersItem[item].listing_type === 'featured' && centersItem[item].active === true) {
        vm.centerSubTotals[centerId] += vm.cartDetailsMod.plans.Platinum;
      }
    }
  }
  // for delete icon
  vm.deleteLoader = {};
  vm.deletedRow = {};
  vm.deleteSponsorAds = function (itemId, cenId) {
    vm.deleteLoader[itemId] = 1;
    // delete sponsored ads using itemId
    service.deleteSponsorAdsPaid(itemId, cenId).then(function (result) {
      $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.deleteLoader[itemId] = 0;
      vm.deletedRow[itemId] = 1;
      vm.loadCart(cenId, false);
    }).catch(function (err) {
      $log.info(err);
      vm.deleteLoader[itemId] = 0;
      $rootScope.$emit(Status.FAILED, 'Something went wrong');
    });
  };
  vm.deleteBannerAds = function (itemId, cenId) {
    vm.deleteLoader[itemId] = 1;
    // delete sponsored ads using itemId
    service.deleteBannerAdsPaid(itemId, cenId).then(function (result) {
      $rootScope.$emit(Status.SUCCEEDED, 'Item Removed');
      vm.deleteLoader[itemId] = 0;
      vm.deletedRow[itemId] = 1;
      vm.loadCart(cenId, false);
    }).catch(function (err) {
      $log.info(err);
      vm.deleteLoader[itemId] = 0;
      $rootScope.$emit(Status.FAILED, 'Something went wrong');
    });
  };

  vm.deleteConfirm = function (itemId, cenId, itemType) {
    var deleteConfHtml = '<div class="col-sm-12"><div class="modal-header"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Do you confirm ?</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12 text-right"><button type="button" class="btn btn-primary" ng-click="ok(' + itemId + ',' + cenId + ')">Yes</button><button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'sm',
      template: deleteConfHtml,
      controllerAs: 'vmModalCtrl',
      controller: function () {
        var vmModal = this;
        // if (angular.isDefined($rootScope.checkedStateModel) && $rootScope.checkedStateModel.indexOf(state.shortname) >= 0) {
        //   vmModal.stateSelectCheck = true;
        // }
        $rootScope.ok = function (itemId, cenId) {
          if (itemType === 'banner_ads') {
            vm.deleteBannerAds(itemId, cenId, 'true');
          } else {
            vm.deleteSponsorAds(itemId, cenId, 'true');
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

  function cardDetails() {
    vm.cardsCount = 0;
    service.getCardsInfo().then(function (res) {
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      vm.savedCards = res;
      vm.cardsCount = res.payments.length;
    }).catch(function (err) {
      $log.info(err);
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      shakeme();
      vm.displayMsg = err.data.error;
    });
  }
  cardDetails();

  function chargePayment(currentMembership, targetMembership, cenId) {
    var payment = (targetMembership === 'featured') ? vm.cartDetails.plans.Platinum : vm.cartDetails.plans.Gold;
    vm.newMembership = {
      'paymentTotal': payment,
      'action': 'upgradeMembership',
      'data': [],
      'fromState': UIState.MY_PROFILE.TEST_CENTER_DETAILS
    };
    $rootScope.doPaymentInitMsg = '';
    if (currentMembership === 'free' && vm.cardsCount === 0) {
      //  $rootScope.$emit(Status.SUCCEEDED, 'You need to add a payment method(card details) to subscribe.');
      $rootScope.doPaymentInitMsg = 'You need to add a payment method(card details) to subscribe.';
      // $state.go('myProfile.paymentDetailsAdd');
      localStorageService.set('paymentActionInfo', vm.newMembership, 'sessionStorage');
      //  $state.go(UIState.MY_PROFILE.DO_PAYMENT);
      $state.go(UIState.MY_PROFILE.CART_ITEMS);
    } else if (currentMembership === 'free' && vm.cardsCount > 0) {
      //  $rootScope.$emit(Status.SUCCEEDED, 'Complete the payment process to subscribe.');
      $rootScope.doPaymentInitMsg = 'Complete the payment process to subscribe.';
      localStorageService.set('paymentActionInfo', vm.newMembership, 'sessionStorage');
      //  $state.go(UIState.MY_PROFILE.DO_PAYMENT);
      $state.go(UIState.MY_PROFILE.CART_ITEMS);
    } else {
      // $rootScope.$emit(Status.SUCCEEDED, 'Complete the payment process to subscribe.');
      $rootScope.doPaymentInitMsg = 'Complete the payment process to modify membership';
      localStorageService.set('paymentActionInfo', vm.newMembership, 'sessionStorage');
      // $state.go(UIState.MY_PROFILE.DO_PAYMENT);
      $state.go(UIState.MY_PROFILE.CART_ITEMS);
    }
  }

  vm.upgradeMembership = function (currentMembership, targetMembership, cenId) {
    var newMembership = '';
    if (currentMembership === targetMembership) {
      $rootScope.$emit(Status.FAILED, 'Already taken');
    } else if (targetMembership === 'sponsored') {
      newMembership = 'sponsored';
      //  newMembership = 'sponsored';
    } else if (targetMembership === 'featured') {
      newMembership = 'featured';
    }
    var formData = new FormData();
    var membership = {
      'package': newMembership
    };
    for (var key in membership) {
      formData.append(key, membership[key]);
    }

    if (newMembership !== '') {
      $rootScope.$emit(Status.PROCESSING, '');
      service.upgradeMembership(formData, cenId).then(function (result) {
        // $rootScope.$emit(Status.SUCCEEDED, result.success);
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
        // vm.loadCart(cenId);
        if ((result.success).search("already") !== -1) {
          var res = result.success;
          res = res.replace('featured', 'Platinum');
          res = res.replace('paid', 'Gold');
          $rootScope.$emit(Status.SUCCEEDED, res);
        } else {
          chargePayment(currentMembership, targetMembership, cenId);
        }
      }).catch(function (err) {
        $log.info(err);
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
      });
    }
  };

  vm.upgradeMembershipConfirm = function (currentMembership, targetMembership, cenId) {
    var memTarg = (targetMembership === 'featured') ? 'Platinum' : 'Gold';
    var memCost = (targetMembership === 'featured') ? vm.cartDetails.plans.Platinum : vm.cartDetails.plans.Gold;
    var freeMsg = 'Hi you will be charged $' + memCost + ' for ' + memTarg + ' Memership upgrade.<br>Please confirm your purchase. <br>(This will be deducted from your default added card)';
    if (currentMembership === 'free') {
      // freeMsg = 'Hi you will be charged $' + memCost + ' for ' + memTarg + ' Memership upgrade.<br>Please confirm your purchase. <br>(This will be deducted from your default added card)';
    }
    var upgradeConfHtml = '<div class="col-sm-12"><div class="modal-header"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Do you confirm ?</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12">' + freeMsg + '</div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12 text-right"><button type="button" class="btn btn-primary" ng-click="ok(&quot;' + currentMembership + '&quot;,&quot;' + targetMembership + '&quot;,' + cenId + ')">Yes</button><button type="button" class="btn btn-primary" ng-click="cancel()">Cancel</button></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'sm',
      template: upgradeConfHtml,
      controllerAs: 'vmModalCtrl',
      controller: function () {
        var vmModal = this;
        // if (angular.isDefined($rootScope.checkedStateModel) && $rootScope.checkedStateModel.indexOf(state.shortname) >= 0) {
        //   vmModal.stateSelectCheck = true;
        // }
        $rootScope.ok = function (currentMembership, targetMembership, cenId) {
          vm.upgradeMembership(currentMembership, targetMembership, cenId);
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

  // start process of adding another treatment center //
  vm.addTestCenter = function () {
    // *************initial steps*************//
    // reset previous localstorage
    localStorageService.remove('membership', 'center_added', 'userInfo', 'signupSponsoredPage', 'membershipType', 'bannerAdded', 'sponsorAdded', 'signupToken');

    // /    localStorageService.set('addCenterInitialize', 1, 'sessionStorage');
    var signUp = {
      'signupStep': {}
    };
    localStorageService.set('signupStepsData', signUp, 'sessionStorage');
    $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };

  vm.editAds = function (ads, cenId, mode) {
    var editBannerAds = {
      cenId: cenId,
      ads: ads,
      mode: mode ? mode : 'add'
    };

    //  localStorageService.set('addCenterInitialize', 1, 'sessionStorage');
    localStorageService.set('editBannerAdsInfo', editBannerAds, 'sessionStorage');
    $rootScope.bannerAdsInfo = ads;
    $state.go(UIState.MY_PROFILE.PUBLISH_ADS_EDIT);
  };

  vm.editCenter = function (id) {
    var parm = {
      id: id
    };
    var elem = angular.element('#nav_add-test-center');
    elem.hide();
    $state.go(UIState.MY_PROFILE.EDIT_CENTER, parm);
  };

  vm.editSponsor = function (cenId, cenName, item, key) {
    var centerInfo = [{
      'id': cenId,
      'label': cenName
    }];
    localStorageService.set('current_center_edit', centerInfo);
    $rootScope.editSponsorCurCenter = centerInfo;
    var cartMode = {
      'mode': 'edit',
      'item': 'sponsored_layouts',
      // 'data': item
      'data': vm.cartDetailsMod.treatment_centers[key]
    };
    $rootScope.editSponsorCartMode = cartMode;

    // localStorageService.set('addCenterInitialize', 1, 'sessionStorage');
    localStorageService.set('cartModeEdit', cartMode);
    $state.go(UIState.MY_PROFILE.SPONSORED_PAGE_EDIT);
  };

  /** ********************* Show/hide functionality for cart details *********************/
  vm.centerToggle = function (itemId) {
    if (vm.productShow[itemId]) {
      vm.productShow[itemId] = 0;
      // vm.centerToggleIconClass[itemId] = 'fa-plus-square-o';
      vm.centerToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.productShow[itemId] = 1;
      //  vm.centerToggleIconClass[itemId] = 'fa-minus-square-o';
      vm.centerToggleIconClass[itemId] = 'fa-minus';
      vm.openCenterSubItems(itemId);
    }
  };

  vm.openCenterSubItems = function (itemId) {
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

  vm.sponsorshipToggle = function (itemId) {
    if (vm.sponsorshipShow[itemId]) {
      vm.sponsorshipShow[itemId] = 0;
      // vm.sponsorshipToggleIconClass[itemId] = 'fa-plus';
    } else {
      vm.sponsorshipShow[itemId] = 1;
      // vm.sponsorshipToggleIconClass[itemId] = 'fa-minus';
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
      vm.centerToggle(vm.cartDetails.items[key].id);
    }
  };

  /** ********************* End Show/hide functionality for cart details *********************/

}

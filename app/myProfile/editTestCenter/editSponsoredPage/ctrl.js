function ctrl($injector, $log, $scope, $state, UIState, $stateParams, $rootScope, $window, $document, Status, SponsorService, centerService, localStorageService, $timeout) {
  var vm = this;

  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Treatment Center';
    }
    // selectionLimit: 1
  };

  vm.goHome = function () {
    $rootScope.addCenterInitialize = 0; // show left panel navigations
    localStorageService.remove('cartModeEdit', 'current_center_edit');
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };

  vm.treatmentCenter = {
    buttonDefaultText: 'Select Treatment Center'
  };
  if (angular.isUndefined(vm.treatmentCentersModel)) {
    vm.treatmentCentersModel = [];
  }
  vm.sponsoredAdNormalModel = [];
  vm.sponsoredAdStateModel = [];
  vm.sponsoredAdCountyModel = [];
  vm.sponsoredAdCityModel = [];
  $rootScope.centerSelected = [];

  // getting values from localstorage if already set
  // if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
  //
  //   var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
  //   if (sponsoredInfo !== null && angular.isDefined(sponsoredInfo.treatmentCenter)) {
  //     vm.treatmentCentersModel = sponsoredInfo.treatmentCenter;
  //   }
  // }

  // var token = localStorageService.get('signupToken');
  // load pricing info from api
  $rootScope.sponsorPricingInfo = '';
  // SponsorService.getSignupPriceInfo(token).then(function (response) {
  //   $rootScope.sponsorPricingInfo = response;
  //   $log.info('pricing info got from api');
  // });

  vm.skipTo = function () {
    vm.clearRootscopeData();
    vm.goHome();

    // $window.location.href = '/login';
    //  $rootScope.addListingStepDone = 6;
    //  $rootScope.doneSteps = $rootScope.doneSteps.concat(['sponsoredPage']);
    // $state.go(UIState.ADD_LISTING.BANNER_AD);
  };
  vm.previous = function () {
    vm.goHome();
  };
  vm.submitComplete = function () {
    // var centerIds = '';
    var centerIds = [];
    var id = '';
    var i = 0;
    var listingIds = {};

    // for (var key in $rootScope.centerSelected) {
    //   id = String($rootScope.centerSelected[key].id);
    //   centerIds = centerIds + id;
    //   if (i < $rootScope.centerSelected.length - 1) {
    //     centerIds += ',';
    //   }
    //   i++;
    // }
    //  console.log(centerIds);

    for (var cen in $rootScope.centerSelected) {
      var sponsoredListingIds = [];
      i = 0;
      var centerId = String($rootScope.centerSelected[cen].id);
      var totalItems = 0;

      for (var key in $rootScope.countyModel[centerId]) { // county ids
        id = String($rootScope.countyModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.cityModel[centerId]) { // city ids
        id = String($rootScope.cityModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }

      if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates[centerId] === true) {
        for (key in $rootScope.statesSel[centerId]) { // state ids
          id = String($rootScope.statesSel[centerId][key].id);
          sponsoredListingIds[i] = id;
          i++;
        }
      } else {
        for (key in $rootScope.checkedStateDetail[centerId]) { // state ids
          id = String($rootScope.checkedStateDetail[centerId][key].id);
          sponsoredListingIds[i] = id;
          i++;
        }
      }

      for (key in $rootScope.demographicModel[centerId]) { // demographic ids
        id = String($rootScope.demographicModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.treatmentApproachModel[centerId]) { // treatment approach ids
        id = String($rootScope.treatmentApproachModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.settingModel[centerId]) { // setting ids
        id = String($rootScope.settingModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.additionalServicesModel[centerId]) { // additional service
        id = String($rootScope.additionalServicesModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.paymentModel[centerId]) { // payemnt
        id = String($rootScope.paymentModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.byDrugModel[centerId]) { // by drug model
        id = String($rootScope.byDrugModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }

      if (angular.isDefined($rootScope.centerWise[centerId])) {
        totalItems = $rootScope.centerWise[centerId].totalItems;
      } else {
        totalItems = 0;
      }
      if (totalItems > 0) {
        centerIds.push(centerId);
        listingIds[centerId] = sponsoredListingIds;
      }
    }
    vm.sponsorAdsPending = {
      'paymentTotal': 0,
      'action': 'addSponsorAds',
      'data': [],
      'other_data': [],
      'fromState': UIState.MY_PROFILE.SPONSORED_PAGE_EDIT
    };
    vm.submitSingle = function (ci) {
      var cenId = String(centerIds[ci]);
      var formData = new FormData();
      var sponsorData = {
        // 'sponsored_listing_layout_ids': sponsoredListingIds,
        'sponsored_listing_layout_ids': listingIds[cenId],
        'active': true
      };
      for (key in sponsorData) {
        formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
      }

      $rootScope.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
      // SponsorService.editSponsorSignup(formData, centerIds, token).then(function () {
      SponsorService.editSponsor(formData, cenId).then(function (res) {
        ci++;
        if (ci > (centerIds.length - 1)) {
          // $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
          $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
          vm.goHome();
        } else {
          vm.submitSingle(ci);
        }
      }).catch(function (err) {
        $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG + ' ' + err.data.error);
        $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
        vm.goHome();
        throw err;
      });
    };

    var ci = 0;
    if (centerIds.length > 0) {
      // consoele.log('cen id: ' + );
      // vm.submitSingle(ci); // skipping here and sending to payment module

      var cenId = String(centerIds[ci]);
      // now skipping preselected items id, so that duplicated items dont added
      var newlisting_ids = {};
      newlisting_ids[cenId] = [];
      for (key in listingIds[cenId]) {
        if ($rootScope.preselectedItems.indexOf(parseInt(listingIds[cenId][key])) === -1) {
          newlisting_ids[cenId].push(listingIds[cenId][key]);
        }
      }
      var formData = new FormData();
      var sponsorData = {
        // 'sponsored_listing_layout_ids': sponsoredListingIds,
        //  'sponsored_listing_layout_ids': listingIds[cenId],
        'sponsored_listing_layout_ids': newlisting_ids[cenId],
        'active': true
      };
      for (key in sponsorData) {
        formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
      }
      vm.sponsorAdsPending.data.push(sponsorData);
      var data_other = {
        'centerId': cenId
      };
      vm.sponsorAdsPending.other_data.push(data_other);
      vm.sponsorAdsPending.paymentTotal = $rootScope.newItemsPaymentTotal;
      localStorageService.set('paymentActionInfo', vm.sponsorAdsPending, 'sessionStorage');

      //  $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
      if (newlisting_ids[cenId].length === 0) {
        $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
      } else {
        // $state.go(UIState.MY_PROFILE.DO_PAYMENT);
        // $state.go(UIState.MY_PROFILE.CART_ITEMS);
        addSponsorAds(vm.sponsorAdsPending.data, 0);
      }
    } else {
      $rootScope.$emit(Status.FAILED, 'Cart is empty, please select some items.');
    }
  };

  vm.submit = function () {
    // openPrompt();
    vm.submitComplete();
  };

  function addSponsorAds(data, index) {
    var cenId = vm.sponsorAdsPending.other_data[0].centerId;
    var formData = new FormData();
    var sponsorData = data[0];
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }

    $rootScope.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    SponsorService.editSponsor(formData, cenId).then(function (res) {
      $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
      // $rootScope.$emit(Status.SUCCEEDED, 'Sponsored added');
      // localStorageService.remove('paymentActionInfo');
      //   $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
      //  vm.congrats(); // calling remaing part of payment funtion

      $state.go(UIState.MY_PROFILE.CART_ITEMS);
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG + ' ' + err.data.error);
      $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
      throw err;
    });
  }

  function openPrompt() {
    var popup = '<div class="col-sm-12"><div class="modal-header total_popup_modal"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Your total billing amount for sponsored ads is ${{$root.total}}</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12"><div class="col-sm-7">Press okay to confirm.</div><div class="col-sm-5"><button type="button" class="btn btn-primary" ng-click="ok()">&nbsp;Okay&nbsp;</button></div></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      size: 'md',
      template: popup,
      controller: function () {
        vm.confirm = 0;
        $rootScope.ok = function () {
          vm.submitComplete();
          //  vm.skipTo();
          modalInstance.dismiss('cancel');
          vm.confirm = 1;
          return true;
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
          vm.confirm = 0;
          return true;
        };
      },
      bindToController: true
    });
  }

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
    vm.treatmentCentersModel = {};
    $rootScope.onInit();
    localStorageService.remove('signupSponsoredPage');
  };

  vm.currentCenter = localStorageService.get('current_center_edit');
  if (vm.currentCenter === '' || vm.currentCenter === null) {
    $log.info('could not get current center. ');
    vm.goHome();
  }
  // getting data
  function sponsorList(page) {
    SponsorService.sponsorList(page).then(function (response) {
      var sponsoredAds = response.sponsored_ads;
      var centers = [];
      for (var key in sponsoredAds) {
        centers[key] = {
          id: sponsoredAds[key].id,
          label: sponsoredAds[key].title
        };
      }
      vm.treatmentCenters = vm.currentCenter; // centers;
      $rootScope.treatmentCentersValue = vm.currentCenter; // centers;
      // preselect all treatmentcenter saving values in treatmentCentersModel //
      vm.treatmentCentersModel = vm.currentCenter; // centers;
      // ------------ //
      $rootScope.centerSelect();
      if (angular.isDefined($rootScope.centerSelected) && $rootScope.centerSelected.length > 0) {
        $rootScope.activeCenter = vm.currentCenter[0].id; // $rootScope.centerSelected[0].id;
      } else {
        $rootScope.activeCenter = vm.currentCenter[0].id; // centers[0].id;
      }
      $rootScope.loadModelsCenterwise();
      $rootScope.dropDownClickOnload(); // after all models loaded, triggering click event for dropdowns
      $rootScope.onInit();
    });
  }
  sponsorList('');
  $rootScope.centerSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    // saving to localStorageService
    if (angular.isDefined(localStorageService.get('signupSponsoredPage', 'sessionStorage'))) {
      var sponsoredInfo = localStorageService.get('signupSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
        sponsoredInfo.centersValue = $rootScope.treatmentCentersValue;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel,
          'centersValue': $rootScope.treatmentCentersValue
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      // localStorageService.set('signupSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };
  $rootScope.centerDeSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    if (angular.isDefined(localStorageService.get('signupSponsoredPage', 'sessionStorage'))) {
      var sponsoredInfo = localStorageService.get('signupSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        sponsoredInfo.treatmentCenter = vm.treatmentCentersModel;
        sponsoredInfo.centersValue = $rootScope.treatmentCentersValue;
      } else {
        sponsoredInfo = {
          'treatmentCenter': vm.treatmentCentersModel,
          'centersValue': $rootScope.treatmentCentersValue
        };
      }
      $rootScope.centerSelected = vm.treatmentCentersModel;
      // localStorageService.set('signupSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };

  vm.loadCart = function () {
    $rootScope.cartCentersInfo = [];
    $rootScope.activeCenterInfo = '';
    // get cart details using api
    centerService.getCentersList().then(function (result) {
      vm.cartInfo = result.treatment_centers;
      for (var key in vm.cartInfo) {
        var centerInfo = {
          'id': vm.cartInfo[key].id,
          'label': vm.cartInfo[key].center_name,
          'item': vm.cartInfo[key]
        };
        $rootScope.cartCentersInfo.push(centerInfo);
        if (vm.currentCenter[0].id === centerInfo.id) {
          $rootScope.activeCenterInfo = centerInfo;
        }
      }

    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.loadCart();
  // change active center
  $rootScope.changeActiveCenter = function () {
    vm.currentCenter = [];
    vm.currentCenter.push($rootScope.activeCenterInfo);
    localStorageService.set('current_center_edit', vm.currentCenter);

    var cartMode = {
      'mode': 'edit',
      'item': 'sponsored_layouts',
      'data': $rootScope.activeCenterInfo.item
    };
    localStorageService.set('cartModeEdit', cartMode);
    $state.reload();
  };

}
module.exports = ['$injector', '$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$window', '$document', 'Status', 'SponsorService', 'TreatmentCenterService', 'localStorageService', '$timeout', ctrl];

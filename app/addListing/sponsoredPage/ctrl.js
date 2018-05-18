function ctrl($injector, $log, $scope, $state, UIState, $stateParams, $rootScope, $window, $document, Status, SponsorService, localStorageService) {
  var vm = this;
  $rootScope.activeLink = 'Sponsored Pages';
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
  if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
    var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
    if (sponsoredInfo !== null && angular.isDefined(sponsoredInfo.treatmentCenter)) {
      vm.treatmentCentersModel = sponsoredInfo.treatmentCenter;
    }
  }
  var token = localStorageService.get('signupToken');
  // load pricing info from api
  $rootScope.sponsorPricingInfo = '';
  // SponsorService.getSignupPriceInfo(token).then(function (response) {
  //   $rootScope.sponsorPricingInfo = response;
  //   $log.info('pricing info got from api');
  // });

  vm.skipTo = function () {
    // $window.location.href = '/login';
    $rootScope.addListingStepDone = 6;
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['sponsoredPage']);
    $state.go(UIState.ADD_LISTING.BANNER_AD);
  };
  vm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };

  vm.submit = function () {
    openPrompt();
  };
  vm.submitComplete = function () {
    //var centerIds = '';
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

      for (key in $rootScope.countyModel[centerId]) { // county ids
        id = String($rootScope.countyModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
      for (key in $rootScope.cityModel[centerId]) { // city ids
        id = String($rootScope.cityModel[centerId][key].id);
        sponsoredListingIds[i] = id;
        i++;
      }

      if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates[cen] === true) {
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
      //SponsorService.editSponsorSignup(formData, centerIds, token).then(function () {
      SponsorService.editSponsorSignup(formData, cenId, token).then(function () {
        ci++;
        if (ci > (centerIds.length - 1)) {
          $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
          $rootScope.addListingStepDone = 6;
          $rootScope.doneSteps = $rootScope.doneSteps.concat(['sponsoredPage']);
          // clear sponsoredpage data
          localStorageService.remove('addListingSponsoredPage', 'sessionStorage');
          vm.clearRootscopeData();
          $state.go(UIState.ADD_LISTING.BANNER_AD);
        } else {
          vm.submitSingle(ci);
        }

      }).catch(function (err) {
        $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
        throw err;
      });
    }
    var ci = 0;
    if (centerIds.length > 0) {
      vm.submitSingle(ci);
    } else {
      $rootScope.$emit(Status.FAILED, 'Cart is empty, please select some items.');
    }

  };

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
  };

  // getting data
  function sponsorList(page) {
    SponsorService.sponsorListSignup(page, token).then(function (response) {
      var sponsoredAds = response.sponsored_ads;
      var centers = [];
      for (var key in sponsoredAds) {
        centers[key] = {
          id: sponsoredAds[key].id,
          label: sponsoredAds[key].title
        };
      }
      vm.treatmentCenters = centers;
      $rootScope.treatmentCentersValue = centers;
      // preselect all treatmentcenter saving values in treatmentCentersModel //
      vm.treatmentCentersModel = centers;
      $rootScope.centerSelect();
      // ------------ //
      $rootScope.loadModelsCenterwise();
      if (angular.isDefined($rootScope.centerSelected) && $rootScope.centerSelected.length > 0) {
        $rootScope.activeCenter = $rootScope.centerSelected[0].id;
      } else {
        $rootScope.activeCenter = centers[0].id;
      }
      $rootScope.onInit();
    });
  }
  sponsorList('');
  $rootScope.centerSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    // saving to localStorageService
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
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
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };
  $rootScope.centerDeSelect = function () {
    // use to prevent selection of demographic boxes without center select
    // $rootScope.centerOnchange();
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
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
      localStorageService.set('addListingSponsoredPage', sponsoredInfo, 'sessionStorage');
    }
    $rootScope.onInit();
  };
}
module.exports = ['$injector', '$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$window', '$document', 'Status', 'SponsorService', 'localStorageService', '$timeout', ctrl];

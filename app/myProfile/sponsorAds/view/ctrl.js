function ctrl($injector, $log, $scope, $state, UIState, $stateParams, $rootScope, $document, Status, SponsorService, localStorageService) {
  var vm = this;
  var sponsoredId = $stateParams.id;

  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };

  $rootScope.centerSelected = [];
  vm.treatmentCentersModel = [];

  // getting values from localstorage if already set
  // if (angular.isDefined(localStorageService.get('myprofileSponsoredPage', 'sessionStorage'))) {
  //   var sponsoredInfo = localStorageService.get('myprofileSponsoredPage', 'sessionStorage');
  //   if (sponsoredInfo !== null && angular.isDefined(sponsoredInfo.treatmentCenter)) {
  //     vm.treatmentCentersModel = sponsoredInfo.treatmentCenter;
  //   }
  // }

  vm.submit = function () {
    openPrompt();
  };
  vm.submitComplete = function () {
    var centerIds = '';
    var id = '';
    var i = 0;
    for (var key in vm.treatmentCentersModel) {
      id = String(vm.treatmentCentersModel[key].id);
      centerIds = centerIds + id;
      if (i < vm.treatmentCentersModel.length - 1) {
        centerIds += ',';
      }
      i++;
    }

    var sponsoredListingIds = [];
    i = 0;
    for (key in $rootScope.countyModel) {
      id = String($rootScope.countyModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.cityModel) {
      id = String($rootScope.cityModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates === true) {
      for (key in $rootScope.statesSel) { // state ids
        id = String($rootScope.statesSel[key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
    } else {
      for (key in $rootScope.checkedStateDetail) { // state ids
        id = String($rootScope.checkedStateDetail[key].id);
        sponsoredListingIds[i] = id;
        i++;
      }
    }
    for (key in $rootScope.demographicModel) { // demographic ids
      id = String($rootScope.demographicModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.treatmentApproachModel) { // treatment approach ids
      id = String($rootScope.treatmentApproachModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.settingModel) { // setting ids
      id = String($rootScope.settingModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.additionalServicesModel) { // additional service
      id = String($rootScope.additionalServicesModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.paymentModel) { // payemnt
      id = String($rootScope.paymentModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    for (key in $rootScope.byDrugModel) { // by drug model
      id = String($rootScope.byDrugModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    var formData = new FormData();
    var sponsorData = {
      'sponsored_listing_layout_ids': sponsoredListingIds,
      'active': true
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsor(formData, centerIds).then(function () {
      // $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
      // clear sponsoredpage data
      localStorageService.remove('myprofileSponsoredPage', 'sessionStorage');
      //  vm.clearRootscopeData();
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
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
    $rootScope.cityModel = [];
    $rootScope.countyModel = [];
    $rootScope.statesSel = [];
    $rootScope.checkedStateModel = [];
    $rootScope.checkedStateDetail = [];
    $rootScope.demographicModel = [];
    $rootScope.treatmentApproachModel = [];
    $rootScope.settingModel = [];
    $rootScope.additionalServicesModel = [];
    $rootScope.paymentModel = [];
    $rootScope.byDrugModel = [];
    $rootScope.checkedAllStates = null;
    // $rootScope.onInit();
  };
  vm.clearRootscopeData(); // clear rootscope data before begin

  // getting data
  function sponsorList(page) {
    var sponsoredPagesBuyIds = [];
    $rootScope.sponsoredPagesBuyIds = [];
    SponsorService.sponsorList(page).then(function (response) {
      var sponsoredAds = response.sponsored_ads;
      vm.treatmentCenter = '';
      for (var key in sponsoredAds) {
        // if already bought preselect treatment center
        var sponsoredPages = sponsoredAds[key].sponsored_pages;
        var id = parseInt(sponsoredAds[key].id, 10);
        if (id === parseInt(sponsoredId, 10)) {
          vm.treatmentCenter = sponsoredAds[key].title;
          $rootScope.centerSelected.push({
            id: id,
            label: sponsoredAds[key].title
          });
          if (sponsoredPages.length > 0) {
            // storing other buy ids
            for (var k in sponsoredPages) {
              var buyId = sponsoredPages[k].id;
              if (sponsoredPagesBuyIds.indexOf(buyId) === -1) {
                sponsoredPagesBuyIds.push(buyId);
              }
            }
          }
          break;
        }
      }
      vm.treatmentCentersModel = $rootScope.centerSelected;
      $rootScope.sponsoredPagesBuyIds = sponsoredPagesBuyIds;
      vm.preSelectBoughtItem();
    });
  }
  sponsorList(''); // init sponsolist

  // preselect bought items only
  vm.preSelectBoughtItem = function () {
    if (angular.isDefined($rootScope.sponsoredPagesBuyIds)) {
      var buyIds = $rootScope.sponsoredPagesBuyIds;
      var allCitiesIds = [];
      var allCountiesIds = [];
      var allStatesInfo = [];
      $rootScope.preselectedCities = [];
      $rootScope.preselectedCounties = [];

      var stateIdCount = 1;
      // states
      for (var key in $rootScope.stateIds) {
        // console.log($rootScope.stateIds[key]+' name: '+$rootScope.stateIds[key].name+ ' short: '+$rootScope.stateIds[key].state);
        if (buyIds.indexOf($rootScope.stateIds[key].id) >= 0) {
          var stateSelectedData = {
            id: $rootScope.stateIds[key].id,
            shortname: $rootScope.stateIds[key].slug, // $rootScope.stateIds[key].name,
            state: ($rootScope.stateIds[key].state === '') ? $rootScope.stateIds[key].name : $rootScope.stateIds[key].state
          };
          var index = $rootScope.checkedStateModel.indexOf(stateSelectedData.shortname);
          //  console.log('state mode: ' + $rootScope.checkedStateModel + ' shortname: ' + stateSelectedData.shortname + ' index: ' + index);
          if (index === -1) {
            $rootScope.checkedStateModel.push(stateSelectedData.shortname);
            $rootScope.checkedStateDetail.push(stateSelectedData);
            //  console.log('pushed: ' + stateSelectedData.id + ' sh: ' + stateSelectedData.shortname + '  ' + stateSelectedData.state);
          }
        }
        allStatesInfo.push({
          id: $rootScope.stateIds[key].id,
          slug: $rootScope.stateIds[key].slug
        });
      }

      for (var st in allStatesInfo) {
        // storing cities, counties
        SponsorService.getCityCountyByStateV2(allStatesInfo[st].slug).then(function (response) {
          for (key in response.city) {
            if (allCitiesIds.indexOf(response.city[key].id) === -1) {
              allCitiesIds.push({
                id: response.city[key].id,
                name: response.city[key].name
              });
            }
          }
          for (key in response.county) {
            if (allCountiesIds.indexOf(response.county[key].id) === -1) {
              allCountiesIds.push({
                id: response.county[key].id,
                name: response.county[key].name
              });
            }
          }
          // cities
          for (key in allCitiesIds) {
            if (buyIds.indexOf(allCitiesIds[key].id) >= 0) {
              var modelData = {
                id: allCitiesIds[key].id,
                label: allCitiesIds[key].name
              };
              $rootScope.cityModel.push(modelData);
              $rootScope.preselectedCities.push(allCitiesIds[key].id);
            }
          }
          allCitiesIds = [];

          // counties
          for (key in allCountiesIds) {
            if (buyIds.indexOf(allCountiesIds[key].id) >= 0) {
              modelData = {
                id: allCountiesIds[key].id,
                label: allCountiesIds[key].name
              };
              $rootScope.countyModel.push(modelData);
              $rootScope.preselectedCounties.push(allCountiesIds[key].id);
            }
          }
          allCountiesIds = [];

          if (stateIdCount >= $rootScope.stateIds.length) {
            $rootScope.onInit();
          }
          stateIdCount++;
        });
      }

      // Demographic
      var demModel = [];
      for (key in $rootScope.demographic) {
        if (buyIds.indexOf($rootScope.demographic[key].id) >= 0) {
          demModel.push({
            id: $rootScope.demographic[key].id
          });
        }
      }
      $rootScope.demographicModel = demModel;

      var treatModel = [];
      // treatmentApproach
      for (key in $rootScope.treatmentApproach) {
        if (buyIds.indexOf($rootScope.treatmentApproach[key].id) >= 0) {
          treatModel.push({
            id: $rootScope.treatmentApproach[key].id
          });
        }
      }
      $rootScope.treatmentApproachModel = treatModel;

      var settingModel = [];
      // setting
      for (key in $rootScope.setting) {
        if (buyIds.indexOf($rootScope.setting[key].id) >= 0) {
          settingModel.push({
            id: $rootScope.setting[key].id
          });
        }
      }
      $rootScope.settingModel = settingModel;

      var additModel = [];
      // additionalServices
      for (key in $rootScope.additionalServices) {
        if (buyIds.indexOf($rootScope.additionalServices[key].id) >= 0) {
          additModel.push({
            id: $rootScope.additionalServices[key].id
          });
        }
      }
      $rootScope.additionalServicesModel = additModel;

      var paymentModel = [];
      // Payment
      for (key in $rootScope.payment) {
        if (buyIds.indexOf($rootScope.payment[key].id) >= 0) {
          paymentModel.push({
            id: $rootScope.payment[key].id
          });
        }
      }
      $rootScope.paymentModel = paymentModel;

      // byDrug
      var byDrugModel = [];
      for (key in $rootScope.byDrug) {
        if (buyIds.indexOf($rootScope.byDrug[key].id) >= 0) {
          byDrugModel.push({
            id: $rootScope.byDrug[key].id
          });
        }
      }
      $rootScope.byDrugModel = byDrugModel;

      $rootScope.onInit(); // init cart
    }
  };

  $rootScope.centerSelect = function () {
    $rootScope.onInit();
  };
  $rootScope.centerDeSelect = function () {
    $rootScope.onInit();
  };
}
module.exports = ['$injector', '$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$document', 'Status', 'SponsorService', 'localStorageService', '$timeout', ctrl];

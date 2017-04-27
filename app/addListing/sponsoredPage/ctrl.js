function ctrl($log, $scope, $state, UIState, $stateParams, $rootScope, $document, Status, SponsorService, localStorageService) {
  var vm = this;
  $rootScope.activeLink = 'Sponsored Pages';
  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '250px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: true,
    checkBoxes: true
  };

  var sponsorID = $stateParams.id;
  vm.treatmentCentersModel = [];
  vm.sponsoredAdNormalModel = [];
  vm.sponsoredAdStateModel = [];
  vm.sponsoredAdCountyModel = [];
  vm.sponsoredAdCityModel = [];

  vm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };

  var token = localStorageService.get('signupToken');

  vm.submit = function () {
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
    for (key in vm.sponsoredAdNormalModel) {
      id = String(vm.sponsoredAdNormalModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdStateModel) {
      id = String(vm.sponsoredAdStateModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdCountyModel) {
      id = String(vm.sponsoredAdCountyModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdCityModel) {
      id = String(vm.sponsoredAdCityModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    var formData = new FormData();
    var sponsorData = {
      'sponsored_listing_layout_ids': sponsoredListingIds
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }

    SponsorService.editSponsorSignup(formData, centerIds, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
      $rootScope.addListingStepDone = 7;
      $state.go(UIState.ADD_LISTING.BANNER_AD);
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
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
    });
  }

  sponsorList('');

  getSponsorSelect(vm, sponsorID, SponsorService, $rootScope, localStorageService, $log, token);
}
module.exports = ['$log', '$scope', '$state', 'UIState', '$stateParams', '$rootScope', '$document', 'Status', 'SponsorService', 'localStorageService', '$timeout', ctrl];

function getSponsorSelect(vm, sponsorID, SponsorService, $rootScope, localStorageService, $log, token) {
  SponsorService.getSponsoredSelectAddlist(token).then(function (responseSponsor) {
    // generating data for multiselect
    var modifiedAdSelectDataNormal = [];
    var modifiedAdSelectDataState = [];
    var modifiedAdSelectDataCounty = [];
    var modifiedAdSelectDataCity = [];
    var i = 0;
    for (var key in responseSponsor.normal) {
      modifiedAdSelectDataNormal[i] = {
        id: responseSponsor.normal[key].id,
        label: responseSponsor.normal[key].name
      };
      i++;
    }

    i = 0;
    for (key in responseSponsor.state) {
      modifiedAdSelectDataState[i] = {
        id: responseSponsor.state[key].id,
        label: responseSponsor.state[key].name
      };
      i++;
    }

    i = 0;
    for (key in responseSponsor.county) {
      modifiedAdSelectDataCounty[i] = {
        id: responseSponsor.county[key].id,
        label: responseSponsor.county[key].name
      };
      i++;
    }

    i = 0;
    for (key in responseSponsor.city) {
      modifiedAdSelectDataCity[i] = {
        id: responseSponsor.city[key].id,
        label: responseSponsor.city[key].name
      };
      // if (i === 100) {
      //   break;
      // }
      i++;
    }

    // localStorageService.remove('cities');
    // console.log('test' + angular.toJson(modifiedAdSelectDataCity));
    // localStorageService.set('city', '123456');
    // console.log('test444' + localStorageService.get('cities'));
    vm.sponsoredAdNormal = modifiedAdSelectDataNormal;
    vm.sponsoredAdState = modifiedAdSelectDataState;
    vm.sponsoredAdCounty = modifiedAdSelectDataCounty;
    // vm.sponsoredAdCity = modifiedAdSelectDataCity.slice(0, 10);
    vm.sponsoredAdCity = modifiedAdSelectDataCity.slice(0, 1000);
    vm.totalRecords = vm.totalCity;
  }).catch(function (err) {
    vm.error_message = err;
  });
}

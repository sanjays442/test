function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.onInit = function () {
    onInit();
  };

  function onInit() {
    //  localStorageService.remove('addListingSponsoredPage');
    // get values from localStorageService
    if (angular.isDefined(localStorageService.get('addListingSponsoredPage', 'sessionStorage'))) {
      var sponsoredInfo = localStorageService.get('addListingSponsoredPage', 'sessionStorage');
      if (sponsoredInfo !== null) {
        if (angular.isDefined(sponsoredInfo.cityModel) && angular.isDefined(sponsoredInfo.countyModel)) {
          $rootScope.cityModel = sponsoredInfo.cityModel;
          $rootScope.countyModel = sponsoredInfo.countyModel;
          $rootScope.statesSel = sponsoredInfo.statesSel;
          $rootScope.statesDetail = sponsoredInfo.statesDetail;
          //  $rootScope.treatmentCentersValue = sponsoredInfo.centersValue;
          $rootScope.checkedStateModel = sponsoredInfo.checkedStateModel;
        }
        if (sponsoredInfo.checkedStateModel) {
          $rootScope.checkedStateModel = sponsoredInfo.checkedStateModel;
        }
        if (angular.isDefined(sponsoredInfo.centerWise))
          vm.centerWise = sponsoredInfo.centerWise;
      }
    }

    if (angular.isUndefined(vm.centerWise)) {
      vm.centerWise = {};
    }
    if (angular.isUndefined($rootScope.centerWise)) {
      $rootScope.centerWise = {};
    }

    if (angular.isUndefined($rootScope.countyModel) || $rootScope.countyModel === null) {
      console.log('county, city not def');
      return;
    }

    var countyIds = $rootScope.countyModel[$rootScope.activeCenter];
    var cityIds = $rootScope.cityModel[$rootScope.activeCenter];

    // $rootScope.getCartDetails = function (countyIds, cityIds) {
    var cityIdsApi = [];
    var countyIdApi = [];
    var id = '';
    var i = 0;
    for (var key in countyIds) {
      id = String(countyIds[key].id);
      countyIdApi[i] = id;
      i++;
    }
    for (key in cityIds) {
      id = String(cityIds[key].id);
      cityIdsApi[i] = id;
      i++;
    }
    // get signup token
    var token = localStorageService.get('signupToken');

    vm.priceState = 0;
    vm.priceCounty = 0;
    vm.priceCity = 0;
    vm.priceFeatured = 0;
    vm.priceSponsored = 0;
    vm.totalExtra = 0;
    // get price info
    if ($rootScope.sponsorPricingInfo === '') {
      CartDetailService.getSignupPriceInfo(token).then(function (response) {
        $rootScope.sponsorPricingInfo = response;
        vm.priceState = response.price_state;
        vm.priceCounty = response.price_county;
        vm.priceCity = response.price_city;
        vm.priceFeatured = response.price_featured;
        vm.priceSponsored = response.price_sponsored;
        var membershipType = localStorageService.get('membershipType', 'sessionStorage');
        if (membershipType === 'featured') {
          vm.totalExtra = vm.priceFeatured;
          vm.membershipTypeText = 'FEATURED';
        }
        if (membershipType === 'sponsored') {
          vm.totalExtra = vm.priceSponsored;
          vm.membershipTypeText = 'SPONSORED';
        }
        if (angular.isUndefined(vm.totalExtra)) {
          vm.totalExtra = 0;
        }
        CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
          cartInfo(result);
        }).catch(function (err) {
          $log.error(err);
        });
      });
    } else {
      var response = $rootScope.sponsorPricingInfo;
      vm.priceState = response.price_state;
      vm.priceCounty = response.price_county;
      vm.priceCity = response.price_city;
      vm.priceFeatured = response.price_featured;
      vm.priceSponsored = response.price_sponsored;
      var membershipType = localStorageService.get('membershipType', 'sessionStorage');
      if (membershipType === 'featured') {
        vm.totalExtra = vm.priceFeatured;
        vm.membershipTypeText = 'FEATURED';
      }
      if (membershipType === 'sponsored') {
        vm.totalExtra = vm.priceSponsored;
        vm.membershipTypeText = 'SPONSORED';
      }
      if (angular.isUndefined(vm.totalExtra)) {
        vm.totalExtra = 0;
      }
      CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
        cartInfo(result);
      }).catch(function (err) {
        $log.error(err);
      });
    }

    function cartInfo(result) {
      vm.stateTotalCost = 0;
      vm.cityTotalCost = 0;
      vm.countyTotalCost = 0;
      vm.demographicTotal = 0;
      vm.treatmentApproachTotal = 0;
      vm.settingTotal = 0;
      vm.additionalServicesTotal = 0;
      vm.paymentTotal = 0;
      vm.byDrugTotal = 0;
      vm.totalCost = 0;

      var totalCounty = 0;
      var totalStates = 0;
      var states = [];
      var totalItems = 0;

      if (angular.isDefined($rootScope.checkedStateModel) && angular.isDefined($rootScope.checkedStateDetail) && $rootScope.checkedStateModel !== null) {
        states = $rootScope.checkedStateDetail[$rootScope.activeCenter];
      }
      for (key in states) {
        totalStates += vm.priceState;
      }

      for (var k = 0; k < result.counties.length; k++) {
        if (angular.isUndefined(result.counties[k])) {
          continue;
        }
        totalCounty += vm.priceCounty;
        totalItems++;
      }

      var totalCity = 0;
      for (k = 0; k < result.cities.length; k++) {
        if (angular.isUndefined(result.cities[k])) {
          //  console.log('undefined: ' + k);
          continue;
        }
        totalCity += vm.priceCity;
        totalItems++;
      }
      // collecting items data
      $rootScope.counties = result.counties;
      $rootScope.cities = result.cities;

      // getting all states checked
      if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates[$rootScope.activeCenter] === true) {
        states = [];
        // statesDetail = [];
        totalStates = 0;
        var statesData = $rootScope.stateIds;
        for (key in statesData) {
          states[key] = statesData[key];
          totalStates += vm.priceState;
          totalItems++;
        }
      } else if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates[$rootScope.activeCenter] === false) {
        states = [];
        totalStates = 0;
        $rootScope.statesSel = [];
        $rootScope.checkedStateModel[$rootScope.activeCenter] = [];
        $rootScope.checkedStateDetail[$rootScope.activeCenter] = [];
        // reset checkall state
        $rootScope.checkedAllStates[$rootScope.activeCenter] = null;
      }
      $rootScope.statesSel = states; // states

      vm.treatmentCenters = [];
      vm.demographic = [];
      vm.treatmentApproach = [];
      vm.setting = [];
      vm.additionalServices = [];
      vm.payment = [];
      vm.byDrug = [];

      // treatment centers
      var totalCenters = 0;
      for (key in $rootScope.centerSelected) {
        for (val in $rootScope.treatmentCentersValue) {
          if ($rootScope.centerSelected[key].id === $rootScope.treatmentCentersValue[val].id) {
            vm.treatmentCenters[key] = {
              id: $rootScope.centerSelected[key].id,
              label: $rootScope.treatmentCentersValue[val].label
            };
          }
        }
        totalCenters++;
      }
      // continue from here add totalItems++ to other demographich then add it to centr wise to chek how many item selected in a cart
      // Demographic
      for (key in $rootScope.demographicModel[$rootScope.activeCenter]) {
        for (var val in $rootScope.demographic) {
          if ($rootScope.demographic[val].id === $rootScope.demographicModel[$rootScope.activeCenter][key].id) {
            var label = $rootScope.demographic[val].label;
            // var price = $rootScope.demographic[val].price;
            var price = vm.priceSponsored;
            break;
          }
        }
        vm.demographic[key] = {
          'id': $rootScope.demographicModel[$rootScope.activeCenter][key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.demographicTotal += price;
        totalItems++;
      }

      // Treatment Approach
      for (key in $rootScope.treatmentApproachModel[$rootScope.activeCenter]) {
        for (val in $rootScope.treatmentApproach) {
          if ($rootScope.treatmentApproach[val].id === $rootScope.treatmentApproachModel[$rootScope.activeCenter][key].id) {
            label = $rootScope.treatmentApproach[val].label;
            // price = $rootScope.treatmentApproach[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.treatmentApproach[key] = {
          'id': $rootScope.treatmentApproachModel[$rootScope.activeCenter][key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.treatmentApproachTotal += price;
        totalItems++;
      }

      // setting
      for (key in $rootScope.settingModel[$rootScope.activeCenter]) {
        for (val in $rootScope.setting) {
          if ($rootScope.setting[val].id === $rootScope.settingModel[$rootScope.activeCenter][key].id) {
            label = $rootScope.setting[val].label;
            // price = $rootScope.setting[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.setting[key] = {
          'id': $rootScope.settingModel[$rootScope.activeCenter][key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.settingTotal += price;
        totalItems++;
      }

      // Additional services
      for (key in $rootScope.additionalServicesModel[$rootScope.activeCenter]) {
        for (val in $rootScope.additionalServices) {
          if ($rootScope.additionalServices[val].id === $rootScope.additionalServicesModel[$rootScope.activeCenter][key].id) {
            label = $rootScope.additionalServices[val].label;
            // price = $rootScope.additionalServices[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.additionalServices[key] = {
          'id': $rootScope.additionalServicesModel[$rootScope.activeCenter][key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.additionalServicesTotal += price;
        totalItems++;
      }

      // Payment
      for (key in $rootScope.paymentModel[$rootScope.activeCenter]) {
        for (val in $rootScope.payment) {
          if ($rootScope.payment[val].id === $rootScope.paymentModel[$rootScope.activeCenter][key].id) {
            label = $rootScope.payment[val].label;
            // price = $rootScope.payment[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.payment[key] = {
          'id': $rootScope.paymentModel[$rootScope.activeCenter][key].id,
          'label': label,
          price: vm.priceSponsored
          // 'price': price
        };
        vm.paymentTotal += price;
        totalItems++;
      }
      // Bydrug
      for (key in $rootScope.byDrugModel[$rootScope.activeCenter]) {
        for (val in $rootScope.byDrug) {
          if ($rootScope.byDrug[val].id === $rootScope.byDrugModel[$rootScope.activeCenter][key].id) {
            label = $rootScope.byDrug[val].label;
            // price = $rootScope.byDrug[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.byDrug[key] = {
          'id': $rootScope.byDrugModel[$rootScope.activeCenter][key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.byDrugTotal += price;
        totalItems++;
      }
      var totalExtra = vm.totalExtra * totalCenters;
      vm.totalExtra = totalExtra;
      vm.stateTotalCost = totalStates;
      vm.cityTotalCost = totalCity;
      vm.countyTotalCost = totalCounty;

      var total = vm.countyTotalCost + vm.cityTotalCost + vm.stateTotalCost + vm.demographicTotal + vm.treatmentApproachTotal + vm.settingTotal + vm.additionalServicesTotal + vm.paymentTotal + vm.byDrugTotal;

      vm.totalCost = total;
      // saving to centerwise
      var centerwise = {
        'demographic': vm.demographic,
        'demographicTotal': vm.demographicTotal,
        'treatmentApproach': vm.treatmentApproach,
        'treatmentApproachTotal': vm.treatmentApproachTotal,
        'setting': vm.setting,
        'settingTotal': vm.settingTotal,
        'additionalServices': vm.additionalServices,
        'additionalServicesTotal': vm.additionalServicesTotal,
        'payment': vm.payment,
        'paymentTotal': vm.paymentTotal,
        'byDrug': vm.byDrug,
        'byDrugTotal': vm.byDrugTotal,
        'statesSel': $rootScope.statesSel,
        'stateTotalCost': vm.stateTotalCost,
        'cities': $rootScope.cities,
        'cityTotalCost': vm.cityTotalCost,
        'counties': $rootScope.counties,
        'countyTotalCost': vm.countyTotalCost,
        'totalCost': total,
        'totalItems': totalItems
      };

      if ($rootScope.activeCenter !== false && $rootScope.activeCenter !== '') {
        vm.centerWise[$rootScope.activeCenter] = centerwise;
        $rootScope.centerWise[$rootScope.activeCenter] = centerwise;
      }
      var grandTotal = 0;

      for (var key in vm.centerWise) {
        for (var cen in $rootScope.centerSelected) {
          if ($rootScope.centerSelected[cen].id.toString() === key) {
            grandTotal += vm.centerWise[key].totalCost;
          }
        }
      }
      $rootScope.total = grandTotal;
    }
  }

  vm.deleteCartItem = function (key, centerId, item) {

    if ($rootScope.activeCenter !== centerId) {
      return;
    }
    // treatment centers
    var totalCenters = 0;
    for (var value in $rootScope.centerSelected) {
      for (var val in $rootScope.treatmentCentersValue) {
        if ($rootScope.centerSelected[value].id === $rootScope.treatmentCentersValue[val].id) {
          vm.treatmentCenters[value] = {
            id: $rootScope.centerSelected[value].id,
            label: $rootScope.treatmentCentersValue[value].label
          };
        }
      }
      totalCenters++;
    }
    if (item === 'state') {
      // vm.totalCost -= vm.priceState * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceState;
      vm.centerWise[centerId].stateTotalCost -= vm.priceState;
      // vm.stateTotalCost -= vm.priceState * totalCenters;
      //  $rootScope.statesSel.splice(key, 1);

      // $rootScope.statesDetail.splice(key, 1);
      $rootScope.checkedStateModel[centerId].splice(key, 1);
      $rootScope.checkedStateDetail[centerId].splice(key, 1);
      vm.centerWise[centerId].statesSel.splice(key, 1);
    } else if (item === 'county') {
      // vm.totalCost -= vm.priceCounty * totalCenters;
      //   vm.countyTotalCost -= vm.priceCounty * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceCounty;
      vm.centerWise[centerId].countyTotalCost -= vm.priceCounty;
      var id = $rootScope.counties[key].id;
      for (var index in $rootScope.countyModel[$rootScope.activeCenter]) {
        if ($rootScope.countyModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.countyModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      // $rootScope.counties.splice(key, 1);
      vm.centerWise[centerId].counties.splice(key, 1);
    } else if (item === 'city') {
      // vm.totalCost -= vm.priceCity * totalCenters;
      // vm.cityTotalCost -= vm.priceCity * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceCity;
      vm.centerWise[centerId].cityTotalCost -= vm.priceCity;
      id = $rootScope.cities[key].id;
      for (index in $rootScope.cityModel[$rootScope.activeCenter]) {
        if ($rootScope.cityModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.cityModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      //$rootScope.cities.splice(key, 1);
      vm.centerWise[centerId].cities.splice(key, 1);
    } else if (item === 'demographic') {
      // vm.totalCost -= $rootScope.demographic[key].price;
      // vm.demographicTotal -= $rootScope.demographic[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.demographicTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].demographicTotal -= vm.priceSponsored;
      id = vm.demographic[key].id;
      for (index in $rootScope.demographicModel[$rootScope.activeCenter]) {
        if ($rootScope.demographicModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.demographicModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      //  vm.demographic.splice(key, 1);
      vm.centerWise[centerId].demographic.splice(key, 1);

    } else if (item === 'treatmentApproach') {
      // vm.totalCost -= $rootScope.treatmentApproach[key].price;
      // vm.treatmentApproachTotal -= $rootScope.treatmentApproach[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.treatmentApproachTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].treatmentApproachTotal -= vm.priceSponsored;
      id = vm.treatmentApproach[key].id;
      for (index in $rootScope.treatmentApproachModel[$rootScope.activeCenter]) {
        if ($rootScope.treatmentApproachModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.treatmentApproachModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      //vm.treatmentApproach.splice(key, 1);
      vm.centerWise[centerId].treatmentApproach.splice(key, 1);
    } else if (item === 'setting') {
      // vm.totalCost -= $rootScope.setting[key].price;
      // vm.settingTotal -= $rootScope.setting[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.settingTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].settingTotal -= vm.priceSponsored;

      id = vm.setting[key].id;
      for (index in $rootScope.settingModel[$rootScope.activeCenter]) {
        if ($rootScope.settingModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.settingModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      //vm.setting.splice(key, 1);
      vm.centerWise[centerId].setting.splice(key, 1);
    } else if (item === 'additionalServices') {
      // vm.totalCost -= $rootScope.additionalServices[key].price;
      // vm.additionalServicesTotal -= $rootScope.additionalServices[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.additionalServicesTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].additionalServicesTotal -= vm.priceSponsored;
      id = vm.additionalServices[key].id;
      for (index in $rootScope.additionalServicesModel[$rootScope.activeCenter]) {
        if ($rootScope.additionalServicesModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.additionalServicesModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      //  vm.additionalServices.splice(key, 1);
      vm.centerWise[centerId].additionalServices.splice(key, 1);
    } else if (item === 'payment') {
      // vm.totalCost -= $rootScope.payment[key].price;
      // vm.paymentTotal -= $rootScope.payment[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.paymentTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].paymentTotal -= vm.priceSponsored;
      id = vm.payment[key].id;
      for (index in $rootScope.paymentModel[$rootScope.activeCenter]) {
        if ($rootScope.paymentModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.paymentModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      // vm.payment.splice(key, 1);
      vm.centerWise[centerId].payment.splice(key, 1);
    } else if (item === 'byDrug') {
      // vm.totalCost -= $rootScope.byDrug[key].price;
      // vm.byDrugTotal -= $rootScope.byDrug[key].price;
      // vm.totalCost -= vm.priceSponsored * totalCenters;
      // vm.byDrugTotal -= vm.priceSponsored * totalCenters;
      vm.centerWise[centerId].totalCost -= vm.priceSponsored;
      vm.centerWise[centerId].byDrugTotal -= vm.priceSponsored;
      id = vm.byDrug[key].id;
      for (index in $rootScope.byDrugModel[$rootScope.activeCenter]) {
        if ($rootScope.byDrugModel[$rootScope.activeCenter][index].id === id) {
          $rootScope.byDrugModel[$rootScope.activeCenter].splice(index, 1);
          break;
        }
      }
      vm.centerWise[centerId].byDrug.splice(key, 1);
    }

    // updating total items
    if (angular.isDefined($rootScope.centerWise[centerId])) {
      $rootScope.centerWise[centerId].totalItems--;
      //vm.centerWise[centerId].totalItems--;
    }

    var grandTotal = 0;
    for (var key in vm.centerWise) {
      for (var cen in $rootScope.centerSelected) {
        if ($rootScope.centerSelected[cen].id.toString() === key) {
          grandTotal += vm.centerWise[key].totalCost;
        }
      }
    }
    $rootScope.total = grandTotal;

    // saving to localStorageService
    var sponsoredPage = {
      'cityModel': $rootScope.cityModel,
      'countyModel': $rootScope.countyModel,
      'treatmentCenter': $rootScope.treatmentCentersModel,
      'statesSel': $rootScope.statesSel,
      // 'statesDetail': $rootScope.statesDetail,
      'demographic': $rootScope.demographicModel,
      'treatmentApproach': $rootScope.treatmentApproachModel,
      'setting': $rootScope.settingModel,
      'additionalServices': $rootScope.additionalServicesModel,
      'payment': $rootScope.paymentModel,
      'byDrug': $rootScope.byDrugModel,
      'checkedAllStates': $rootScope.checkedAllStates,
      'checkedStateModel': $rootScope.checkedStateModel,
      'checkedStateDetail': $rootScope.checkedStateDetail,
      'centerWise': vm.centerWise
    };
    if (localStorageService.isSupported) {
      localStorageService.set('addListingSponsoredPage', sponsoredPage, 'sessionStorage');
    }
  };
  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];

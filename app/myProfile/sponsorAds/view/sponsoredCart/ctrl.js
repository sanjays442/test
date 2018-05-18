function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, CartDetailService) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.onInit = function () {
    onInit();
  };

  function onInit() {
    // get values from localStorageService
    // if (angular.isDefined(localStorageService.get('myprofileSponsoredPage', 'sessionStorage'))) {
    //   var sponsoredInfo = localStorageService.get('myprofileSponsoredPage', 'sessionStorage');
    //   if (sponsoredInfo !== null) {
    //     $rootScope.cityModel = sponsoredInfo.cityModel;
    //     $rootScope.countyModel = sponsoredInfo.countyModel;
    //     $rootScope.statesSel = sponsoredInfo.statesSel;
    //     $rootScope.statesDetail = sponsoredInfo.statesDetail;
    //     $rootScope.treatmentCentersValue = sponsoredInfo.centersValue;
    //     if (sponsoredInfo.checkedStateModel) {
    //       $rootScope.checkedStateModel = sponsoredInfo.checkedStateModel;
    //     }
    //     // if (sponsoredInfo.treatmentCenter) {
    //     //   $rootScope.centerSelected = sponsoredInfo.treatmentCenter;
    //     // }
    //   }
    // }

    var countyIds = $rootScope.countyModel;
    var cityIds = $rootScope.cityModel;
    var cityIdsApi = [];
    var countyIdApi = [];
    var id = '';
    var i = 0;
    for (var key in countyIds) {
      id = String(countyIds[key].id);
      countyIdApi[i] = id;
      i++;
    }
    i = 0;
    for (key in cityIds) {
      id = String(cityIds[key].id);
      cityIdsApi[i] = id;
      i++;
    }

    if (angular.isDefined($rootScope.preselectedCities) && $rootScope.preselectedCities.length > 0) {
      for (var city in $rootScope.preselectedCities) {
        var cityId = String($rootScope.preselectedCities[city]);
        if (cityIdsApi.indexOf(cityId) === -1) {
          cityIdsApi.push(cityId);
        }
      }
    }

    if (angular.isDefined($rootScope.preselectedCounties) && $rootScope.preselectedCounties.length > 0) {
      for (var county in $rootScope.preselectedCounties) {
        var countyId = String($rootScope.preselectedCounties[county]);
        if (countyIdApi.indexOf(countyId) === -1) {
          countyIdApi.push(countyId);
        }
      }
    }
    vm.priceState = 0;
    vm.priceCounty = 0;
    vm.priceCity = 0;

    // get price info
    CartDetailService.getPriceInfo().then(function (response) {
      vm.priceState = response.price_state;
      vm.priceCounty = response.price_county;
      vm.priceCity = response.price_city;
      vm.priceSponsored = response.price_sponsored;

      CartDetailService.getCartInfo(countyIdApi, cityIdsApi).then(function (result) {
        cartInfo(result);
      }).catch(function (err) {
        $log.error(err);
      });
    });

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

      if (angular.isDefined($rootScope.checkedStateModel) && angular.isDefined($rootScope.checkedStateDetail) && $rootScope.checkedStateModel !== null) {
        states = $rootScope.checkedStateDetail;
      }
      for (key in states) {
        totalStates += vm.priceState;
      }

      for (var k = 0; k < result.counties.length; k++) {
        if (angular.isUndefined(result.counties[k])) {
          continue;
        }
        totalCounty += vm.priceCounty;
      }

      var totalCity = 0;
      for (k = 0; k < result.cities.length; k++) {
        if (angular.isUndefined(result.cities[k])) {
          continue;
        }
        totalCity += vm.priceCity;
      }
      // collecting items data
      $rootScope.counties = result.counties;
      $rootScope.cities = result.cities;

      // getting all states checked
      if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates === true) {
        states = [];
        totalStates = 0;
        var statesData = $rootScope.stateIds;
        for (key in statesData) {
          states[key] = statesData[key];
          totalStates += vm.priceState;
        }
      } else if (angular.isDefined($rootScope.checkedAllStates) && $rootScope.checkedAllStates === false) {
        states = [];
        totalStates = 0;
        $rootScope.statesSel = [];
        $rootScope.checkedStateModel = [];
        $rootScope.checkedStateDetail = [];
        // reset checkall state
        $rootScope.checkedAllStates = null;
      }

      $rootScope.statesSel = states; // states

      vm.treatmentCenters = [];
      vm.demographic = [];
      vm.treatmentApproach = [];
      vm.setting = [];
      vm.additionalServices = [];
      vm.payment = [];
      vm.byDrug = [];

      // Demographic
      for (key in $rootScope.demographicModel) {
        for (var val in $rootScope.demographic) {
          if ($rootScope.demographic[val].id === $rootScope.demographicModel[key].id) {
            var label = $rootScope.demographic[val].label;
            //  var price = $rootScope.demographic[val].price;
            var price = vm.priceSponsored;
            break;
          }
        }
        vm.demographic[key] = {
          'id': $rootScope.demographicModel[key].id,
          'label': label,
          //  'price': price
          'price': vm.priceSponsored
        };
        vm.demographicTotal += price;
      }
      // Treatment Approach
      for (key in $rootScope.treatmentApproachModel) {
        for (val in $rootScope.treatmentApproach) {
          if ($rootScope.treatmentApproach[val].id === $rootScope.treatmentApproachModel[key].id) {
            label = $rootScope.treatmentApproach[val].label;
            // price = $rootScope.treatmentApproach[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.treatmentApproach[key] = {
          'id': $rootScope.treatmentApproachModel[key].id,
          'label': label,
          // 'price': price
          'price': price
        };
        vm.treatmentApproachTotal += price;
      }
      // setting
      for (key in $rootScope.settingModel) {
        for (val in $rootScope.setting) {
          if ($rootScope.setting[val].id === $rootScope.settingModel[key].id) {
            label = $rootScope.setting[val].label;
            // price = $rootScope.setting[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.setting[key] = {
          'id': $rootScope.settingModel[key].id,
          'label': label,
          // 'price': price
          'price': vm.priceSponsored
        };
        vm.settingTotal += price;
      }
      // Additional services
      for (key in $rootScope.additionalServicesModel) {
        for (val in $rootScope.additionalServices) {
          if ($rootScope.additionalServices[val].id === $rootScope.additionalServicesModel[key].id) {
            label = $rootScope.additionalServices[val].label;
            // price = $rootScope.additionalServices[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.additionalServices[key] = {
          'id': $rootScope.additionalServicesModel[key].id,
          'label': label,
          'price': price
          // 'price': price
        };
        vm.additionalServicesTotal += price;
      }
      // Payment
      for (key in $rootScope.paymentModel) {
        for (val in $rootScope.payment) {
          if ($rootScope.payment[val].id === $rootScope.paymentModel[key].id) {
            label = $rootScope.payment[val].label;
            // price = $rootScope.payment[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.payment[key] = {
          'id': $rootScope.paymentModel[key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.paymentTotal += price;
      }
      // Bydrug
      for (key in $rootScope.byDrugModel) {
        for (val in $rootScope.byDrug) {
          if ($rootScope.byDrug[val].id === $rootScope.byDrugModel[key].id) {
            label = $rootScope.byDrug[val].label;
            // price = $rootScope.byDrug[val].price;
            price = vm.priceSponsored;
            break;
          }
        }
        vm.byDrug[key] = {
          'id': $rootScope.byDrugModel[key].id,
          'label': label,
          'price': vm.priceSponsored
          // 'price': price
        };
        vm.byDrugTotal += price;
      }
      // treatment centers
      vm.treatmentCenters = $rootScope.centerSelected;
      // for (key in $rootScope.centerSelected) {
      //   for (val in $rootScope.treatmentCentersValue) {
      //     if ($rootScope.centerSelected[key].id === $rootScope.treatmentCentersValue[val].id) {
      //       vm.treatmentCenters[key] = {
      //         id: $rootScope.centerSelected[key].id,
      //         label: $rootScope.treatmentCentersValue[val].label
      //       };
      //     }
      //   }
      // }
      vm.stateTotalCost = totalStates;
      vm.cityTotalCost = totalCity;
      vm.countyTotalCost = totalCounty;
      var total = totalCounty + totalCity + totalStates + vm.demographicTotal + vm.treatmentApproachTotal + vm.settingTotal + vm.additionalServicesTotal + vm.paymentTotal + vm.byDrugTotal;
      vm.totalCost = total;
      $rootScope.total = total;
    }
  }

  vm.deleteCartItem = function (key, item) {
    if (item === 'state') {
      vm.totalCost -= vm.priceState;
      vm.stateTotalCost -= vm.priceState;
      $rootScope.statesSel.splice(key, 1);
      $rootScope.checkedStateModel.splice(key, 1);
      $rootScope.checkedStateDetail.splice(key, 1);
    } else if (item === 'county') {
      vm.totalCost -= vm.priceCounty;
      vm.countyTotalCost -= vm.priceCounty;
      var id = $rootScope.counties[key].id;
      for (var index in $rootScope.countyModel) {
        if ($rootScope.countyModel[index].id === id) {
          $rootScope.countyModel.splice(index, 1);
          break;
        }
      }
      $rootScope.counties.splice(key, 1);
    } else if (item === 'city') {
      vm.totalCost -= vm.priceCity;
      vm.cityTotalCost -= vm.priceCity;
      id = $rootScope.cities[key].id;
      for (index in $rootScope.cityModel) {
        if ($rootScope.cityModel[index].id === id) {
          $rootScope.cityModel.splice(index, 1);
          break;
        }
      }
      $rootScope.cities.splice(key, 1);
    } else if (item === 'demographic') {
      // vm.totalCost -= $rootScope.demographic[key].price;
      // vm.demographicTotal -= $rootScope.demographic[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.demographicTotal -= vm.priceSponsored;
      id = vm.demographic[key].id;
      for (index in $rootScope.demographicModel) {
        if ($rootScope.demographicModel[index].id === id) {
          $rootScope.demographicModel.splice(index, 1);
          break;
        }
      }
      vm.demographic.splice(key, 1);
    } else if (item === 'treatmentApproach') {
      // vm.totalCost -= $rootScope.treatmentApproach[key].price;
      // vm.treatmentApproachTotal -= $rootScope.treatmentApproach[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.treatmentApproachTotal -= vm.priceSponsored;
      id = vm.treatmentApproach[key].id;
      for (index in $rootScope.treatmentApproachModel) {
        if ($rootScope.treatmentApproachModel[index].id === id) {
          $rootScope.treatmentApproachModel.splice(index, 1);
          break;
        }
      }
      vm.treatmentApproach.splice(key, 1);
    } else if (item === 'setting') {
      // vm.totalCost -= $rootScope.setting[key].price;
      // vm.settingTotal -= $rootScope.setting[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.settingTotal -= vm.priceSponsored;
      id = vm.setting[key].id;
      for (index in $rootScope.settingModel) {
        if ($rootScope.settingModel[index].id === id) {
          $rootScope.settingModel.splice(index, 1);
          break;
        }
      }
      vm.setting.splice(key, 1);
    } else if (item === 'additionalServices') {
      // vm.totalCost -= $rootScope.additionalServices[key].price;
      // vm.additionalServicesTotal -= $rootScope.additionalServices[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.additionalServicesTotal -= vm.priceSponsored;
      id = vm.additionalServices[key].id;
      for (index in $rootScope.additionalServicesModel) {
        if ($rootScope.additionalServicesModel[index].id === id) {
          $rootScope.additionalServicesModel.splice(index, 1);
          break;
        }
      }
      vm.additionalServices.splice(key, 1);
    } else if (item === 'payment') {
      // vm.totalCost -= $rootScope.payment[key].price;
      // vm.paymentTotal -= $rootScope.payment[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.paymentTotal -= vm.priceSponsored;
      id = vm.payment[key].id;
      for (index in $rootScope.paymentModel) {
        if ($rootScope.paymentModel[index].id === id) {
          $rootScope.paymentModel.splice(index, 1);
          break;
        }
      }
      vm.payment.splice(key, 1);
    } else if (item === 'byDrug') {
      // vm.totalCost -= $rootScope.byDrug[key].price;
      // vm.byDrugTotal -= $rootScope.byDrug[key].price;
      vm.totalCost -= vm.priceSponsored;
      vm.byDrugTotal -= vm.priceSponsored;
      id = vm.byDrug[key].id;
      for (index in $rootScope.byDrugModel) {
        if ($rootScope.byDrugModel[index].id === id) {
          $rootScope.byDrugModel.splice(index, 1);
          break;
        }
      }
      vm.byDrug.splice(key, 1);
    }

    $rootScope.total = vm.totalCost;
  };
  vm.continueShop = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };
}
module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'CartDetailService', ctrl];

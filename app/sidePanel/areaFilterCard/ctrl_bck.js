module.exports = ['$log', '$scope', '$state', 'UIState', ctrl];

function ctrl($log, $scope, $state, UIState) {
  var vm = this;
  vm.$onInit = onInit;
  vm.goToState = goToState;
  vm.goToCities = goToCities;
  vm.goToCounties = goToCounties;

  var uiStatesToDiplsay = [
    UIState.SPONSOR_HOME.STATE,
    UIState.SPONSOR_HOME.COUNTY,
    UIState.SPONSOR_HOME.CITY,
    UIState.SPONSOR_HOME.COUNTIES,
    UIState.SPONSOR_HOME.CITIES_OF_STATE,
    UIState.SPONSOR_HOME.CITIES_OF_COUNTY
  ];
  vm.fullName = $state.params.slug;
  // service.queryStateName($state.params.stateName).then(function (result) {
  //   vm.fullName = result.state;
  // }).catch(function (err) {
  //   $log.error(err);
  // });

  $scope.$on('$stateChangeStart', function (event, toState, toParams) {
    _update(toState.name, toParams);
  });

  function onInit() {
    _update($state.current.name, $state.params);
  }

  function _update(uiState, params) {
    if (uiStatesToDiplsay.indexOf(uiState) === -1) {
      vm.display = false;
      return;
    }
    vm.display = true;
    if (angular.isUndefined(params.slug)) {
      vm.stateName = params.stateName;
    } else {
      vm.stateName = params.slug;
    }
    // vm.stateName = params.slug;
    // if (angular.isUndefined(vm.stateName)) {
    //   var href = location.href;
    // //  vm.stateName = href.match(/([^\/]*)\/*$/)[1];
    // }
    vm.countyName = params.countyName;
    if (uiState === UIState.SPONSOR_HOME.STATE) {
      vm.stateLinkClass = 'area-filter-link-disabled';
      return;
    }
    vm.stateLinkClass = 'area-filter-link-normal';
  }

  function goToState() {
    // already at the state sponsor listing page
    if ($state.is(UIState.SPONSOR_HOME.STATE)) {
      return;
    }
    // go to state sponsor listing page
    $state.go(UIState.SPONSOR_HOME.STATE, {
      stateName: vm.stateName
    });
  }

  // click to view All Cities of a county
  function goToCities() {
    // if (vm.countyName && vm.stateName) {
    //   $state.go(UIState.SPONSOR_HOME.CITIES_OF_COUNTY, {
    //     stateName: vm.stateName,
    //     countyName: vm.countyName
    //   });
    //   return;
    // }
    if (vm.stateName) {
      $state.go(UIState.SPONSOR_HOME.CITIES_OF_STATE, {
        stateName: vm.stateName
      });
    }
  }

  function goToCounties() {
    $state.go(UIState.SPONSOR_HOME.COUNTIES, {
      // stateName: vm.stateName
      stateName: vm.stateName
    });
  }
}

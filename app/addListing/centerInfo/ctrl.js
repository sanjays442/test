module.exports = ['$rootScope', '$log', '$state', 'UIState', 'MapService', ctrl];

function ctrl($rootScope, $log, $state, UIState, mapService) {
  // todo
  // var vm = this;
  var vm = $rootScope; // this;
  var lm = this;
  $rootScope.activeLink = 'Treatment Center';
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.PAID_MEMBER);
  };
  if (angular.isUndefined(vm.multiselectModelCategories)) {
    vm.multiselectModelCategories = [];
  }
  lm.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    required: true
  };

  lm.addListingCategories = [
    {
      'label': 'Inpatient',
      'id': '1'
    },
    {
      'label': 'Outpatient',
      'id': '2'
    },
    {
      'label': 'Sober Living',
      'id': '3'
    },
    {
      'label': 'Adolescent',
      'id': '4'
    }
  ];

  vm.analyze = function () {};
  mapService.getStates().then(function (response) {
    vm.states = response;
  }).catch(function (err) {
    vm.error_message = err;
  });

  vm.getCities = function () {
    var state = vm.state;
    mapService.getCitiesByState(state).then(function (response) {
      vm.cities = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  };

  lm.GoStep5 = function () {
    // saving process is done by saveStep4 rootscope function which is handled in addListing main controller from stateChangeStart
    // this method use to prevent recursing, and add next button feature to top navigation links
    $rootScope.addListingStepDone = 4;
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
  };

  if ($rootScope.centerReset === 1) {
    vm.center_name = null;
    vm.description = null;
    vm.center_web_link = null;
    vm.listing_image = null;
    vm.address_line_1 = null;
    vm.city = null;
    vm.pincode = null;
    vm.state = null;
    vm.intakephone = null;
    vm.intakeemail = null;
    vm.country = null;
    vm.multiselectModelCategories = [];
  }

  vm.saveStep4 = function () {
    var categoryName = [];
    for (var key in lm.multiselectModelCategories) {
      var categories = String(lm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    $rootScope.centerInfo = {
      'category_id': categoryName,
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'address_line_1': vm.address_line_1,
      'city': vm.city,
      'country': vm.country,
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.intakephone,
      'email': vm.intakeemail,
      'featured': false,
      'listing_type': 'free'
    };
    // $log.info('data:' + $rootScope.centerInfo);
    $rootScope.addListingStepDone = 4;
  };
}

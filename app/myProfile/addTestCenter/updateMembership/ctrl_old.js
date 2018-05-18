module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'TreatmentCenterService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status) {
  var vm = this;
  var rm = $rootScope;
  // var token = localStorageService.get('signupToken');
  vm.currentMembership = '';
  var spn = localStorageService.get('membershipType');
  if (spn === 'paid' || spn === 'featured') {
    vm.currentMembership = spn;
  }
  vm.goHome = function () {
    $rootScope.addCenterInitialize = 0; // show left panel navigations
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };

  vm.sponser = function () {
    if (spn === null) {
      localStorageService.set('membershipType', 'skipped', 'sessionStorage');
    }
    $state.go(UIState.MY_PROFILE.SPONSER);
  };
  vm.sponsored = function () {
    setMembershipType('sponsored');
    // localStorageService.set('membershipType', 'sponsored', 'sessionStorage');
    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
    //  $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  vm.featured = function () {
    // localStorageService.set('membershipType', 'featured', 'sessionStorage');
    setMembershipType('featured');

    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
    //  $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };

  function setMembershipType(type) {
    if (type === 'sponsored') {
      var membershipName = 'Gold';
    } else if (type === 'featured') {
      membershipName = 'Platinum';
    }

    var formData = new FormData();
    var membership = {
      'package': type
    };
    for (var key in membership) {
      formData.append(key, membership[key]);
    }
    var curCent = localStorageService.get('current_center');
    if (curCent === null) {
      $log.info('couldnot get center info...');
      return;
    }
    service.upgradeMembership(formData, curCent[0].id).then(function () {
      // saving membership details for further step
      membership = {
        'package': type,
        'package_name': membershipName,
        'cost': 5
      };
      localStorageService.set('membershipType', type, 'sessionStorage');
      localStorageService.set('membership', membership);
      rm.$emit(Status.SUCCEEDED, 'Updated');
      $state.go(UIState.MY_PROFILE.SPONSER);
    }).catch(function (err) {
      $log.info(err);
      if (angular.isDefined(err.data.error)) {
        rm.$emit(Status.FAILED, err.data.error);
      }
      // for paid parameter
      if (angular.isDefined(err.data)) {
        rm.$emit(Status.FAILED, err.data.success);
      }
    });
  }

  vm.goBack = function () {
    $state.go(UIState.MY_PROFILE.OPTIONAL_FIELDS);
  };
}

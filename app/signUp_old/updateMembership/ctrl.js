module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'SignUpService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status) {
  var vm = this;
  var rm = $rootScope;
  var token = localStorageService.get('signupToken');
  vm.currentMembership = '';
  var spn = localStorageService.get('membershipType');
  if (spn === 'sponsored' || spn === 'featured') {
    vm.currentMembership = spn;
  }

  vm.sponser = function () {
    if (spn === null) {
      localStorageService.set('membershipType', 'skipped', 'sessionStorage');
    }
    $state.go(UIState.SIGN_UP.SPONSER);
  };
  vm.sponsored = function () {
    localStorageService.set('membershipType', 'sponsored', 'sessionStorage');
    setMembershipType('sponsored');

    // $state.go(UIState.ADD_LISTING.CENTER_INFO);
    //  $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
  };
  vm.featured = function () {
    localStorageService.set('membershipType', 'featured', 'sessionStorage');
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
    service.upgradeMembership(formData, token).then(function () {
      // saving membership details for further step
      membership = {
        'package': type,
        'package_name': membershipName,
        'cost': 5
      };
      localStorageService.set('membership', membership);
      rm.$emit(Status.SUCCEEDED, 'Updated');
      $state.go(UIState.SIGN_UP.SPONSER);
    }).catch(function (err) {
      $log.info(err);
      rm.$emit(Status.FAILED, err.data.error);
    });
  }
}

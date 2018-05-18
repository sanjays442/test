module.exports = ['$location', '$anchorScroll', '$timeout', '$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'SignUpService', 'Status', ctrl];

function ctrl($location, $anchorScroll, $timeout, $injector, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status) {
  var vm = this;
  var rm = $rootScope;
  var token = localStorageService.get('signupToken');

  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };

  function runProgress(startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  vm.setProgressValues(45, 60);
  // END: progress values

  vm.currentMembership = '';
  var spn = localStorageService.get('membershipType', 'sessionStorage');
  if (spn === 'paid' || spn === 'featured' || spn === 'sponsored') {
    vm.currentMembership = spn;
  }
  vm.anotherTestcenter = function () {
    $state.go(UIState.SIGN_UP.SIGNUP_CENTER_DONE);
  };

  vm.selectMemebership = function (mem) {
    vm.currentMembership = mem;
    if(mem===false){
      vm.currentMembership = '';
    }
  //  $state.go(UIState.SIGN_UP.SPONSER);
    // focus on next button
    // vm.gotoAnchor(420, 'selection-user-focus');
    shakeme();
  };
  vm.sponsored = function () {
    setMembershipType('sponsored');
    // localStorageService.set('membershipType', 'sponsored', 'sessionStorage');
  };
  vm.featured = function () {
    // localStorageService.set('membershipType', 'featured', 'sessionStorage');
    setMembershipType('featured');
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
    rm.$emit(Status.PROCESSING, '');
    vm.processing = 1;
    service.upgradeMembership(formData, curCent[0].id, token).then(function () {
      rm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // saving membership details for further step
      membership = {
        'package': type,
        'package_name': membershipName,
        'cost': 5
      };
      localStorageService.set('membershipType', type, 'sessionStorage');
      localStorageService.set('membership', membership);

      var mems = localStorageService.get('totalMemberships', 'sessionStorage');
      if (angular.isDefined(mems)) {
        if (mems.indexOf(membershipName) === -1) {
          mems.push(membershipName);
        }
      } else {
        mems = [membershipName];
      }
      localStorageService.set('totalMemberships', mems, 'sessionStorage');
      vm.currentMembership = membership.package;
      // rm.$emit(Status.SUCCEEDED, 'Updated');
      vm.currentMembership = type;
      $state.go(UIState.SIGN_UP.SPONSER);
    }).catch(function (err) {
      rm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
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
    $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
  };

  function shakeme() {
    angular.element('.selection-user-focus').addClass('shake');
    $timeout(function () {
      angular.element('.selection-user-focus').removeClass('shake');
    }, 500);
  }
  vm.gotoAnchor = function (offset, anchor) {
    $anchorScroll.yOffset = offset;
    var old = $location.hash();
    $location.hash(anchor);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  };
}

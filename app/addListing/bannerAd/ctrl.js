function ctrl($log, $rootScope, Status, $window, localStorageService, $state, UIState, AdvertisementService) {
  var vm = this;
  $rootScope.activeLink = 'Banner Ads';
  // initializing form data
  vm.name = '';
  //  vm.content = '';
  vm.err_type = 1;
  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };

  vm.submit = function () {
    // validating file type
    if (vm.content) {
      var imageType = String(vm.content.type);
      if (imageType.includes('image/') === false) {
        vm.err_type = 1;
        return;
      }
      vm.err_type = 0;
    } else {
      return;
    }

    if (angular.isDefined(vm.center_web_link)) {
      var link = vm.center_web_link;
    } else {
      link = '';
    }
    var formData = new FormData();
    var bannerData = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': link
    };
    for (var key in bannerData) {
      formData.append('banner_ads[' + key + ']', bannerData[key]);
    }
    var token = localStorageService.get('signupToken');
    AdvertisementService.advertisementAddSignUp(formData, token).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
      $rootScope.addListingStepDone = 8;
      // $state.go(UIState.ADD_LISTING.FEATURED_CENTER);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'AdvertisementService', ctrl];

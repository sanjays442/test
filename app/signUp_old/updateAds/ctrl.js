module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  var centerId = localStorageService.get('signupCenterId');
  var token = localStorageService.get('signupToken');
  vm.header = '';
  vm.sidebar = '';
  vm.footer = '';
  vm.count = 0;

  vm.userCreate = function () {
    //  $state.go(UIState.SIGN_UP.USER_PROFILE);
  };
  service.getPublishAds(centerId, token).then(function (result) {
    $log.info(result);
    for (var i in result.banner_ads) {
      var ads = result.banner_ads[i];
      if (ads.position === 'header') {
        vm.header = ads;
      } else if (ads.position === 'sidebar') {
        vm.sidebar = ads;
      } else if (ads.position === 'footer') {
        vm.footer = ads;
      }
    }
  }).catch(function (err) {
    $log.info(err);
    lm.$emit(Status.FAILED, 'Something went wrong');
  });

  vm.updateAds = function () {
    vm.createAds = [];
    if (vm.header !== '') {
      // update
    } else if (angular.isDefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      // create
      //  if (angular.isDefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      vm.createAds.push('header');
      //  }
    }
    if (vm.sidebar !== '') {
      // update
    } else if (angular.isDefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      // create
      //  if (angular.isDefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.createAds.push('sidebar');
      //  }
    }
    if (vm.footer !== '') {
      // update
    } else if (angular.isDefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      // create
      //  if (angular.isDefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      vm.createAds.push('footer');
      //  }
    }

    // Create request
    for (var cnt in vm.createAds) {
      //  $log.info('cnt' + validAds[cnt]);
      if (vm.createAds[cnt] === 'sidebar') {
        vm.publishAds(vm.sideImage, 'sidebar', vm.weblinkSidebar);
      } else if (vm.createAds[cnt] === 'header') {
        vm.publishAds(vm.headerImage, 'header', vm.weblinkHeader);
      } else if (vm.createAds[cnt] === 'footer') {
        vm.publishAds(vm.footerImage, 'footer', vm.weblinkFooter);
      }
    }
    // Update request
    if (vm.createAds.length === 0) {
      vm.editAds();
      $log.info('only edit ads hit');
    }
  };

  vm.publishAds = function (content, position, weblink) {
    var formData = new FormData();
    var publishAds = {
      'treatment_center_id': centerId,
      'content': content,
      'position': position,
      'center_web_link': weblink
    };

    for (var key in publishAds) {
      formData.append('banner_ad[' + key + ']', publishAds[key]);
    }
    service.publishAds(formData, token).then(function (result) {
      $log.info(result);
      vm.count++;
      lm.$emit(Status.SUCCEEDED, result.banner_ad.position + ' ad submitted');
      if (vm.count >= vm.createAds.length) {
        lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
        //  $state.go(UIState.SIGN_UP.UPDATE_ADS);
        // will call update ads api
        $log.info(' create ads final submitted');
        vm.editAds();
      }
    }).catch(function (err) {
      $log.info(err);
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };
  vm.editAds = function () {
    $log.info('update ads');
    //  $state.go(UIState.SIGN_UP.DETAILS);
    $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
  };
}

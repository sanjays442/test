module.exports = ['$injector', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  var token = localStorageService.get('signupToken');
  var centerId = localStorageService.get('signupCenterId');
  var alreadyPublished = 0;
  // testing if ads are already published for same center id
  service.getPriceInfo(token).then(function (result) {
    vm.sidebar = result.banner_ads_sidebar;
    vm.header = result.banner_ads_header;
    vm.footer = result.banner_ads_footer;
  }).catch(function (err) {
    $log.info(err);
  });
  service.getPublishAds(centerId, token).then(function (result) {
    $log.info(result);
    if (result.banner_ads.length === 0) {
      alreadyPublished = 0;
    } else if (result.banner_ads.length > 0) {
      alreadyPublished = 1;
    }
  }).catch(function (err) {
    $log.info(err);
    lm.$emit(Status.SUCCEEDED, 'Something went wrong');
  });
  vm.fileReqHeader = '';
  vm.fileReqFooter = '';
  vm.fileReqSidebar = '';

  $scope.uploadChange = function (position) {
    if (position === 'footer') {
      vm.fileReqFooter = '';
    } else if (position === 'sidebar') {
      vm.fileReqSidebar = '';
    } else if (position === 'header') {
      vm.fileReqHeader = '';
    }
  };
  vm.count = 1;
  vm.publish_ads2 = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
    if (alreadyPublished === 1) {
      lm.$emit(Status.FAILED, 'Ads are already published for this center.');
      $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
      return;
    }
    var sideImage = vm.sideImage;
    var headerImage = vm.headerImage;
    var footerImage = vm.footerImage;
    vm.validAds = [];

    if (angular.isUndefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = 'choose-file-req';
      vm.adsFormInit.weblinkSidebar = 0;
      return;
      // vm.weblinkFooter = '';
    } else if (angular.isDefined(vm.sideImage) && angular.isUndefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = '';
      vm.adsFormInit.weblinkSidebar = 1;
      return;
    }

    if (angular.isDefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.validAds.push('sidebar');
    }

    if (angular.isUndefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      headerImage = '';
      vm.fileReqHeader = 'choose-file-req';
      return;
      // vm.adsFormInit.weblinkHeader = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkHeader) && angular.isDefined(vm.headerImage)) {
      vm.adsFormInit.weblinkHeader = 1;
      vm.fileReqHeader = '';
      return;
    }
    if (angular.isDefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      vm.validAds.push('header');
      // vm.weblinkHeader = '';
    }

    if (angular.isUndefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      footerImage = '';
      vm.fileReqFooter = 'choose-file-req';
      return;
      // vm.adsFormInit.weblinkFooter = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkFooter) && angular.isDefined(vm.footerImage)) {
      vm.adsFormInit.weblinkFooter = 1;
      vm.fileReqFooter = '';
      return;
    }
    if (angular.isDefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      vm.validAds.push('footer');
    }

    for (var cnt in vm.validAds) {
      // $log.info('cnt' + validAds[cnt]);
      if (vm.validAds[cnt] === 'sidebar') {
        vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
      } else if (vm.validAds[cnt] === 'header') {
        vm.submitAds(headerImage, 'header', vm.weblinkHeader);
      } else if (vm.validAds[cnt] === 'footer') {
        vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
      }
    }
    $log.info(vm.validAds.length);
    if (vm.validAds.length === 0) {
      // $state.go(UIState.SIGN_UP.UPDATE_ADS);
      $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
    }
    // return;
    // vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    // vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    // vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };

  vm.submitAds = function (content, position, weblink) {
    lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
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
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        // if (vm.count >= 3) {
        lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        //  $state.go(UIState.SIGN_UP.PUBLISH_ADS2);
        // $state.go(UIState.SIGN_UP.UPDATE_ADS);
        $state.go(UIState.SIGN_UP.SPONSORED_PAGE);
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };
}

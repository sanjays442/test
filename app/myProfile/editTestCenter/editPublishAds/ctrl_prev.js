module.exports = ['$location', '$anchorScroll', '$injector', '$document', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'localStorageService', 'Status', ctrl];

function ctrl($location, $anchorScroll, $injector, $document, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  vm.getBannerAds = getBannerAds;
  vm.hideAdsHtml = {};
  vm.hideAdsHtml.header = 0;
  vm.hideAdsHtml.sidebar = 0;
  vm.hideAdsHtml.footer = 0;

  var bannerAdInfo = localStorageService.get('editBannerAdsInfo', 'sessionStorage');

  // if (vm.adsInfo.position !== '') {
  //   vm.hideAdsHtml[vm.adsInfo.position] = 1;
  // }

  vm.goHome = function () {
    $rootScope.addCenterInitialize = 0; // show left panel navigations
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
  if (bannerAdInfo === null || bannerAdInfo === '') {
    $log.info('Could not get bannerAd info');
    vm.goHome();
    return;
  }
  var centerId = bannerAdInfo.cenId;
  vm.getBannerAds(centerId);
  var alreadyPublished = 0;
  // testing if ads are already published for same center id
  service.getPriceInfo().then(function (result) {
    vm.sidebar = result.banner_ads_sidebar;
    vm.header = result.banner_ads_header;
    vm.footer = result.banner_ads_footer;
  }).catch(function (err) {
    $log.info(err);
  });

  function getBannerAds(centerId) {
    service.getPublishAds(centerId).then(function (result) {
      $log.info(result);
      var bannerAds = result.banner_ads;
      vm.adsInfo = bannerAds;
      vm.populateValues();
    }).catch(function (err) {
      $log.info(err);
      //  lm.$emit(Status.SUCCEEDED, 'Something went wrong');
    });
  }
  // var editAds = localStorageService.get('edit_bannerads', 'sessionStorage');
  // if (angular.isDefined(editAds) && editAds !== null) {
  //   var cenId = editAds.cenId;
  //   vm.editCenId = cenId;
  //   vm.editHeaderHide = 1;
  //   vm.editFooterHide = 1;
  //   vm.editSidebarHide = 1;
  //   vm.getBannerAds(cenId);
  // }
  // service.getPublishAds(centerId).then(function (result) {
  //   // $log.info(result);
  //   if (result.banner_ads.length === 0) {
  //     alreadyPublished = 0;
  //   } else if (result.banner_ads.length > 0) {
  //     // alreadyPublished = 1;
  //   }
  // }).catch(function (err) {
  //   $log.info(err);
  //   lm.$emit(Status.SUCCEEDED, 'Something went wrong');
  // });
  vm.fileReqHeader = '';
  vm.fileReqFooter = '';
  vm.fileReqSidebar = '';
  // Uploaded image preview
  vm.preview_img = {};
  $scope.uploadChange = function (element, position) {
    if (position === 'footer') {
      vm.fileReqFooter = '';
    } else if (position === 'sidebar') {
      vm.fileReqSidebar = '';
    } else if (position === 'header') {
      vm.fileReqHeader = '';
    }
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img[position] = e.target.result;
      var elmId = 'logo_preview_' + position;
      $document[0].getElementById(elmId).src = e.target.result;
    };
  };

  vm.count = 1;
  vm.publish_ads2 = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var sideImage = vm.sideImage;
    var headerImage = vm.headerImage;
    var footerImage = vm.footerImage;

    vm.validAds = [];
    var validation = 1;
    var noFormEntry = 1;
    if (angular.isUndefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = 'choose-file-req';
      vm.fileReqMsgSidebar = 'Upload an image';
      vm.adsFormInit.weblinkSidebar = 1;
      validation *= 0;
      noFormEntry *= 0;
      // vm.weblinkFooter = '';
    } else if (angular.isDefined(vm.sideImage) && angular.isUndefined(vm.weblinkSidebar)) {
      vm.fileReqSidebar = '';
      vm.fileReqMsgSidebar = '';
      vm.adsFormInit.weblinkSidebar = 0;
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }

    if (angular.isDefined(vm.sideImage) && angular.isDefined(vm.weblinkSidebar)) {
      vm.fileReqMsgSidebar = '';
      vm.validAds.push('sidebar');
      validation *= 1;
      noFormEntry *= 0;
    } else if (angular.isUndefined(vm.sideImage) && angular.isUndefined(vm.weblinkSidebar)) {
      // validation *= 0;
      noFormEntry *= 1;
    }

    if (angular.isUndefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      headerImage = '';
      vm.adsFormInit.weblinkHeader = 1;
      vm.fileReqHeader = 'choose-file-req';
      vm.fileReqMsgHeader = 'Upload an image';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
      // vm.adsFormInit.weblinkHeader = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkHeader) && angular.isDefined(vm.headerImage)) {
      vm.adsFormInit.weblinkHeader = 0;
      vm.fileReqHeader = '';
      vm.fileReqMsgHeader = '';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }
    if (angular.isDefined(vm.headerImage) && angular.isDefined(vm.weblinkHeader)) {
      vm.fileReqMsgHeader = '';
      vm.adsFormInit.weblinkHeader = 1;
      vm.validAds.push('header');
      validation *= 1;
      noFormEntry *= 0;
      // vm.weblinkHeader = '';
    } else if (angular.isUndefined(vm.headerImage) && angular.isUndefined(vm.weblinkHeader)) {
      // validation *= 0;
      noFormEntry *= 1;
    }

    if (angular.isUndefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      footerImage = '';
      vm.fileReqFooter = 'choose-file-req';
      vm.fileReqMsgFooter = 'Upload an image';
      vm.adsFormInit.weblinkFooter = 1;
      //  return;
      validation *= 0;
      noFormEntry *= 0;
      // vm.adsFormInit.weblinkFooter = 0;
      // vm.weblinkFooter = '';
    } else if (angular.isUndefined(vm.weblinkFooter) && angular.isDefined(vm.footerImage)) {
      vm.adsFormInit.weblinkFooter = 0;
      vm.fileReqFooter = '';
      vm.fileReqMsgFooter = '';
      //  return;
      validation *= 0;
      noFormEntry *= 0;
    }
    if (angular.isDefined(vm.footerImage) && angular.isDefined(vm.weblinkFooter)) {
      vm.fileReqMsgFooter = '';
      vm.adsFormInit.weblinkFooter = 1;
      vm.validAds.push('footer');
      validation *= 1;
      noFormEntry *= 0;
    } else if (angular.isUndefined(vm.footerImage) && angular.isUndefined(vm.weblinkFooter)) {
      // validation *= 0;
      noFormEntry *= 1;
    }
    $log.info(vm.publishAdsForm.weblinkFooter.$error.pattern);
    if ((noFormEntry === 0 && validation === 0) || (vm.publishAdsForm.weblinkFooter.$error.pattern === true || vm.publishAdsForm.weblinkSidebar.$error.pattern === true || vm.publishAdsForm.weblinkHeader.$error.pattern === true)) {
      $log.info('validation error');
      gotoAnchor(295, 'sideImage');
      return;
    }

    for (var cnt in vm.validAds) {
      // $log.info('cnt' + validAds[cnt]);
      if (vm.validAds[cnt] === 'sidebar') {
        vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar, vm.sidebarId);
      } else if (vm.validAds[cnt] === 'header') {
        vm.submitAds(headerImage, 'header', vm.weblinkHeader, vm.headerId);
      } else if (vm.validAds[cnt] === 'footer') {
        vm.submitAds(footerImage, 'footer', vm.weblinkFooter, vm.footerId);
      }
    }
    // $log.info(vm.validAds.length);
    if (vm.validAds.length === 0) {
      // $state.go(UIState.MY_PROFILE.UPDATE_ADS);
      // $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
      //  vm.checkSponsorGo();
    }
    // return;
    // vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    // vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    // vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };
  vm.newAdsPending = {
    'paymentTotal': 0,
    'action': 'bannerAdsAdd',
    'data': [],
    'fromState': UIState.MY_PROFILE.PUBLISH_ADS_EDIT
  };
  var bannerAdded = 0;
  vm.submitAds = function (content, position, weblink, id) {
    lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    $log.info('vmcount init ' + vm.count);
    if (angular.isUndefined(id)) {
      $log.info('Add mode...');
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
      $log.info('vmcount before: ' + vm.count);
      vm.newAdsPending.data.push(publishAds);
      vm.newAdsPending.paymentTotal += vm[position];
      vm.count++;
      localStorageService.set('paymentActionInfo', vm.newAdsPending, 'sessionStorage');
      $log.info('vmcount: ' + vm.count);
      if (vm.count >= vm.validAds.length) {
        $log.info('testing...');
        $log.info(vm.newAdsPending);
        lm.$emit(Status.HIDE_PROCESSING, '');
        $state.go(UIState.MY_PROFILE.DO_PAYMENT);
      }
      // vm.bannerAdsAdd(formData, centerId);
      return;
    }
    $log.info('Edit update mode..');

    var formData = new FormData();
    var publishAds = {
      // 'treatment_center_id': centerId,
      'content': content,
      // 'position': position,
      'center_web_link': weblink
    };
    for (var key in publishAds) {
      formData.append('banner_ad[' + key + ']', publishAds[key]);
    }
    service.bannerAdsEdit(formData, centerId, id).then(function (result) {
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        // if (vm.count >= 3) {
        // lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        // saving steps data //
        // signupData.signupStep.publishAds[(vm.count - 1).toString()] = publishAds;
        //  localStorageService.set('signupStepsData', signupData, 'sessionStorage');
        // bannerAdded = 1;
        // check if sponsorAds are added or not
        // vm.checkSponsorGo();
        localStorageService.remove('editBannerAdsInfo', 'sessionStorage');
        $log.info(vm.newAdsPending);
        lm.$emit(Status.HIDE_PROCESSING, '');
        if (angular.isDefined(vm.newAdsPending) && vm.newAdsPending.data.length > 0) {
          $state.go(UIState.MY_PROFILE.DO_PAYMENT);
        } else {
          vm.goHome();
        }
      }
      vm.count++;
      $log.info('after incrementerd: ' + vm.count);
    }).catch(function (err) {
      $log.info(err);
      // vm.count--;
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };

  vm.bannerAdsAdd = function (formData, centerId) {
    service.publishAds(formData, centerId).then(function (result) {
      $log.info(result);
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        lm.$emit(Status.HIDE_PROCESSING, '');
        vm.processing = 0;
        $log.info('Success Add');
        localStorageService.remove('edit_bannerads');
        vm.goHome();
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      //  vm.count--;
      lm.$emit(Status.HIDE_PROCESSING, '');
      // lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };

  vm.checkSponsorGo = function () {
    // setting publishAds as added for current center
    if (bannerAdded === 1) {
      localStorageService.set('bannerAdded', '1');
    }
    var sponsorAdsVisited = localStorageService.get('sponsorAdded');
    if (angular.isDefined(sponsorAdsVisited) && sponsorAdsVisited === '0') {
      $state.go(UIState.MY_PROFILE.SPONSER);
    } else {
      $state.go(UIState.MY_PROFILE.SPONSER);
      //  $state.go(UIState.MY_PROFILE.DETAILS);
    }
  };

  vm.populateValues = function () {
    // if (angular.isDefined(vm.adsInfo) && angular.isDefined(vm.adsInfo[0])) {
    if (angular.isDefined(vm.adsInfo)) {
      // var publishAds = vm.adsInfo;
      var publishAds = vm.adsInfo;
      for (var key in publishAds) {
        //  var adPos = publishAds[key].name.split(' ');
        var adPos = publishAds[key].position;
        if (adPos === 'header') {
          vm.weblinkHeader = publishAds[key].center_web_link;
          vm.headerImage = publishAds[key].content;
          vm.preview_img[adPos] = publishAds[key].content;
          vm.headerId = publishAds[key].id;
        }
        if (adPos === 'sidebar') {
          vm.weblinkSidebar = publishAds[key].center_web_link;
          vm.sideImage = publishAds[key].content;
          vm.preview_img[adPos] = publishAds[key].content;
          vm.sidebarId = publishAds[key].id;
        }
        if (adPos === 'footer') {
          vm.weblinkFooter = publishAds[key].center_web_link;
          vm.footerImage = publishAds[key].content;
          vm.preview_img[adPos] = publishAds[key].content;
          vm.footerId = publishAds[key].id;
        }
      }
    }
    //  $log.info('couldnot get ads info.');
    // vm.goHome();
  };
  //  vm.populateValues();

  vm.goBack = function () {
    $state.go(UIState.MY_PROFILE.SPONSER);
  };
  vm.goToCart = function () {
    $state.go(UIState.MY_PROFILE.DETAILS);
  };
  // for scroll to error
  function gotoAnchor(offset, anchor) {
    $anchorScroll.yOffset = offset;
    if (angular.isUndefined(anchor) || anchor === '') {
      $anchorScroll();
      return;
    }
    var old = $location.hash();
    $location.hash(anchor);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  }
}

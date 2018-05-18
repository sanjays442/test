module.exports = ['$location','$anchorScroll','$timeout', '$injector', '$document', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'localStorageService', 'Status', ctrl];

function ctrl($location,$anchorScroll, $timeout, $injector, $document, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  var lm = $rootScope;
  var signupData = localStorageService.get('signupStepsData', 'sessionStorage');
  $log.info(signupData);

  //updating progress of steps
  var addCenterProgress = {'lastStep':'myProfile.publishAds', 'stepsCompleted':0};
  localStorageService.set('addCenterProgress',addCenterProgress, 'sessionStorage');
  //  var token = localStorageService.get('signupToken');
  vm.sponsorAdded = localStorageService.get('sponsorAdded');
  vm.bannerAdded = localStorageService.get('bannerAdded');
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
  if (vm.sponsorAdded === 1) {
    vm.setProgressValues(75, 90);
  } else {
    vm.setProgressValues(60, 75);
  }
  // END: progress values

  var centerId = localStorageService.get('signupCenterId');
  // get previous steps localstorage data
  var signupData = localStorageService.get('signupStepsData', 'sessionStorage');

  var alreadyPublished = 0;
  // testing if ads are already published for same center id
  service.getPriceInfo().then(function (result) {
    vm.sidebar = result.banner_ads_sidebar;
    vm.header = result.banner_ads_header;
    vm.footer = result.banner_ads_footer;
  }).catch(function (err) {
    $log.info(err);
  });
  service.getPublishAds(centerId).then(function (result) {
    // $log.info(result);
    if (result.banner_ads.length === 0) {
      alreadyPublished = 0;
    } else if (result.banner_ads.length > 0) {
      // alreadyPublished = 1;
    }
  }).catch(function (err) {
    $log.info(err);
    lm.$emit(Status.SUCCEEDED, 'Something went wrong');
  });
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
    //  $state.go(UIState.MY_PROFILE.PUBLISH_ADS2);
    if (alreadyPublished === 1) {
      lm.$emit(Status.FAILED, 'Ads are already published for this center.');
      // check if sponsorAds are added or not
      vm.checkSponsorGo();
      // $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
      return;
    }
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
      vm.checkSponsorGo();
    }
    // return;
    // vm.submitAds(sideImage, 'sidebar', vm.weblinkSidebar);
    // vm.submitAds(headerImage, 'header', vm.weblinkHeader);
    // vm.submitAds(footerImage, 'footer', vm.weblinkFooter);
  };

  var bannerAdded = 0;
  vm.submitAds = function (content, position, weblink, id) {
    lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    vm.processing = 1;
    if(angular.isDefined(vm.editCenId)){
      centerId = vm.editCenId;
    }
    if (angular.isDefined(vm.editCenId) && angular.isDefined(id)) {
      $log.info('Edit mode...'+position);
      var formData = new FormData();
      var publishAds = {
        // 'treatment_center_id': vm.editCenId,
        'content': content,
        // 'position': position,
        'center_web_link': weblink
      };
      for (var key in publishAds) {
        formData.append('banner_ad[' + key + ']', publishAds[key]);
      }
      vm.bannerAdsEdit(formData, id, vm.editCenId);
      return;
    }
    // add banner ads
    var formData = new FormData();
    var publishAds = {
      // 'treatment_center_id': centerId,
      'content': content,
      'position': position,
      'center_web_link': weblink
    };
    for (var key in publishAds) {
      formData.append('banner_ad[' + key + ']', publishAds[key]);
    }
    $log.info('normal mode..'+position);
    $log.info(publishAds);
    service.publishAds(formData, centerId).then(function (result) {
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        lm.$emit(Status.HIDE_PROCESSING, '');
        vm.processing = 0;
        // if (vm.count >= 3) {
        // lm.$emit(Status.SUCCEEDED, 'Ads submitted');
        // saving steps data //
        signupData.signupStep.publishAds[(vm.count - 1).toString()] = publishAds;
        localStorageService.set('signupStepsData', signupData, 'sessionStorage');
        bannerAdded = 1;
        // check if sponsorAds are added or not
        vm.checkSponsorGo();
        // $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };
  vm.bannerAdsEdit = function (formData, adId, cenId) {
    service.bannerAdsEdit(formData, cenId, adId).then(function (result) {
      $log.info(result);
      //  lm.$emit(Status.SUCCEEDED, 'Ads submitted');
      if (vm.count >= vm.validAds.length) {
        lm.$emit(Status.HIDE_PROCESSING, '');
        vm.processing = 0;
        $log.info('Success edit');
        localStorageService.remove('edit_bannerads');
      //  $state.go(UIState.SIGN_UP.DETAILS);
        vm.checkSponsorGo();
      }
      vm.count++;
    }).catch(function (err) {
      $log.info(err);
      vm.count--;
      lm.$emit(Status.HIDE_PROCESSING, '');
      // lm.$emit(Status.FAILED, 'Something went wrong');
    });
  };

  vm.checkSponsorGo = function () {
    // setting publishAds as added for current center
    if (bannerAdded === 1) {
      localStorageService.set('bannerAdded', 1);
    }
    var sponsorAdsVisited = localStorageService.get('sponsorAdded');
    if (angular.isDefined(sponsorAdsVisited) && sponsorAdsVisited !== 1) {
      $state.go(UIState.MY_PROFILE.SPONSER);
    } else {
      $state.go(UIState.MY_PROFILE.DETAILS);
    }
  };

  vm.restoreValues = function () {
    if (angular.isDefined(signupData.signupStep.publishAds) && angular.isDefined(signupData.signupStep.publishAds[0])) {
      var publishAds = signupData.signupStep.publishAds;
      for (var key in publishAds) {
        if (publishAds[key].position === 'header') {
          vm.weblinkHeader = publishAds[key].center_web_link;
        }
        if (publishAds[key].position === 'sidebar') {
          vm.weblinkSidebar = publishAds[key].center_web_link;
        }
        if (publishAds[key].position === 'footer') {
          vm.weblinkFooter = publishAds[key].center_web_link;
        }
      }
    }
  };
  // vm.restoreValues();

  vm.getBannerAds = function (centerId) {
    service.getPublishAds(centerId).then(function (result) {
      var bannerAds = result.banner_ads;
      $log.info(bannerAds);
      for (var key in bannerAds) {
        if (bannerAds[key].position === 'header') {
          vm.weblinkHeader = bannerAds[key].center_web_link;
          vm.headerImage = bannerAds[key].content;
          vm.preview_img.header = vm.headerImage;
          vm.headerId = bannerAds[key].id;
          // vm.editHeaderHide = 0;
        }
        if (bannerAds[key].position === 'sidebar') {
          vm.weblinkSidebar = bannerAds[key].center_web_link;
          vm.sideImage = bannerAds[key].content;
          vm.preview_img.sidebar = vm.sideImage;
          vm.sidebarId = bannerAds[key].id;
        //  vm.editSidebarHide = 0;
        }
        if (bannerAds[key].position === 'footer') {
          vm.weblinkFooter = bannerAds[key].center_web_link;
          vm.footerImage =  bannerAds[key].content;
          vm.preview_img.footer = vm.footerImage;
          vm.footerId = bannerAds[key].id;
        //  vm.editFooterHide = 0;
        }
      }
    }).catch(function (err) {
      $log.info(err);
      lm.$emit(Status.SUCCEEDED, 'Something went wrong');
    });
  };
  var editAds = localStorageService.get('edit_bannerads', 'sessionStorage');

  if (angular.isDefined(editAds) && editAds !== null) {
    var cenId = editAds.cenId;
    vm.editCenId = cenId;
    // vm.editHeaderHide = 1;
    // vm.editFooterHide = 1;
    // vm.editSidebarHide = 1;
    vm.getBannerAds(cenId);
  }else{
    vm.restoreValues();
  }

  vm.goBack = function () {
    $state.go(UIState.MY_PROFILE.SPONSER);
  };
  vm.goToCart = function () {
    vm.publish_ads2();
    // $state.go(UIState.MY_PROFILE.DETAILS);
  };
  // for scroll
  function gotoAnchor(offset, anchor) {
    $anchorScroll.yOffset = offset;
    if(angular.isUndefined(anchor) || anchor===''){
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

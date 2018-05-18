function ctrl($injector, $scope, $document, $log, $rootScope, Status, $window, localStorageService, $state, UIState, AdvertisementService) {
  var vm = this;
  $rootScope.activeLink = 'Banner Ads';
  // initializing form data
  vm.init = function () {
    vm.name = {
      'header': '',
      'footer': '',
      'sidebar': ''
    };
    vm.err_type = {
      'header': 1,
      'footer': 1,
      'sidebar': 1
    };
    //  if (angular.isUndefined(vm.position)) {
    vm.position = {
      'header': false,
      'footer': false,
      'sidebar': false
    };
    //  }
    //  if (angular.isUndefined(vm.content)) {
    vm.content = {
      'header': '',
      'footer': '',
      'sidebar': ''
    };
    //  }
    //  if (angular.isUndefined(vm.center_web_link)) {
    vm.center_web_link = {
      'header': '',
      'footer': '',
      'sidebar': ''
    };
    //  }
    vm.preview_img = {
      'header': '',
      'footer': '',
      'sidebar': ''
    };
  };
  vm.init();

  var lm = this;
  lm.previous = function () {
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
  };

  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('addListingBannerAds', 'sessionStorage'))) {
    var bannerInfo = localStorageService.get('addListingBannerAds', 'sessionStorage');
    if (bannerInfo !== null) {
      vm.position = bannerInfo.position;
      vm.name = bannerInfo.name;
      vm.content = bannerInfo.content;
      vm.center_web_link = bannerInfo.center_web_link;
    }
  }

  // Uploaded image preview
  $scope.uploadImagePreview = function (element, position) {
    vm.err_type[position] = 0;
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img[position] = e.target.result;
      var elmId = 'logo_preview_' + position;
      $document[0].getElementById(elmId).src = e.target.result;
    };
  };
  var token = localStorageService.get('signupToken');
  AdvertisementService.getPriceBanner(token).then(function (response) {
    vm.headerCost = response.banner_ads_header;
    vm.footerCost = response.banner_ads_footer;
    vm.sidebarCost = response.banner_ads_sidebar;
  }).catch(function (err) {
    $log.error(err);
    $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
  });

  // set price
  // vm.headerCost = '4000';
  // vm.footerCost = '2500';
  // vm.sidebarCost = '3000';

  // set name
  vm.setName = function () {
    if (vm.position['header'] === true) {
      vm.name.header = 'HEADER AD BLOCK';
    } else {
      vm.name.header = '';
    }
    if (vm.position['footer'] === true) {
      vm.name.footer = 'FOOTER AD BLOCK';
    } else {
      vm.name.footer = '';
    }
    if (vm.position['sidebar'] === true) {
      vm.name.sidebar = 'SIDEBAR AD BLOCK';
    } else {
      vm.name.sidebar = '';
    }
  };
  vm.setName();

  vm.submit = function () {
    $rootScope.totalCost = 0;
    var ret = 0;
    for (var key in vm.position) {
      if (vm.position[key] !== true) {
        continue;
      }
      // validating file type
      if (vm.content[key]) {
        var imageType = String(vm.content[key].type);
        if (imageType.includes('image/') === false) {
          vm.err_type[key] = 1;
          ret = 1
          // return;
        }
        vm.err_type[key] = 0;
      } else {
        ret = 1;
        // return false;
      }
      if (key === 'header') {
        $rootScope.totalCost += vm.headerCost;
      } else if (key === 'sidebar') {
        $rootScope.totalCost += vm.sidebarCost;
      } else if (key === 'footer') {
        $rootScope.totalCost += vm.footerCost;
      }
    }
    var bannerDataSave = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': vm.center_web_link
    };

    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingBannerAds', bannerDataSave, 'sessionStorage');
    }

    if (ret === 1) {
      return false;
    }

    function openPrompt() {

      var popup = '<div class="col-sm-12"><div class="modal-header total_popup_modal"><div class="col-sm-12 text-center"><h3 class="modal-title" id="modal-title">Your total billing amount for banner ads is ${{$root.totalCost}}</h3></div></div></div></div></div><div class="modal-body map_body_state" id="modal-body"><div class="col-md-12 col-sm-12 col-xs-12 col-lg-12"></div></div><div class="modal-footer map_popup_footer"><div class="col-sm-12"><div class="col-sm-7">Press okay to confirm.</div><div class="col-sm-5"><button type="button" class="btn btn-primary" ng-click="ok()">&nbsp;Okay&nbsp;</button></div></div><div ng-click="cancel()"><i class="fa fa-times fa-1" aria-hidden="true" style="position: absolute;top: 0px; font-size: 24px;border-radius: 100%; margin-left:-10px;cursor: pointer;"></i></div>';

      var modalInstance = $injector.get('$uibModal').open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        size: 'md',
        template: popup,
        controller: function () {
          vm.confirm = 0;
          $rootScope.ok = function () {
            vm.processApi();
            modalInstance.dismiss('cancel');
          };
          $rootScope.cancel = function () {
            modalInstance.dismiss('cancel');
            vm.confirm = 0;
            return true;
          };
        },
        bindToController: true
      });
    }
    openPrompt();
  };
  var allSuccess = {
    'header': 0,
    'footer': 0,
    'sidebar': 0
  };

  vm.processApi = function () {
    var link = '';
    var token = localStorageService.get('signupToken');
    var totalAd = 0;
    for (var key in vm.position) {
      totalAd++;
    }
    allSuccess = {
      'header': 0,
      'footer': 0,
      'sidebar': 0
    };
    var len = 0;
    for (key in vm.position) {
      len++;
      if (vm.position[key] !== true) {
        continue;
      }

      if (angular.isDefined(vm.center_web_link[key])) {
        link = vm.center_web_link[key];
      } else {
        link = '';
      }
      var formData = new FormData();
      var bannerData = {
        'position': key,
        'name': vm.name[key],
        'content': vm.content[key],
        'center_web_link': link
      };
      for (var ky in bannerData) {
        formData.append('banner_ads[' + ky + ']', bannerData[ky]);
      }
      AdvertisementService.advertisementAddSignUp(formData, token).then(function (response) {
        // $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
        allSuccess[response.banner_ads.position] = 1;
        if (len >= totalAd) {
          vm.finalCall();
        }
      }).catch(function (err) {
        $log.error(err);
        //  $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
        //  allSuccess[key] = 0;
        if (len >= totalAd) {
          vm.finalCall();
        }
      });

    }
  };

  vm.finalCall = function () {
    var allSubmit = 1;
    for (var pos in vm.position) {
      if (vm.position[pos] === false) {
        continue;
      }
      if (allSuccess[pos] === 1) {
        $rootScope.$emit(Status.SUCCEEDED, pos + ' Ad submitted');
        //  $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
        // console.log(pos + ' sucessss');
      } else {
        $rootScope.$emit(Status.FAILED, pos + ' Ad submission failed');
        allSubmit = 0;
        // console.log(pos + '  failed');
      }
    }
    if (allSubmit === 1) {
      $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
      $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
      $rootScope.addListingStepDone = 7;
      $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
      // console.log('all final submit');
      vm.init();
      localStorageService.remove('addListingBannerAds');
    } else {
      $rootScope.$emit(Status.SUCCEEDED, 'Something went wrong.');
      // console.log('something went wrong');
    }
  };

  vm.skipStep = function () {
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
    $rootScope.addListingStepDone = 7;
    $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
  };
}
module.exports = ['$injector', '$scope', '$document', '$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'AdvertisementService', ctrl];

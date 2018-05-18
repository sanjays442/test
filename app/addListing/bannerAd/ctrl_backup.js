function ctrl($injector, $scope, $document, $log, $rootScope, Status, $window, localStorageService, $state, UIState, AdvertisementService) {
  var vm = this;
  $rootScope.activeLink = 'Banner Ads';
  // initializing form data
  vm.name = '';
  vm.err_type = 1;
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
  $scope.uploadImagePreview = function (element) {
    vm.err_type = 0;
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img = e.target.result;
      $document[0].getElementById('logo_preview').src = vm.preview_img;
    };
  };

  // set price

  var token = localStorageService.get('signupToken');
  AdvertisementService.getPriceBanner(token).then(function (response) {
    vm.headerCost = response.banner_ads_header;
    vm.footerCost = response.banner_ads_footer;
    vm.sidebarCost = response.banner_ads_sidebar;
  }).catch(function (err) {
    $log.error(err);
    $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
  });
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

    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingBannerAds', bannerData, 'sessionStorage');
    }

    function openPrompt() {
      if (vm.position === 'header') {
        $rootScope.totalCost = vm.headerCost;
      } else if (vm.position === 'sidebar') {
        $rootScope.totalCost = vm.sidebarCost;
      } else if (vm.position === 'footer') {
        $rootScope.totalCost = vm.footerCost;
      }
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
            var token = localStorageService.get('signupToken');
            AdvertisementService.advertisementAddSignUp(formData, token).then(function () {
              $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
              $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
              $rootScope.addListingStepDone = 7;
              $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
            }).catch(function (err) {
              $log.error(err);
              $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
            });
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
  vm.skipStep = function () {
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['bannerAd']);
    $rootScope.addListingStepDone = 7;
    $state.go(UIState.ADD_LISTING.FEATURED_LISTING_PAGE1);
  };
}
module.exports = ['$injector', '$scope', '$document', '$log', '$rootScope', 'Status', '$window', 'localStorageService', '$state', 'UIState', 'AdvertisementService', ctrl];

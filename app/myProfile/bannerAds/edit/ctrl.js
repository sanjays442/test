function ctrl($log, $stateParams, $rootScope, Status, AdvertisementService) {
  var vm = this;
  var bannerID = $stateParams.id;
  // getting data
  getBannerData(vm, bannerID, AdvertisementService);

  vm.content = '';
  vm.submit = function () {
    // validating file type
    vm.err_type = 0;
    if (vm.content) {
      if (angular.isObject(vm.content)) {
        var imageType = String(vm.content.type);
        if (imageType.includes('image/') === false) {
          vm.err_type = 1;
          return;
        }
      }
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
    AdvertisementService.advertisementEdit(bannerID, formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_EDIT_SUCCEESS_MSG);
      // refreshing data
      getBannerData(vm, bannerID, AdvertisementService);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}
module.exports = ['$log', '$stateParams', '$rootScope', 'Status', 'AdvertisementService', ctrl];

function getBannerData(vm, bannerID, AdvertisementService) {
  var formData = new FormData();
  var bannerData = {
    'id': bannerID
  };
  for (var key in bannerData) {
    formData.append('banner_ads[' + key + ']', bannerData[key]);
  }
  AdvertisementService.getAdvertisementData(bannerID, formData).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content !== vm.oldcontent) {
      vm.oldcontent = response.banner_ads.content;
    }
    vm.position = response.banner_ads.position;
    vm.name = response.banner_ads.name;
    vm.center_web_link = response.banner_ads.center_web_link;
  }).catch(function (err) {
    vm.error_message = err;
  });
}

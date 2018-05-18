function ctrl($scope, $document, $log, $rootScope, Status, $window, AdvertisementService) {
  var vm = this;

  // initializing form data
  vm.name = '';
  vm.content = '';

  // Uploaded image preview
  $scope.imagePreview = function (element) {
    vm.err_type = 0;
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.preview_img = e.target.result;
      $document[0].getElementById('logo_preview').src = vm.preview_img;
    };
  };

  vm.submit = function () {
    // validating file type
    vm.err_type = 0;
    if (vm.content) {
      var imageType = String(vm.content.type);
      if (imageType.includes('image/') === false) {
        vm.err_type = 1;
        return;
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
    AdvertisementService.advertisementAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.BANNER_ADD_SUCCEESS_MSG);
      $window.location.href = '/#my-profile/banner-ads';
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$scope', '$document', '$log', '$rootScope', 'Status', '$window', 'AdvertisementService', ctrl];

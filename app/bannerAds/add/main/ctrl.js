function ctrl($log, AdvertisementService) {
  var vm = this;
  vm.success_msg = 0;
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
    var formData = new FormData();
    var bannerData = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': vm.center_web_link
    };
    for (var key in bannerData) {
      formData.append('banner_ads[' + key + ']', bannerData[key]);
    }
    AdvertisementService.advertisementAdd(formData).then(function () {
      vm.success_msg = 1;
      window.location.href = '/#my-profile/banner-ads';
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);
    }).catch(function (err) {
      $log.error(err);
    });
  };
}

module.exports = ['$log', 'AdvertisementService', ctrl];

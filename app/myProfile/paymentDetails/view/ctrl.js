function ctrl($log, $stateParams, AdvertisementService) {
  var vm = this;
  var bannerID = $stateParams.id;

  // getting data
  getBannerData($log, vm, bannerID, AdvertisementService);
}
module.exports = ['$log', '$stateParams', 'AdvertisementService', ctrl];

function getBannerData($log, vm, bannerID, AdvertisementService) {
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
    $log.error(err);
  });
}

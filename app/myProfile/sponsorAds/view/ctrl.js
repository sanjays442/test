module.exports = ['$log', '$stateParams', 'SponsorService', ctrl];

function ctrl($log, $stateParams, SponsorService) {
  var vm = this;
  vm.$onInit = onInit;

  function onInit() {
    var formData = new FormData();
    var sponsorId = $stateParams.id;
    formData.append('sponsored_ad[id]', $stateParams.id);
    SponsorService.editSponsor(formData, sponsorId).then(function (response) {
      var sponsoredAd = response.sponsored_ad;
      vm.content = sponsoredAd.content;
      if (vm.content !== vm.oldcontent) {
        vm.oldcontent = sponsoredAd.content;
      }
      vm.title = sponsoredAd.title;
      vm.name = sponsoredAd.name;
      vm.website = sponsoredAd.website;
      vm.image = sponsoredAd.image;
      vm.description = sponsoredAd.description;
    }).catch(function (err) {
      $log.error(err);
    });
  }
}

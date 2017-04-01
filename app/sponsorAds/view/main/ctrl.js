function ctrl($stateParams, SponsorService) {
  var vm = this;
  var sponsorID = $stateParams.id;

  // getting data
  getSponsorData(vm, sponsorID, SponsorService);
}
module.exports = ['$stateParams', 'SponsorService', ctrl];

function getSponsorData(vm, sponsorID, SponsorService) {
  var formData = new FormData();
  var sponsorData = {
    'id': sponsorID
  };
  for (var key in sponsorData) {
    formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
  }
  SponsorService.editSponsor(formData, sponsorID).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content !== vm.oldcontent) {
      vm.oldcontent = response.banner_ads.content;
    }
    vm.title = response.banner_ads.title;
    vm.name = response.banner_ads.name;
    vm.website = response.banner_ads.website;
    vm.image = response.banner_ads.image;
    vm.description = response.banner_ads.description;
  }).catch(function (err) {
    throw err;
  });
}

function ctrl($rootScope, $window, Status, SponsorService) {
  var vm = this;
  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: true,
    checkBoxes: true
  };
  SponsorService.getSponsoredSelect().then(function (response) {
    vm.sponsored_ad_select_normal = response.normal;
    vm.sponsored_ad_select_state = response.state;
    // generating data for multiselect
    var modifiedAdSelectData = [];
    var i = 0;
    for (var key in response.normal) {
      modifiedAdSelectData[i] = {
        id: response.normal[key].id,
        label: response.normal[key].name,
        type: 'normal'
      };
      i++;
    }

    for (key in response.state) {
      modifiedAdSelectData[i] = {
        id: response.state[key].id,
        label: response.state[key].name,
        type: 'state'
      };
      i++;
    }
    vm.sponsored_ad_select = modifiedAdSelectData;
  }).catch(function (err) {
    throw err;
  });
  vm.image = '';
  vm.submit = function () {
    var sponsoredListingIds = [];
    var id = '';
    for (var key in vm.multiselectModelLayoutIds) {
      id = String(vm.multiselectModelLayoutIds[key].id);
      sponsoredListingIds[key] = id;
    }
    // validating file type
    vm.err_type = 0;
    if (angular.isDefined(vm.image)) {
      if (vm.image || vm.image.length) {
        if (angular.isObject(vm.image)) {
          var imageType = String(vm.image.type);
          if (imageType.includes('image/') === false) {
            vm.err_type = 1;
            return;
          }
        }
      }
    }
    var formData = new FormData();
    if (angular.isDefined(vm.website)) {
      var website = vm.website;
    } else {
      website = '';
    }
    var sponsorData = {
      'title': vm.title,
      'name': vm.name,
      'image': vm.image,
      'description': vm.description,
      'website': website,
      'sponsored_listing_layout_ids': sponsoredListingIds
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.sponsorAdd(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_ADD_SUCCEESS_MSG);
      $window.location.href = '/#/my-profile/sponsor-ads';
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
  };
}

module.exports = ['$rootScope', '$window', 'Status', 'SponsorService', ctrl];

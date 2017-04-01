function ctrl($scope, $stateParams, SponsorService) {
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
  var sponsorID = $stateParams.id;
  vm.success_msg = 0;
  vm.submit = function () {
    var sponsoredListingIds = [];
    var id = '';
    for (var key in vm.multiselectModelLayoutIds) {
      id = String(vm.multiselectModelLayoutIds[key].id);
      sponsoredListingIds[key] = id;
    }
    // validating file type
    vm.err_type = 0;
    if (vm.image || vm.image.length) {
      if (typeof vm.image === 'object') {
        var imageType = String(vm.image.type);
        if (imageType.includes('image/') === false) {
          vm.err_type = 1;
          return;
        }
      }
    }
    var formData = new FormData();
    var sponsorData = {
      'id': sponsorID,
      'title': vm.title,
      'name': vm.name,
      'image': vm.image,
      'description': vm.description,
      'website': vm.website,
      'sponsored_listing_layout_ids': sponsoredListingIds // [vm.sponsored_listing_layout_ids]
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsor(formData, sponsorID).then(function (response) {
      var setImage = angular.element(document.querySelector('#sponsor_image'));
      setImage.attr('src', response.banner_ads.image);
      vm.success_msg = 1;
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);
    }).catch(function (err) {
      throw err;
    });
  };
  // getting data
  editSponsor(vm, sponsorID, SponsorService);
}
module.exports = ['$scope', '$stateParams', 'SponsorService', ctrl];

function editSponsor(vm, sponsorID, SponsorService) {
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
    vm.payment_amount = response.banner_ads.payment_amount;
    var ids = [];
    var i = 0;
    // var count = response.banner_ads.sponsored_pages.length;
    for (key in response.banner_ads.sponsored_pages) {
      ids[i] = {
        'id': response.banner_ads.sponsored_pages[key].id
      };
      i++;
    }
    vm.sponsored_listing_layout_ids = ids;
    vm.multiselectModelLayoutIds = ids;

    SponsorService.getSponsoredSelect().then(function (responseSponsor) {
      vm.sponsored_ad_select_normal = responseSponsor.normal;
      vm.sponsored_ad_select_state = responseSponsor.state;

      // generating data for multiselect
      var modifiedAdSelectData = [];
      i = 0;
      for (key in responseSponsor.normal) {
        // console.log(responseSponsor.normal[key].name);
        modifiedAdSelectData[i] = {
          id: responseSponsor.normal[key].id,
          label: responseSponsor.normal[key].name,
          type: 'normal'
        };
        i++;
      }

      for (key in responseSponsor.state) {
        modifiedAdSelectData[i] = {
          id: responseSponsor.state[key].id,
          label: responseSponsor.state[key].name,
          type: 'state'
        };
        i++;
      }
      vm.sponsored_ad_select = modifiedAdSelectData;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }).catch(function (err) {
    throw err;
  });
}

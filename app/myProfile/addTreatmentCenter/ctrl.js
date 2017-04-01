module.exports = ['$log', '$rootScope', '$state', 'Status', 'TreatmentCenterService', ctrl];

function ctrl($log, $rootScope, $state, Status, service) {
  var vm = this;

  vm.multiselectModelCategories = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false
  };

  vm.treatmentCenterCategories = [
    {
      'label': 'Inpatient',
      'id': 'inpatient'
    },
    {
      'label': 'Outpatient',
      'id': 'outpatient'
    },
    {
      'label': 'Sober Living',
      'id': 'sober-living'
    },
    {
      'label': 'Adolescent',
      'id': 'adolescent'
    }
  ];

  vm.state = '';
  vm.onStateUpdate = function (selected) {
    vm.state = selected;
  };
  vm.submit = function () {
    // validating file type
    vm.err_type = 0;
    if (vm.listing_image) {
      var imageType = String(vm.listing_image.type);
      if (imageType.includes('image/') === false) {
        vm.err_type = 1;
        return;
      }
    }

    var data = {
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      // 'heading_1': vm.heading_1,
      // 'heading_2': vm.heading_2,
      // 'heading_3': vm.heading_3,
      // 'heading_4': vm.heading_4,
      'content_1': vm.content_1,
      'content_2': vm.content_2,
      'content_3': vm.content_3,
      'content_4': vm.content_4,
      'address_line_1': vm.address_line_1,
      'address_line_2': vm.address_line_2,
      'city': vm.city,
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.phone,
      'email': vm.email,
      'featured': false
    };

    var formData = new FormData();
    for (var key in data) {
      formData.append('treatment_center[' + key + ']', data[key]);
    }
    if (vm.image_data) {
      var imageData = vm.image_data;
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }
    service.add(formData).then(function ( /* result */ ) {
      $state.go('featuredTreatmentCenterPage');
      $rootScope.$emit(Status.SUCCEEDED, Status.CENTER_ADD_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

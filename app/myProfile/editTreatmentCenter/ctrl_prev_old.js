module.exports = ['$scope', '$document', '$log', '$rootScope', '$state', '$stateParams', 'Status', 'UIState', 'TreatmentCenterService', 'MapService', 'localStorageService', 'UserService', 'CartDetailService',
  ctrl];

function ctrl($scope, $document, $log, $rootScope, $state, $stateParams, Status, UIState, service, mapService, localStorageService, UserService, CartDetailService) {
  var vm = this;
  var id = $stateParams.id;
  var token = localStorageService.get('token');
  service.queryDetail(id, token).then(function (result) {
    var state = result.treatment_center.state;
    var pincode = result.treatment_center.pincode;
    // var phone = result.treatment_center.phone;
    // if (phone !== '') {
    //   vm.editCenter.center_phone = 1;
    // }
    for (var key in result.treatment_center) {
      // vm[key] = result[key];
      vm[key] = result.treatment_center[key];
    }
    service.getZipValidation(state, pincode).then(function (res) {
      var validZip = res.zip_present;
      if (validZip === true) {
        vm.zipFound = 1;
      }
    });
    getCities(state);
    vm.testPhone();
    // select categories
    selectCategory();
  });

  vm.onStateUpdate = function (selected) {
    vm.state = selected;
    getCities(vm.state);
  };
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
      'id': 1
    },
    {
      'label': 'Outpatient',
      'id': 2
    },
    {
      'label': 'Sober Living',
      'id': 3
    },
    {
      'label': 'Adolescent',
      'id': 4
    }
  ];

  function selectCategory() {
    for (var key in vm.categories) {
      vm.multiselectModelCategories.push({
        'id': vm.categories[key].id
      });
    }
  }

  // queryProfile

  UserService.queryProfile().then(function (result) {
    vm.profile = result.user;
    // console.log('profile data from api: ' + vm.profile);
    vm.userType = result.user.type_of_user;
    // localStorageService.set('profileData', result.user, 'sessionStorage');
  }).catch(function (error) {
    // todo, display in message in the frontend page
    // $window.location.href = '/#logout';
    $log.error(error);
  });

  // pricing
  CartDetailService.getPriceInfo().then(function (result) {
    vm.sponsoredPrice = result.price_paid;
    vm.featuredPrice = result.price_featured;
  }).catch(function (error) {
    $log.error(error);
  });

  function getCities(state) {
    mapService.getCitiesByState(state).then(function (response) {
      vm.cities = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }

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

  $scope.imagePreviewMulti = function (element) {
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      $document[0].getElementById('logo_preview_multi').src = e.target.result;
    };
  };

  var usCodes = [205, 251, 659, 256, 334, 907, 403, 780, 264, 268, 520, 928, 480, 602, 623, 501, 479, 870, 242, 246, 441,
    250, 604, 778, 284, 341, 442, 628, 657, 669, 747, 752, 764, 951, 209, 559, 408, 831, 510, 213, 310, 424, 323, 562, 707, 369, 627,
    530, 714, 949, 626, 909, 916, 760, 619, 858, 935, 818, 415, 925, 661, 805, 650, 600, 809, 345, 670, 211, 720, 970, 303, 719, 203,
    475, 860, 959, 302, 411, 202, 767, 911, 239, 386, 689, 754, 941, 954, 561, 407, 727, 352, 904, 850, 786, 863, 305, 321, 813, 470,
    478, 770, 678, 404, 706, 912, 229, 710, 473, 671, 808, 208, 312, 773, 630, 847, 708, 815, 224, 331, 464, 872, 217, 618, 309, 260, 317,
    219, 765, 812, 563, 641, 515, 319, 712, 876, 620, 785, 913, 316, 270, 859, 606, 502, 225, 337, 985, 504, 318, 318, 204, 227, 240, 443,
    667, 410, 301, 339, 351, 774, 781, 857, 978, 508, 617, 413, 231, 269, 989, 734, 517, 313, 810, 248, 278, 586, 679, 947, 906, 616, 320,
    612, 763, 952, 218, 507, 651, 228, 601, 557, 573, 636, 660, 975, 314, 816, 417, 664, 406, 402, 308, 775, 702, 506, 603, 551, 848, 862,
    732, 908, 201, 973, 609, 856, 505, 575, 585, 845, 917, 516, 212, 646, 315, 518, 347, 718, 607, 914, 631, 716, 709, 252, 336, 828, 910,
    980, 984, 919, 704, 701, 283, 380, 567, 216, 614, 937, 330, 234, 440, 419, 740, 513, 580, 918, 405, 905, 289, 647, 705, 807, 613, 519,
    416, 503, 541, 971, 445, 610, 835, 878, 484, 717, 570, 412, 215, 267, 814, 724, 902, 787, 939, 438, 450, 819, 418, 514, 401, 306, 803,
    843, 864, 605, 869, 758, 784, 731, 865, 931, 423, 615, 901, 325, 361, 430, 432, 469, 682, 737, 979, 214, 972, 254, 940, 713, 281, 832,
    956, 817, 806, 903, 210, 830, 409, 936, 512, 915, 868, 649, 340, 385, 435, 801, 802, 276, 434, 540, 571, 757, 703, 804, 509, 206, 425,
    253, 360, 564, 304, 262, 920, 414, 715, 608, 307, 867];

  // check if phone number is a valid us number
  vm.testPhone = function () {
    if (angular.isDefined(vm.phone)) {
      var len = vm.phone.length;
      if (len > 3) {
        var code = vm.phone.substring(0, 3);
        if ((usCodes.indexOf(parseInt(code, 10)) === -1)) {
          vm.editCenter.center_phone.$error.pattern = true;
          vm.editCenter.center_phone.$valid = false;
          vm.editCenter.center_phone.$invalid = true;
          $rootScope.center_phone = 0;
        } else {
          vm.editCenter.center_phone.$error.pattern = false;
          vm.editCenter.center_phone.$valid = true;
          vm.editCenter.center_phone.$invalid = false;
          $rootScope.center_phone = 1;
        }
        if (len < 10) {
          $rootScope.center_phone = 0;
        }
      } else {
        $rootScope.center_phone = 0;
      }
    }
  };

  // test zip code
  vm.zipFound = 0;
  vm.testZip = function () {
    if (angular.isUndefined(vm.pincode)) {
      return;
    }
    if (vm.pincode.length === 5) {
      service.getZipValidation(vm.state, vm.pincode).then(function (response) {
        if (response.zip_present) {
          vm.zipFound = 1;
        } else {
          vm.zipFound = 0;
        }
      });
    }
  };

  vm.submit = function () {
    var categoryName = [];
    for (var key in vm.multiselectModelCategories) {
      var categories = String(vm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    vm.paid = false;
    vm.featured = false;
    if (vm.listing_type === 'paid') {
      vm.paid = true;
    } else if (vm.listing_type === 'featured') {
      vm.featured = true;
    }
    var data = {
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'category_id': categoryName,
      'content_1': vm.content_1,
      'content_2': vm.content_2,
      'content_3': vm.content_3,
      'content_4': vm.content_4,
      'address_line_1': vm.address_line_1,
      'address_line_2': '',
      'city': vm.city,
      'heading_1': 'Overview of Program',
      'heading_2': 'Treatment Approach',
      'heading_3': 'Unique Selling Points',
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.phone,
      'email': vm.email,
      'featured': vm.featured,
      'paid': vm.paid
    };
    var formData = new FormData();
    for (key in data) {
      formData.append('treatment_center[' + key + ']', data[key]);
    }
    if (vm.image_data) {
      var imageData = vm.image_data;
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }
    service.edit(id, formData).then(function ( /* result */ ) {
      $state.go(UIState.MY_PROFILE.MY_CENTERS);
      $rootScope.$emit(Status.SUCCEEDED, Status.CENTER_EDIT_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };
}

module.exports = ['$scope', '$document', '$rootScope', '$log', '$state', 'UIState', 'MapService', 'TreatmentCenterService', 'localStorageService', '$window', ctrl];

function ctrl($scope, $document, $rootScope, $log, $state, UIState, mapService, TreatmentCenterService, localStorageService, $window) {
  // todo
  var vm = $rootScope; // this;
  var lm = this;
  // vm.membership = vm.membershipType;
  vm.membership = localStorageService.get('membershipType');
  $rootScope.activeLink = 'Treatment Center';
  lm.previous = function () {
    // $state.go(UIState.ADD_LISTING.PAID_MEMBER);
    var membership = localStorageService.get('membershipType');
    if (membership === 'free') {
      $state.go(UIState.ADD_LISTING.PAID_MEMBER);
    } else {
      $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
    }
  };
  if (angular.isUndefined(vm.multiselectModelCategories)) {
    vm.multiselectModelCategories = [];
  }
  lm.multiselectModelSettings = {
    scrollableHeight: '160px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    required: true
  };

  lm.addListingCategories = [
    {
      'label': 'Inpatient',
      'id': '1'
    },
    {
      'label': 'Outpatient',
      'id': '2'
    },
    {
      'label': 'Sober Living',
      'id': '3'
    },
    {
      'label': 'Adolescent',
      'id': '4'
    }
  ];

  vm.analyze = function () {};
  mapService.getStates().then(function (response) {
    vm.states = response;
    // console.log('testing' + response.toUpperCase());
  }).catch(function (err) {
    vm.error_message = err;
  });

  vm.getCities = function () {
    var state = vm.state;
    mapService.getCitiesByState(state).then(function (response) {
      vm.cities = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  };

  lm.GoStep5 = function () {
    // saving process is done by saveStep4 rootscope function which is handled in addListing main controller from stateChangeStart
    // this method use to prevent recursing, and add next button feature to top navigation links

    var categoryName = [];
    for (var key in vm.multiselectModelCategories) {
      var categories = String(vm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    var centerInfo = {
      'category_id': categoryName,
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'address_line_1': vm.address_line_1,
      'city': vm.city,
      'country': vm.country,
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.intakephone,
      'email': vm.intakeemail,
      // 'featured': false,
      'listing_type': 'free',
      'phone_validated': $rootScope.intakephoneValidate
    };
    // saving to localStorageService
    if (localStorageService.isSupported) {
      localStorageService.set('addListingCenterInfo', centerInfo, 'sessionStorage');
    }
    // $rootScope.addListingStepDone = 4;
    $rootScope.addListingStepDone = 4;
    // lm.testZip();
    // if (angular.isDefined(lm.zipFound) && lm.zipFound === 1) {
    $state.go(UIState.ADD_LISTING.CENTER_DETAILS);
    // }
  };

  lm.skipStep = function () {
    var membership = localStorageService.get('membershipType');
    if (membership === 'free') {
      $window.location.href = '/#/login';
    }
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['centerDetails']);
    $rootScope.addListingStepDone = 5;
    // $state.go(UIState.ADD_LISTING.PAYMENT_DETAILS);
    $state.go(UIState.ADD_LISTING.SPONSORED_PAGES);
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
  lm.testNum = function () {
    if (angular.isDefined(vm.intakephone)) {
      var len = vm.intakephone.length;
      if (len > 3) {
        var code = vm.intakephone.substring(0, 3);
        if ((usCodes.indexOf(parseInt(code, 10)) === -1)) {
          $rootScope.intakephoneValidate = 0;
          $rootScope.addlistForm.intakephone.$error.pattern = true;
          $rootScope.addlistForm.intakephone.$valid = false;
          $rootScope.addlistForm.intakephone.$invalid = true;
        } else {
          $rootScope.intakephoneValidate = 1;
          $rootScope.addlistForm.intakephone.$error.pattern = false;
          $rootScope.addlistForm.intakephone.$valid = true;
          $rootScope.addlistForm.intakephone.$invalid = false;
        }
      }
    }
    // handles phone num validate issue when user go back
    if ($rootScope.intakephoneValidate) {
      $rootScope.addlistForm.intakephone.$valid = true;
      $rootScope.addlistForm.intakephone.$invalid = false;
      $rootScope.addlistForm.intakephone.$error.pattern = false;
      $rootScope.addlistForm.intakephone.$error.minlength = false;
      $rootScope.addlistForm.intakephone.$error.maxlength = false;
    }
  };
  // test zip code
  lm.zipFound = 0;
  lm.testZip = function () {
    if (angular.isUndefined(vm.pincode)) {
      return;
    }
    if (vm.pincode.length === 5) {
      TreatmentCenterService.getZipValidation(vm.state, vm.pincode).then(function (response) {
        if (response.zip_present) {
          $rootScope.zipcodeValidated = 1;
          lm.zipFound = 1;
        } else {
          $rootScope.zipcodeValidated = 0;
          lm.zipFound = 0;
        }
      });
    }
  };
  if ($rootScope.zipcodeValidated) {
    lm.zipFound = 1;
  }

  // Uploaded image preview
  $scope.uploadImage = function (element) {
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      lm.preview_img = e.target.result;
      $document[0].getElementById('logo_preview').src = lm.preview_img;
    };
  };

  // get values if stored in sessionStorage/localstorage
  if (angular.isDefined(localStorageService.get('addListingCenterInfo', 'sessionStorage'))) {
    var info = localStorageService.get('addListingCenterInfo', 'sessionStorage');
    if (info !== null) {
      for (var key in info.category_id) {
        vm.multiselectModelCategories[key] = {
          id: info.category_id[key]
        };
      }
      vm.center_name = info.center_name;
      vm.description = info.description;
      vm.center_web_link = info.center_web_link;
      vm.listing_image = info.listing_image;
      vm.address_line_1 = info.address_line_1;
      vm.city = info.city;
      vm.country = info.country;
      vm.pincode = info.pincode;
      vm.state = info.state;
      vm.intakephone = info.phone;
      vm.intakeemail = info.email;
      vm.getCities();
      // lm.testZip();
      // handles phone num validate issue when user go back
      if (info.phone_validated) {
        $rootScope.intakephoneValidate = 1;
      }
    }
    // var storageType = localStorageService.getStorageType();
  }
  // get payment skip detail
  if (angular.isDefined(localStorageService.get('addListingCanSkip', 'sessionStorage'))) {
    var canSkip = localStorageService.get('addListingCanSkip', 'sessionStorage');

    if (canSkip !== null) {
      vm.centerSkip = canSkip.centerSkip;
    }
  }

  // after clicking ok form will be reset
  if ($rootScope.centerReset === 1) {
    vm.center_name = null;
    vm.description = null;
    vm.center_web_link = null;
    vm.listing_image = null;
    vm.address_line_1 = null;
    vm.city = null;
    vm.pincode = null;
    vm.state = null;
    vm.intakephone = null;
    vm.intakeemail = null;
    vm.country = null;
    vm.multiselectModelCategories = [];
    $rootScope.centerReset = 0; // reset off
  }

  vm.saveStep4 = function () {
    var categoryName = [];
    for (key in vm.multiselectModelCategories) {
      var categories = String(vm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    $rootScope.centerInfo = {
      'category_id': categoryName,
      'center_name': vm.center_name,
      'description': vm.description,
      'center_web_link': vm.center_web_link,
      'listing_image': vm.listing_image,
      'address_line_1': vm.address_line_1,
      'city': vm.city,
      'country': vm.country,
      'pincode': vm.pincode,
      'state': vm.state,
      'phone': vm.intakephone,
      'email': vm.intakeemail,
      'featured': false,
      'listing_type': 'free',
      'phone_validated': $rootScope.intakephoneValidate
    };
    // $rootScope.addListingStepDone = 4;
    $rootScope.addListingStepDone = 4;
    $rootScope.doneSteps = $rootScope.doneSteps.concat(['centerInfo']);
  };
}

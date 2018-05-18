module.exports = ['Status', '$log', '$rootScope', 'ContactUsService', '$window', 'UIState', '$state', ctrl];

function ctrl(Status, $log, $rootScope, service, $window, UIState, $state) {
  // initialize
  var vm = this;
  $rootScope.title = 'Contact Treatment Center';
  $rootScope.description = 'Contact Treatment Center';
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
          vm.contactUs.phone.$error.pattern = true;
          vm.contactUs.phone.$valid = false;
          vm.contactUs.phone.$invalid = true;
        } else {
          vm.contactUs.phone.$error.pattern = false;
          vm.contactUs.phone.$valid = true;
          vm.contactUs.phone.$invalid = false;
        }
      }
    }
  };
  vm.submit = function () {
    var data = {
      'First_Name': vm.first_name,
      'Last_Name': vm.last_name,
      'Contact_Email': vm.email,
      'Contact_Phone': vm.phone,
      'Other_Comments': vm.message
    };

    var formData = new FormData();
    for (var key in data) {
      formData.append(key, data[key]);
    }
    service.sendMessage(data).then(function (response) {
      // console.log('test: ' + response);
      //  $state.go(UIState.MY_PROFILE.MY_CENTERS);
      $log.error(response);
      vm.clearForm();
      $rootScope.$emit(Status.SUCCEEDED, Status.CONTACTUS_SUCCESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      vm.clearForm();
      $state.go(UIState.CONTACTTREATMENTTHANK);
      //  $window.location.href = '/contact-treatment-center-thank';
      // $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  };

  vm.clearForm = function () {
    vm.first_name = '';
    vm.last_name = '';
    vm.email = '';
    vm.phone = '';
    vm.message = '';
  };
}

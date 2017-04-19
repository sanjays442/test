module.exports = ['$window', '$rootScope', 'Status', '$log', 'MapService', 'TreatmentCenterService', ctrl];

function ctrl($window, $rootScope, Status, $log, mapService, service) {
  var vm = this;
  vm.passRegex = '/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/";//"/^-?[0-9+]*$/';

  vm.passwordStrength = {
    'float': 'left',
    'width': '100px',
    'height': '25px',
    'margin-left': '5px'
  };
  vm.multiselectModelCategories = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false
  };

  vm.addListingCategories = [
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
  vm.submit = function () {
    var formData = new FormData();
    var categoryName = [];
    for (var key in vm.multiselectModelCategories) {
      var categories = String(vm.multiselectModelCategories[key].id);
      categoryName[key] = categories;
    }
    // console.log('category name ' + categoryName);
    if (categoryName.length === 0) {
      $rootScope.$emit(Status.FAILED, 'Please select atleast one category');
      return;
    }
    var sigupData = {
      'email': vm.email,
      'password': vm.password,
      'password_confirmation': vm.confirm_password,
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone,
      'username': vm.username
    };
    for (key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }
    if (vm.center_name !== '') {
      var treatmentcenterData = {
        'center_name': vm.center_name,
        'description': vm.description,
        'center_web_link': vm.center_web_link,
        'listing_image': vm.listing_image,
        'heading_1': 'Overview of Program',
        'heading_2': 'Treatment Approach',
        'heading_3': 'Unique Selling Points',
        'category_id': categoryName,
        // 'heading_4': vm.heading_4,
        'content_1': vm.content_1,
        'content_2': vm.content_2,
        'content_3': vm.content_3,
        // 'content_4': vm.content_4,
        'address_line_1': vm.address_line_1,
        //  'address_line_2': vm.address_line_2,
        'city': vm.city,
        'pincode': vm.pincode,
        'state': vm.state,
        'phone': vm.intakephone,
        'email': vm.intakeemail,
        'featured': false,
        'listing_type': 'free'
      };
      for (key in treatmentcenterData) {
        formData.append('treatment_center[' + key + ']', treatmentcenterData[key]);
      }
    }
    var imageData = vm.image_data;
    if (imageData) {
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }
    vm.email_err = '';
    vm.pass_err = '';
    vm.intakeemail_err = '';
    service.addTreatmentCenterSignUp(formData).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SIGNUP);
      $window.location.href = '/#/login';
    }).catch(function (err) {
      if (err.data.user) {
        if (angular.isDefined(err.data.user.email)) {
          var emailError = err.data.user.email.errors[0];
          $rootScope.$emit(Status.FAILED, emailError);
        }
        if (angular.isDefined(err.data.user.password)) {
          var passError = err.data.user.password.errors[0];
          $rootScope.$emit(Status.FAILED, passError);
        }
        if (angular.isDefined(err.data.user.username)) {
          var userError = err.data.user.username.errors[0];
          $rootScope.$emit(Status.FAILED, userError);
        }
      }
    });
  };
}

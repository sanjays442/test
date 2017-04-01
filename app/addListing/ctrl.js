function ctrl($log, service) {
  var vm = this;
  vm.passRegex = '/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/";//"/^-?[0-9+]*$/';

  vm.passwordStrength = {
    'float': 'left',
    'width': '100px',
    'height': '25px',
    'margin-left': '5px'
  };

  vm.analyze = function () {};

  service.getStates().then(function (response) {
    vm.states = response;
  }).catch(function (err) {
    vm.error_message = err;
  });
  vm.getCities = function () {
    var state = vm.state;
    service.getCities(state).then(function (response) {
      vm.cities = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  };
  vm.submit = function (form) {
    if (!form.$valid) {
      $log.error('Invalid form');
      return;
    }
    var formData = new FormData();
    var sigupData = {
      'email': vm.email,
      'password': vm.password,
      'password_confirmation': vm.confirm_password,
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone
    };
    for (var key in sigupData) {
      formData.append('user[' + key + ']', sigupData[key]);
    }
    if (vm.center_name !== '') {
      var treatmentcenterData = {
        'center_name': vm.center_name,
        'description': vm.description,
        'center_web_link': vm.center_web_link,
        'listing_image': vm.listing_image,
        'heading_1': vm.heading_1,
        'heading_2': vm.heading_2,
        'heading_3': vm.heading_3,
        'heading_4': vm.heading_4,
        'content_1': vm.content_1,
        'content_2': vm.content_2,
        'content_3': vm.content_3,
        'content_4': vm.content_4,
        'address_line_1': vm.address_line_1,
        'address_line_2': vm.address_line_2,
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
    if (vm.image_data) {
      var imageData = vm.image_data;
      var len = imageData.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }
    vm.email_err = '';
    vm.pass_err = '';
    vm.intakeemail_err = '';
    service.addTreatmentCenterSignUp(formData).then(function () {
      location.reload(true);
    }).catch(function (err) {
      if (err.data.user) {
        vm.email_err = err.data.user.email.errors[0];
        vm.pass_err = err.data.user.password.errors[0];
      } else if (err.data.treatment_center) {
        vm.intakeemail_err = err.data.treatment_center.email.errors[0];
      }
    });
  };
}

module.exports = ['$log', 'addTreatmentCenterSignUpService', ctrl];

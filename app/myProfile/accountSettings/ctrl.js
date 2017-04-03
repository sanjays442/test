module.exports = ['$log', '$rootScope', 'Status', 'UserService', ctrl];

function ctrl($log, $rootScope, Status, service) {
  var vm = this;
  vm.onStateUpdate = function (selected) {
    vm.state = selected;
  };
  vm.submit = submit;
  vm.$onInit = function () {
    for (var key in vm.profile) {
      vm[key] = vm.profile[key];
    }
  };

  function submit() {
    var data = {
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      // 'email': vm.email, // can not be changed
      'about_me': vm.about_me,
      'country': vm.country,
      'state': vm.state,
      'city': vm.city,
      'address': vm.address,
      'zipcode': vm.zipcode,
      'phone': vm.phone,
      'profile_pic': vm.profile_pic
    };
    var formData = new FormData();
    for (var key in data) {
      formData.append('user[' + key + ']', data[key]);
    }
    service.editProfile(formData).then(function ( /* result */ ) {
      $rootScope.$emit(Status.SUCCEEDED, Status.PROFILE_EDIT_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }
}

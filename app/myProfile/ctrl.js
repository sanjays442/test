module.exports = ['$log', '$window', 'UserService', ctrl];

function ctrl($log, $window, UserService) {
  var vm = this;
  UserService.queryProfile().then(function (result) {
    vm.profile = result.user;
  }).catch(function (error) {
    // todo, display in message in the frontend page
    $window.location.href = '/#logout';
    $log.error(error);
  });
}

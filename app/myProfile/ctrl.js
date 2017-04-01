module.exports = ['$log', 'UserService', ctrl];

function ctrl($log, UserService) {
  var vm = this;
  UserService.queryProfile().then(function (profile) {
    vm.profile = profile;
  }).catch(function (error) {
    // todo, display in message in the frontend page
    $log.error(error);
  });
}

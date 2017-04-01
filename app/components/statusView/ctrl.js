function ctrl($rootScope, $timeout, Status) {
  var vm = this;
  $rootScope.$on(Status.SUCCEEDED, handleActionStatusEvent);
  $rootScope.$on(Status.FAILED, handleActionStatusEvent);

  function handleActionStatusEvent(event, data) {
    var eventName = event.name;
    vm.visible = true;
    vm.message = data;
    vm.style = eventName === Status.SUCCEEDED ? 'status-succeeded' : 'status-failed';
    $timeout(hide, Status.DURATION);
  }

  function hide() {
    vm.visible = false;
    vm.message = '';
  }
}

module.exports = ['$rootScope', '$timeout', 'Status', ctrl];

function ctrl($rootScope, $timeout, Status) {
  var vm = this;
  var unbindFn1 = $rootScope.$on(Status.SUCCEEDED, handleActionStatusEvent);
  var unbindFn2 = $rootScope.$on(Status.FAILED, handleActionStatusEvent);
  vm.$onDestroy = onDestroy;

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

  function onDestroy() {
    unbindFn1();
    unbindFn2();
  }
}

module.exports = ['$rootScope', '$timeout', 'Status', ctrl];

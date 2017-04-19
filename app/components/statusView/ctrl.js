function ctrl($rootScope, $timeout, Status) {
  var unbindFn1;
  var unbindFn2;
  var vm = this;
  vm.$onInit = onInit;
  vm.$onDestroy = onDestroy;

  function onInit() {
    unbindFn1 = $rootScope.$on(Status.SUCCEEDED, handleActionStatusEvent);
    unbindFn2 = $rootScope.$on(Status.FAILED, handleActionStatusEvent);
  }

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

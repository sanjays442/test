module.exports = ['$log', '$rootScope', ctrl];

function ctrl($log, $rootScope) {
  var vm = this;
  vm.$onInit = onInit;
  vm.$onDestory = onDestory;
  var unbind;

  function onInit() {
    unbind = $rootScope.$on('AdChanged', function (event, data) {
      vm.src = data.advertisements.footer.image;
      vm.url = data.advertisements.footer.url;
    });
  }

  function onDestory() {
    unbind();
  }
}

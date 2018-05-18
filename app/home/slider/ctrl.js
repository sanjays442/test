module.exports = ['$rootScope', 'SliderService', ctrl];

function ctrl($rootScope, service) {
  var vm = this;
  if (angular.isDefined($rootScope.sliders) && $rootScope.sliders !== null) {
    vm.sliders = $rootScope.sliders;
  } else {
    vm.$onInit = onInit;
  }
  vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;

  function onInit() {
    service.getSlider().then(function (result) {
      vm.sliders = result.sliders;
      $rootScope.sliders = result.sliders;
    });
  }
}

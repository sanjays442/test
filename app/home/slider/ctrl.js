module.exports = ['SliderService', ctrl];

function ctrl(service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.myInterval = 5000;
  vm.noWrapSlides = false;
  vm.active = 0;
  function onInit() {
    service.getSlider().then(function (result) {
      vm.sliders = result.sliders;
    });
  }
}

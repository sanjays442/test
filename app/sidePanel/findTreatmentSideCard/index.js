function FindTreatmentSideCardCtrl() {
  var vm = this;
  vm.onStateUpdate = function (selected) {
    vm.selectedState = selected;
  };
  vm.submit = function () {

  };
}
module.exports = {
  template: require('./view.html'),
  controller: FindTreatmentSideCardCtrl
};

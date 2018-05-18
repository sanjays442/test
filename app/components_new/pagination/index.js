function PaginationCtrl() {
  var vm = this;
  vm.range = range;
  vm.goto = goto;
  vm.gotoPrevious = gotoPrevious;
  vm.gotoNext = gotoNext;

  function range(number) {
    var arr = [];
    for (var i = 1; i <= number; i++) {
      arr.push(i);
    }
    return arr;
  }

  function goto(page) {
    if (page !== vm.currentPage) {
      vm.currentPage = page;
      vm.onUpdate({
        'page': vm.currentPage
      });
    }
  }

  function gotoPrevious() {
    if (vm.currentPage > 1) {
      goto(vm.currentPage - 1);
    }
  }

  function gotoNext() {
    if (vm.currentPage < vm.totalPages) {
      goto(vm.currentPage + 1);
    }
  }
}

module.exports = {
  template: require('./view.html'),
  controller: PaginationCtrl,
  bindings: {
    order: '<',
    totalPages: '<',
    currentPage: '<',
    onUpdate: '&'
  }
};

var ids = require('./sponserIds.json');

function SpnIdSelectctrl() {
  var vm = this;
  vm.ids = ids;
}

module.exports = {
  template: require('./view.html'),
  controller: SpnIdSelectctrl,
  bindings: {
    onUpdate: '&'
  }
};

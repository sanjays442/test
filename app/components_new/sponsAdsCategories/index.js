var catgs = require('./catagories.json');

function CatgSelectctrl() {
  var vm = this;
  vm.catgs = catgs;
}

module.exports = {
  template: require('./view.html'),
  controller: CatgSelectctrl,
  bindings: {
    onUpdate: '&'
  }
};

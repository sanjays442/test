function CenterTableCtrl() {
  // todo
}

module.exports = {
  template: require('./view.html'),
  controller: CenterTableCtrl,
  bindings: {
    'centers': '=',
    'onActivate': '&',
    'onDelete': '&'
  }
};

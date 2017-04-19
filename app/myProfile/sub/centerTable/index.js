module.exports = {
  template: require('./view.html'),
  bindings: {
    'centers': '=',
    'onActivate': '&',
    'onDelete': '&'
  }
};

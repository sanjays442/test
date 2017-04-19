module.exports = {
  template: require('./view.html'),
  controller: require('./ctrl'),
  bindings: {
    centerId: '<',
    onSubmitSuccess: '&'
  }
};

module.exports = {
  template: require('./view.html'),
  bindings: {
    area: '<',
    cities: '<',
    displayError: '<',
    goToCity: '&'
  }
};

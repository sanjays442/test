var moduleName = 'app.advertisement';

angular.module(moduleName, [
  'ui.router',
  require('../services')
]).controller('advertisementCtrl', require('./ctrl'));

module.exports = moduleName;

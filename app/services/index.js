var angular = require('angular'),
  moduleName = 'app.services';

angular.module(moduleName, [])
  .service('UserService', require('./userService'))
  .factory('TreatmentCenterService', require('./treatmentCenterService'));

module.exports = moduleName;

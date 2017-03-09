var angular = require('angular'),
  ctrl = require('./ctrl'),
  htmlTemplate = require('./view.html'),
  moduleName = 'com.inquiryFormCard';

angular.module(moduleName, []).component('inquiryFormCard', {
  template: htmlTemplate,
  controller: 'InquiryFormCardCtrl'
}).controller('InquiryFormCardCtrl', ctrl);

module.exports = moduleName;

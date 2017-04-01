var angular = require('angular'),
  moduleName = 'app.SponsorAds';
angular.module(moduleName, ['ui.router', 'angularjs-dropdown-multiselect', require('../components')])
  .factory('SponsorService', require('../services/sponsorAdsService'))
  .component('sponsorAdsListMain', require('./list/main'))
  .component('sponsorAdsList', {
    template: require('./list/view.html'),
    controller: 'SponsorAdsCtrl'
  })
  .component('sponsorAdsAddMain', require('./add/main'))
  .component('sponsorAdsAdd', {
    template: require('./add/view.html'),
    controller: 'SponsorAdsCtrl'
  })
  .component('sponsorAdsEditMain', require('./edit/main'))
  .component('sponsorAdsEdit', {
    template: require('./edit/view.html')
  })
  .component('sponsorAdsViewMain', require('./view/main'))
  .component('sponsorAdsView', {
    template: require('./view/view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'sponsorAdsList',
      url: '/sponsor-ads',
      template: '<sponsor-ads-list></sponsor-ads-list>'
    }).state({
      name: 'sponsorAdsAdd',
      url: '/sponsor-ads-add',
      template: '<sponsor-ads-add></sponsor-ads-add>'
    }).state({
      name: 'sponsorAdsEdit',
      url: '/sponsor-ads-edit/:id',
      template: '<sponsor-ads-edit></sponsor-ads-edit>'
    }).state({
      name: 'sponsorAdsView',
      url: '/sponsor-ads-view/:id',
      template: '<sponsor-ads-view></sponsor-ads-view>'
    });
  }])
  .controller('SponsorAdsCtrl', require('./list/ctrl'));
// .directive('ngDropdownMultiselect', require('./edit/main/multiselectDirective'));
// .directive('ngDropdownMultiselect', //require('../components/multiselectDropdown/multiselectDirective'));

module.exports = moduleName;

var angular = require('angular'),
  moduleName = 'app.BannerAds';
angular.module(moduleName, ['ui.router', require('../components')])
  .factory('AdvertisementService', require('../services/advertisementService'))
  .component('bannerAdsListMain', require('./list/main'))
  .component('bannerAdsList', {
    template: require('./list/view.html'),
    controller: 'BannerAdsCtrl'
  })
  .component('bannerAdsAddMain', require('./add/main'))
  .component('bannerAdsAdd', {
    template: require('./add/view.html'),
    controller: 'BannerAdsCtrl'
  })
  .component('bannerAdsEditMain', require('./edit/main'))
  .component('bannerAdsEdit', {
    template: require('./edit/view.html')
  })
  .component('bannerAdsViewMain', require('./view/main'))
  .component('bannerAdsView', {
    template: require('./view/view.html')
  })
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state({
      name: 'bannerAdsList',
      url: '/my-profile/banner-ads',
      template: '<banner-ads-list></banner-ads-list>'
    }).state({
      name: 'bannerAdsAdd',
      url: '/my-profile/banner-ads-add',
      template: '<banner-ads-add></banner-ads-add>'
    }).state({
      name: 'bannerAdsEdit',
      url: '/my-profile/banner-ads-edit/:id',
      template: '<banner-ads-edit></banner-ads-edit>'
    }).state({
      name: 'bannerAdsView',
      url: '/my-profile/banner-ads-view/:id',
      template: '<banner-ads-view></banner-ads-view>'
    });
  }])

  .controller('BannerAdsCtrl', require('./list/ctrl'));

module.exports = moduleName;

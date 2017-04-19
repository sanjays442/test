module.exports = ['$log', 'AdvertisementService', '$scope', '$rootScope', '$document', ctrl];

function ctrl($log, service, $scope, $rootScope, $document) {
  $scope.$on('$stateChangeSuccess',
    function () {
      service.queryGlobalAds().then(function (result) {
        var header = angular.element($document[0].querySelector('#header_ad'));
        var headerUrl = angular.element($document[0].querySelector('#header_ad_url'));
        var sidebar = angular.element($document[0].querySelector('#sidebar_ad'));
        var sidebarUrl = angular.element($document[0].querySelector('#sidebar_ad_url'));
        $rootScope.$emit('AdChanged', result);
        header.attr('src', result.advertisements.header.image);
        headerUrl.attr('href', result.advertisements.header.url);
        headerUrl.attr('target', '_blank');
        sidebar.attr('src', result.advertisements.side_bar.image);
        sidebarUrl.attr('href', filter(result.advertisements.side_bar.url));
        sidebarUrl.attr('target', '_blank');
      }).catch(function (err) {
        // todo, display the error message in the page.
        $log.error(err);
      });
    });
}

function filter(link) {
  var httpProto = 'http://',
    httpsProto = 'https://';

  if (!link) {
    return '';
  }
  var i = link.search(httpProto);
  // the link starts with 'http://'
  if (i === 0) {
    return link;
  }
  i = link.search(httpsProto);
  // the link starts with 'https://'
  if (i === 0) {
    return link;
  }
  // the link does not start with 'http://' nor 'https://'
  return httpProto + link;
}

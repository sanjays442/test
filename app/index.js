var appName = 'AddictionNetworkApp';

angular.module(appName, [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  require('./home'),
  require('./sponsorHome'),
  require('./treatmentCenterDetail'),
  require('./treatmentCenterMap'),
  require('./advertisement'),
  require('./myProfile'),
  require('./featuredTreatmentCenter'),
  // require('./addListing'),
  require('./aboutUs'),
  require('./contactUs'),
  require('./contactThank'),
  require('./insuranceThank'),
  require('./login'),
  require('./logout'),
  require('./blog'),
  require('./contactCustomer'),
  require('./contactCustomerThank'),
  require('./contactTreatmentCenter'),
  require('./contactTreatmentThank'),
  require('./loginHelp'),
  require('./insurance'),
  require('./searchState'),
  require('./notFound'),
  require('./about'),
  require('./signUp'),
  require('./privacyPolicy')
]).component('header', require('./header'))
  .component('footer', require('./footer'))
  .constant('endPoint', require('./endPoint'))
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    // .when('/customers', route.resolve('Customers'))
    // $urlRouterProvider.otherwise('');
    // alert('india');
    angular.element(document).ready(function () {

      LateImage.defaults = {
        srcAttribute: 'data-src',
        altAttribute: 'data-alt',
        doneCallback: null,
        failCallback: null,
        threshold: 0,
        loadingClass: 'lateImageLoading',
        loadedClass: 'lateImageLoaded',
        errorClass: 'lateImageError',
        enableViewportCheck: false
      };
      angular.element('img').lateImages();
      // var elements = Array.prototype.slice.call(
      //   document.getElementsByClassName('lateImage')
      // );
      //
      // elements.forEach(function (element) {
      //   new LateImage(element);
      // });
      angular.element('body').click(function () {
        angular.element('.list-group.search-results').addClass('ng-hide');
        // alert('clicked');
      });
      angular.element('.btn.btn-success').click(function (e) {
        e.stopPropagation();
      });
    });
    $urlRouterProvider.otherwise(function () {
      angular.element(document).ready(function () {
        var path = angular.element(location).attr('pathname');
        var slug = path.replace('/', '');
        // var removeSlash = slug.replace('/', '');
        angular.element.get('//blog.addictionnetwork.com/blog/post_exist.php?slug=' + slug, function (data, status) {
          if (status === 'success') {
            if (data > 0) {
              window.location.href = '/blog/' + slug;
            } else {
              window.location.href = '/404';
              // $urlRouterProvider.otherwise('/');
              // window.location.href = '/';
            }
          }
        });
      });
    });
  }]);

// eslint-disable-next-line angular/document-service
angular.bootstrap(document.getElementsByTagName('html')[0], [appName]);

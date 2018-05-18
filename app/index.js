var appName = 'AddictionNetworkApp';

angular.module(appName, [
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'LocalStorageModule',
  'oc.lazyLoad',
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
  .config(['$ocLazyLoadProvider', 'UIState', function ($ocLazyLoadProvider, UIState) {
    //Config For ocLazyLoading
    $ocLazyLoadProvider.config({
      'debug': true, // For debugging 'true/false'
      'events': true, // For Event 'true/false'
      'modules': [{ // Set modules initially
        name: 'preload', // State1 module
        files: ['app/header/index.js', 'app/footer/index.js', 'app/home/slider/index.js', 'app/home/featuredTreatmentCenter/index.js',
         'https://s3.amazonaws.com/addictionnetwork.com/production/uploads/681/advertisements/91/footer.jpg',
        'https://s3.amazonaws.com/addictionnetwork.com/production/uploads/737/advertisements/102/header.jpg',
        'https://s3.amazonaws.com/addictionnetwork.com/production/uploads/637/treatment_centers/927/listing.png',
        'https://s3.amazonaws.com/addictionnetwork.com/production/uploads/sliders/4/doctors2-1630x468.jpg',
        'https://s3.amazonaws.com/addictionnetwork.com/production/uploads/sliders/3/view1-1630x468.jpg'
      ]
            }]
    });
  }])
  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
  }])
  .config(['$urlRouterProvider', function ($urlRouterProvider) {
    // .when('/customers', route.resolve('Customers'))
    // $urlRouterProvider.otherwise('');
    // alert('india');
    angular.element(document).ready(function () {
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

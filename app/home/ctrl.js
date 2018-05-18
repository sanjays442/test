module.exports = ['$stateParams', '$rootScope', 'localStorageService', 'Status', '$state', 'UIState', '$location', '$scope', ctrl];

function ctrl($stateParams, $rootScope, localStorageService, Status, $state, UIState, $location, $scope) {
  // .controller('rootCtrl', function ($scope, $location, $rootScope) {
  $scope.$on('$stateChangeSuccess', function changedPage() {
    var path = $location.path();
    $rootScope.url = $location.absUrl();
    var replaceSlash = path.replace('/', '');
    var words = replaceSlash.split('-');
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    var title = words.join(' ');
    if (title) {
      //  $scope.title = title.replace(/\/$/, '');
      // $rootScope.testing = 'besting';
    } else {
      $rootScope.title = 'Addiction Network';
      $rootScope.description = 'Addiction Network is an entirely free, comprehensive service designed to assist anyone seeking substance abuse and addiction treatment for themselves, or a loved one, the find the best rehab available. Our services are here to assist in providing every level of care and every different type of facility available in the industry. The site was designed to address the growing need to make addiction treatment options available to anyone. With so many people in America struggling with addiction, alcoholism, and substance abuse, the founders of Addiction Network noticed that it was extremely difficult for the average person to easily access the various treatment options that are out there. This makes finding a rehab that works, for your specific needs, very difficult.';
    }
  });
  // });
  // })
  if ($stateParams.auth_token) {
    localStorageService.set('token', $stateParams.auth_token);
    $rootScope.login = 1;
    $rootScope.$emit(Status.SUCCEEDED, 'You are logged in');
    // $window.location.href = '/my-profile/profile';
    $state.go(UIState.MY_PROFILE.PROFILE);
  }
}

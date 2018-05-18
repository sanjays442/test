module.exports = ['$rootScope', '$element', ctrl];

function ctrl(rootScope, $element) {
  rootScope.activeLink = 'Featured Listing';
  rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
    var forward = toState.name > fromState.name;
    if (forward) {
      $element.removeClass('backward');
    } else {
      $element.addClass('backward');
    }
  });
}

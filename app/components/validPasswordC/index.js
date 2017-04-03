function validPasswordC() {
  return {
    require: 'ngModel',
    scope: {
      reference: '=validPasswordC'
    },
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        var noMatch = viewValue !== scope.reference;
        if (noMatch) {
          ctrl.$setValidity('noMatch', !noMatch);
          return (noMatch) ? noMatch : !noMatch;
        }
        ctrl.$setValidity('noMatch', !noMatch);
        return viewValue;
      });

      scope.$watch('reference', function (value) {
        ctrl.$setValidity('noMatch', value === ctrl.$viewValue);
      });
    }
  };
}

module.exports = ['$parse', validPasswordC];

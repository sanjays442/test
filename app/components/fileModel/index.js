function fileModel($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var model = $parse(attrs.fileModel);
      var multiple = attrs.multiple;
      var modelSetter = model.assign;
      element.bind('change', function () {
        scope.$apply(function () {
          if (multiple) {
            modelSetter(scope, element[0].files);
          } else {
            modelSetter(scope, element[0].files[0]);
          }
        });
      });
    }
  };
}

module.exports = ['$parse', fileModel];

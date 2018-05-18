var moduleName = 'app.sidePanel';

require('./style.css');

angular.module(moduleName, [require('../components')])
  .component('areaFilterCard', require('./areaFilterCard'))
  .component('findTreatmentSideCard', require('./findTreatmentSideCard'))
  .component('sideCard', require('./sideCard'))
  .filter('capitalize', function () {
    return function (input, all) {
      if (angular.isUndefined(input)) {
        return '';
      }
      var text = input.replace('-', ' ');
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!text) ? text.replace(reg, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) : '';
    };
  })

  .component('sidePanel', {
    template: require('./view.html')
  });

module.exports = moduleName;

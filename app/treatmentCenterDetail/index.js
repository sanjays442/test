require('./style.css');

var moduleName = 'app.treatmentCenterDetail';

angular.module(moduleName, [
  'ui.router',
  require('../services')
]).component('inquiryFormCard', require('./inquiryFormCard'))
  .component('centerDetailCarousel', require('./carousel'))
  .component('reviewRating', require('./reviewRating'))
  .component('reviewListBox', require('./reviewListBox'))
  .component('reviewFormBox', require('./reviewFormBox'))
  .component('treatmentCenterDetail', {
    template: require('./view.html'),
    controller: require('./ctrl')
  })
  .config(['$stateProvider', 'UIState', function ($stateProvider, UIState) {
    $stateProvider.state({
      name: UIState.CENTER_DETAIL,
      url: '/treatment-center-detail/:id',
      template: '<treatment-center-detail></treatment-center-detail>'
    });
  }]);

module.exports = moduleName;

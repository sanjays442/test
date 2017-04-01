module.exports = ['$log', '$httpParamSerializer', '$sce', '$scope', '$stateParams', 'Status', 'TreatmentCenterService', ctrl];

// center_images: [{
//  id:
//  file:
// }]

function ctrl($log, $httpParamSerializer, $sce, $scope, $stateParams, Status, service) {
  var vm = this;
  vm.$onInit = onInit;
  $scope.$on(Status.RATING_SUBMIT_SUCCEEDED, function () {
    onInit();
  });

  function onInit() {
    var id = $stateParams.id;
    service.queryDetail(id).then(function (result) {
      result.address = result.address_line_1 + result.address_line_2;
      result.center_images = [];
      // result.center_images = ['http://www.addictionnetwork.com/wp-content/uploads/gallery_images/slider_images/1428557245-iStock_000009792758_Full.jpg',  'http://www.addictionnetwork.com/wp-content/uploads/gallery_images/slider_images/1425072178-ERP.jpg'];
      //
      var qs = $httpParamSerializer({
        q: result.address,
        ie: 'UTF8',
        hq: '',
        hnear: result.address,
        z: 11,
        iwloc: 'near',
        output: 'embed'
      });
      result.mapLink = $sce.trustAsResourceUrl('https://maps.google.com/maps?' + qs);
      vm.entry = result;
    }).catch(function (err) {
      $log.error(err);
    });
  }
}

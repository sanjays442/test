// {
//  rating: {
//    star: 4,
//    name: ‘Name’,
//    review: ‘Review’
//  }
// }

module.exports = ['$log', '$rootScope', '$scope', 'Status', 'TreatmentCenterService', ctrl];

function ctrl($log, $rootScope, $scope, Status, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.showAndHideInput = showAndHideInput;
  vm.hideInput = hideInput;
  vm.updateStar = updateStar;
  vm.submit = submit;

  // $onInit hook
  function onInit() {
    vm.star = 0;
    vm.hidden = true;
  }

  // when click 'Submit Review' button, show or hide the form
  function showAndHideInput() {
    vm.hidden = !vm.hidden;
  }

  // when click 'Cancel' button, hide the form
  function hideInput() {
    vm.hidden = true;
  }

  // callback function form onStarUpdate event of review-rating
  function updateStar(star) {
    vm.star = star;
  }

  // submit the form
  function submit() {
    var centerId = vm.centerId;
    var data = {
      rating: {
        star: vm.star,
        name: vm.name,
        review: vm.review
      }
    };
    service.submitRating(centerId, data).then(function () {
      vm.star = 0;
      vm.name = '';
      vm.review = '';
      $rootScope.$emit(Status.SUCCEEDED, Status.SUBMIT_SUCCESS_MSG);
      $scope.$emit(Status.RATING_SUBMIT_SUCCEEDED);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
    });
  }
}

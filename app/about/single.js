module.exports = ['BlogService', '$log', '$state', '$sce', '$rootScope',
  ctrl];

function ctrl(service, $log, $state, $sce, $rootScope) {
  var vm = this;
  var $stateParams = $state.params;
  vm.singleBlog = $stateParams.single;
  service.getBlogSingleAbout(vm.singleBlog).then(function (result) {
    vm.result = result.data;
    $rootScope.title = result.data[0].post_title;
    $rootScope.description = result.data[0].post_content;
    vm.content = $sce.trustAsHtml(result.data[0].post_content);
    //  vm.html = $sce.trustAsHtml('<script>alert(testing)</script>');
    // $window.scrollTo(0, 0);
  }).catch(function (err) {
    $log.info(err);
  });
}

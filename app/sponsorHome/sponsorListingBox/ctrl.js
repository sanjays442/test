module.exports = ['$log', '$state', 'UIState', 'TreatmentCenterService', 'MapService', '$sce', '$rootScope', ctrl];

function ctrl($log, $state, UIState, service, mapService, $sce, $rootScope) {
  var vm = this;
  vm.$onInit = onInit;
  vm.getShortNameMap = getShortNameMap;
  vm.goToCity = goToCity;
  vm.goToCounty = goToCounty;

  function getShortNameMap(str) {
    var short = mapService.getShortName(str);
    if (short) {
      return short.toLowerCase(short);
    }
    return false;
  }

  function convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  function goToCity(city) {
    // go to single city of state
    $state.go(UIState.SPONSOR_HOME.CITY, {
      stateName: convertToSlug(vm.stateName),
      // countyName: '', // convertToSlug(countyName),
      cityName: convertToSlug(city.cityName)
    });
  }

  function goToCounty(county) {
    // go to single countyof state
    $state.go(UIState.SPONSOR_HOME.COUNTY, {
      stateName: convertToSlug(vm.stateName),
      countyName: convertToSlug(county.countyName)
    });
  }

  function onInit() {
    var keyword = '';
    var $stateParams = $state.params;
    vm.stateName = $state.params.stateName;
    if ($state.is(UIState.SPONSOR_HOME.FILTER)) {
      keyword = $stateParams.filterName;
    }
    if ($state.is(UIState.SPONSOR_HOME.STATE)) {
      // keyword = $stateParams.stateName;
      keyword = getShortNameMap($stateParams.slug);
      // alert(keyword);
      //  keyword = $stateParams.slug;
      // console.log(keyword);
      // alert(keyword);
    }
    if ($state.is(UIState.SPONSOR_HOME.COUNTY)) {
      keyword = $stateParams.countyName;
    }
    if ($state.is(UIState.SPONSOR_HOME.CITY)) {
      keyword = $stateParams.cityName;
    }
    if (!keyword) {
      // $state.go(UIState.HOME);
      $state.go(UIState.NOT_FOUND);
      return;
    }
    if (keyword === 'cities') {
      //  return;
    }
    service.querySponsoredListings(keyword).then(function (result) {
      vm.entry = result;
      $rootScope.title = $sce.trustAsHtml(result.heading_1);
      $rootScope.description = $sce.trustAsHtml(result.content_1);
      var content1 = result.content_1;
      var script = '<script>(function (i, n, v, o, c, a){i.InvocaTagId = o;var s = n.createElement("script");s.type = "text/javascript";s.async = true;s.src = ("https:" === n.location.protocol ? "https://" : "http://") + v;var fs = n.getElementsByTagName("script")[0];fs.parentNode.insertBefore(s, fs);})(window, document, "solutions.invocacdn.com/js/pnapi_integration-latest.min.js", "1282/3910429119")</script>';
      vm.content1 = $sce.trustAsHtml(content1 + script);
      vm.content2 = $sce.trustAsHtml(result.content_2);
      vm.displayError = false;
    }).catch(function (err) {
      vm.displayError = true;
      $log.error(err);
    });
  }
}

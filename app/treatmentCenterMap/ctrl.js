function ctrl($log, $scope, $location, $stateParams, service) {
  var vm = this;

  service.getStates().then(function (response) {
    vm.states = response;
  }).catch(function (err) {
    vm.error_message = err;
  });

  var url = window.location.href;

  if (window.location.href.indexOf('srch-keyword') > -1) {
    $scope.hide_map = 'hide';
  } else {
    $scope.hide_map = 'show';
  }
  var mapState = $stateParams.mapState;
  var zipcode = getParameterByName('zip');
  if (zipcode) {
    var zipcodeSelect = angular.element(document.querySelector('#search_zip'));
    zipcodeSelect.attr('value', zipcode);
  }
  var miles = getParameterByName('distance');
  var state = getParameterByName('state');
  vm.currentState = state;
  vm.selected = 'selected = selected';
  var isSearch = getParameterByName('srch-keyword');
  if (state) {
    var newstate = state.split(':');
    if (newstate[1]) {
      state = newstate[1];
    }
  }
  var cat = getarrayValue(url);
  if (isSearch === 'search') {
    var finalData = {
      'zipcode': zipcode,
      'miles': miles,
      'state': state,
      'categories': cat
    };
  } else if (mapState) {
    finalData = {
      state: mapState
    };
    $scope.hide_map = 'hide';
  } else {
    $scope.hide_map = 'show';
  }
  service.queryBySearch(finalData).then(function (result) {
    // result.address = result.address_line_1 + result.address_line_1;
    var data = result.data.listings;
    if (!data || !data.length) {
      var noResult = angular.element(document.querySelector('#no_results'));
      noResult.removeAttr('class');
    }
    $scope.search_by_filter = data;
  }).catch(function (err) {
    $log.error(err);
  });
}

module.exports = ['$log', '$scope', '$location', '$stateParams', 'TreatmentcenterMapService', ctrl];

function getParameterByName(name, url) {
  if (window.location.href.indexOf('srch-keyword') > -1) {
    if (!url) {
      var path = url;
      path = window.location.href;
    }
    var stateName = name;
    stateName = stateName.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + stateName + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(path);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  return url;
}

function getarrayValue(url) {
  if (window.location.href.indexOf('catg') > -1) {
    var str = decodeURIComponent(url);
    var match = str.match(/[^=&?]+\s*=\s*[^&#]*/g);
    var obj = {};
    for (var i = match.length; i--;) {
      var spl = match[i].split('=');
      var name = spl[0].replace('[]', '');
      var value = spl[1];
      obj[name] = obj[name] || [];
      obj[name].push(value);
      var category = angular.element(document.querySelector('#category_search_' + value));
      category.attr('checked', 'checked');
    }
    return obj.catg.join(',');
  }
  return null;
}

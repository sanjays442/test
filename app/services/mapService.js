module.exports = ['$http', 'endPoint', 'mapConfig', service];

function service($http, endPoint, mapConfig) {
  return {
    getStates: getStates,
    getCitiesByState: getCitiesByState,
    getCitiesWithCountyByState: getCitiesWithCountyByState,
    getCountiesByState: getCountiesByState,
    getCitiesByCounty: getCitiesByCounty,
    getStateFullname: stateFullName,
    getShortName: getShortName
  };

  function getFullname(shortname) {
    if (shortname.length > 2) {
      // it is a full name
      return shortname;
    }
    var stateObj = mapConfig.states.find(compare(shortname));
    return stateObj ? stateObj.fullname : null;
  }

  function getShortName(fullname) {
    var stateObj = mapConfig.states.find(compareShort(fullname));
    return stateObj ? stateObj.shortname : null;
  }

  function stateFullName(shortname) {
    if (shortname.length > 2) {
      // it is a full name
      return shortname;
    }
    var stateObj = mapConfig.states.find(compare(shortname));
    return stateObj ? stateObj.fullname : null;
  }

  function compare(source) {
    return function (target) {
      return source === target.shortname;
    };
  }

  function compareShort(source) {
    return function (target) {
      return source === target.slugState;
    };
  }

  function getStates() {
    return $http.get(endPoint + '/states');
  }

  // function getCitiesByState(state) {
  //   var fullname = getFullname(state);
  //   return $http.get(endPoint + '/cities_states/' + fullname).then(function (result) {
  //     var flattened = result.reduce(function (accumulator, current) {
  //       return accumulator.concat(current.cities);
  //     }, []);
  //     flattened.sort();
  //     return flattened;
  //   });
  // }
  function getCitiesByState(state) {
    var fullname = getFullname(state);
    return $http.get(endPoint + '/cities_states_slugs/' + fullname);
  }

  function getCitiesWithCountyByState(state) {
    var fullname = getFullname(state);
    return $http.get(endPoint + '/cities_states/' + fullname);
  }

  function getCountiesByState(state) {
    var fullname = getFullname(state);
    return $http.get(endPoint + '/counties_slugs/' + fullname);
  }

  function getCitiesByCounty(county) {
    return $http.get(endPoint + '/cities/' + county);
  }
}

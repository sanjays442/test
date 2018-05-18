module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

function service($log, $http, endPoint, UserService) {
  return {
    getCartInfo: getCartInfo,
    getSignupPriceInfo: getSignupPriceInfo,
    getPriceInfo: getPriceInfo
  };

  // getCartInfo
  function getCartInfo(countyIdApi, cityIdsApi) {
    return $http.get(endPoint + '/get_counties_cities_by_ids?counties_ids=' + countyIdApi + '&cities_ids=' + cityIdsApi);
  }

  // get price info for state, city, county, sponsored
  function getPriceInfo() {
    return UserService.getToken().then(function (token) {
      return $http.get(endPoint + '/pricing', {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  function getSignupPriceInfo(token) {
    return $http.get(endPoint + '/pricing', {
      headers: {
        'Authorization': token
      }
    });
  }
}

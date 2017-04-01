function service($http, endPoint) {
  return {
    queryBySearch: function (finalData) {
      return $http.post(endPoint + '/search_treatment_centers', finalData);
    },
    getStates: function () {
      var req = $http({
        url: endPoint + '/states',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return req.then(function (res) {
        return res.data;
      });
    }
  };
}

module.exports = ['$http', 'endPoint', service];

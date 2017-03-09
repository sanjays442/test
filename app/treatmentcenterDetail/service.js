function service($http, endPoint) {
  return {
    queryById: function (id) {
      var req = $http.get(endPoint + '/treatment_center/' + id + '/detail')
      return req.then(function (res) {
        var statusCode = res.status;
        return res.data;
      });
    }
  };
}

module.exports = ['$http', 'endPoint', service];

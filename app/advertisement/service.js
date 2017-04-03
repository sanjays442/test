function service($log, $http, endPoint) {
  var errorMsg = 'Oops! An error occured, we are unable to retrieve data.';
  return {
    query: function () {
      var req = $http.get(endPoint + '/advertisements');
      return req.then(function (res) {
        var status = res.status;
        if (status === 200) {
          return res.data;
        }
        return $log.error(errorMsg);
      }).catch(function (error) {
        $log.error(error);
      });
    }
  };
}

module.exports = ['$log', '$http', 'endPoint', service];

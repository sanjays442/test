function service($http, endPoint, UserService) {
  return {
    addTreatmentCenterSignUp: function (formData) {
      return UserService.getToken().then(function (result) {
        var token = result;
        var req = $http({
          url: endPoint + '/registrations',
          method: 'POST',
          data: formData,
          transformRequest: angular.identity,
          headers: {
            'Authorization': token,
            'Content-Type': undefined
          }
        });
        return req.then(function (res) {
          return res.data;
        });
      }).catch(function (error) {
        throw error;
      });
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
    },
    getCities: function (state) {
      var req = $http({
        url: endPoint + '/cities_states/' + state,
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
module.exports = ['$http', 'endPoint', 'UserService', service];

module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

function service($log, $http, endPoint, UserService) {
  return {
    queryGlobalAds: queryGlobalAds,
    paymentList: list,
    paymentDetailsAdd: add,
    paymentDetailsEdit: edit,
    removePaymentDetails: remove,
    paymentDetailsAddSignup: paymentDetailsAddSignup,
    setDefaultCard: setDefaultCard
  };

  // header, footer, side
  function queryGlobalAds() {
    return $http.get(endPoint + '/payments');
  }

  function list() {
    return UserService.getToken()
      .then(function (token) {
        return $http({
          url: endPoint + '/listing_user/payments',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });
      });
  }

  function add(formdata) {
    return UserService.getToken()
      .then(function (token) {
        return $http({
          url: endPoint + '/listing_user/payments',
          method: 'POST',
          data: formdata,
          transformRequest: angular.identity,
          headers: {
            'Authorization': token,
            'Content-Type': undefined
          }
        });
      });
  }

  function paymentDetailsAddSignup(formdata, token) {
    return $http({
      url: endPoint + '/listing_user/payments',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function edit(id, formdata) {
    return UserService.getToken()
      .then(function (token) {
        return $http({
          url: endPoint + '/listing_user/payments/' + id,
          method: 'PATCH',
          data: formdata,
          transformRequest: angular.identity,
          headers: {
            'Authorization': token,
            'Content-Type': undefined
          }
        });
      });
  }

  function remove(id) {
    return UserService.getToken()
      .then(function (token) {
        return $http.delete(endPoint + '/listing_user/payments/' + id, {
          headers: {
            'Authorization': token
          }
        });
      });
  }

  function setDefaultCard(paymentId) {
    return UserService.getToken()
      .then(function (token) {
        return $http({
          // url: endPoint + '/v2/banner_ads/' + id,
          url: endPoint + '/listing_user/payments/' + paymentId + '/set_default',
          method: 'POST',
          // data: formData,
          transformRequest: angular.identity,
          headers: {
            'Authorization': token,
            'Content-Type': undefined
          }
        });
      });
  }
}

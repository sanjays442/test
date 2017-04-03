function service($log, $http, endPoint, UserService) {
  return {
    advertisementList: list,
    advertisementAdd: add,
    advertisementEdit: edit,
    getAdvertisementData: getData,
    updateStatus: updateStatus
  };

  function list() {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http({
        url: endPoint + '/listing_user/banner_ads',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      return _handle(req);
    });
  }

  function add(formdata) {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http({
        url: endPoint + '/listing_user/banner_ads',
        method: 'POST',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
      return _handle(req);
    });
  }

  function edit(id, formdata) {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http({
        url: endPoint + '/listing_user/banner_ads/' + id,
        method: 'PATCH',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
      return _handle(req);
    });
  }

  function getData(id, formdata) {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http({
        url: endPoint + '/listing_user/banner_ads/' + id,
        method: 'PATCH',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
      return _handle(req);
    });
  }

  function updateStatus(id) {
    return UserService.getToken().then(function (result) {
      var token = result;
      var req = $http({
        url: endPoint + '/listing_user/banner_ad/' + id + '/activate_deactivate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      return _handle(req);
    });
  }

  function _handle(req) {
    return req.then(function (res) {
      var status = res.status;
      if (status === 200) {
        return res.data;
      }
      return $log.error(res.statusText);
    });
  }
}

module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

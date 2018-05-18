module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

function service($log, $http, endPoint, UserService) {
  return {
    queryGlobalAds: queryGlobalAds,
    advertisementList: list,
    advertisementAdd: add,
    advertisementEdit: edit,
    getAdvertisementData: getData,
    updateStatus: updateStatus,
    advertisementAddSignUp: advertisementAddSignUp,
    getPriceBanner: getPriceBanner
  };

  // get price info for state, city, county, sponsored

  function getPriceBanner(token) {
    // return UserService.getToken().then(function (token) {
    return $http.get(endPoint + '/pricing', {
      headers: {
        'Authorization': token
      }
    });
    // });
  }
  // header, footer, side
  function queryGlobalAds() {
    return $http.get(endPoint + '/advertisements');
  }

  function list() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/banner_ads',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }

  function add(formdata) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/banner_ads',
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

  function edit(id, formdata) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/banner_ads/' + id,
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

  function getData(id, formdata) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/banner_ads/' + id,
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

  function updateStatus(id) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/banner_ad/' + id + '/activate_deactivate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }

  function advertisementAddSignUp(formdata, token) {
    return $http({
      url: endPoint + '/listing_user/banner_ads',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }
}

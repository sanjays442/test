module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

function service($log, $http, endPoint, UserService) {
  return {
    sponsorList: sponsorList,
    sponsorAdStatus: sponsorAdStatus,
    editSponsor: editSponsor,
    sponsorAdd: sponsorAdd,
    updateStatus: updateStatus,
    getSponsoredSelect: getSponsoredSelect
  };

  function sponsorList(page) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/sponsored_ads?page=' + page,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }

  function sponsorAdStatus(id) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/sponsored_ad/' + id + '/activate_deactivate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }

  function sponsorAdd(formData) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/sponsored_ads',
        method: 'POST',
        data: formData,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  function editSponsor(formdata, id) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/sponsored_ads/' + id,
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

  function getSponsoredSelect() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/listing_user/sponsored_ad_select/',
        method: 'GET',
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
        url: endPoint + '/listing_user/sponsored_ad/' + id + '/activate_deactivate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }
}

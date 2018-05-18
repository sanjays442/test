module.exports = ['$log', '$http', 'endPoint', 'UserService', service];

function service($log, $http, endPoint, UserService) {
  return {
    sponsorList: sponsorList,
    sponsorAdStatus: sponsorAdStatus,
    editSponsor: editSponsor,
    sponsorAdd: sponsorAdd,
    updateStatus: updateStatus,
    getSponsoredSelect: getSponsoredSelect,
    getSponsoredSelectAddlist: getSponsoredSelectAddlist,
    sponsorListSignup: sponsorListSignup,
    editSponsorSignup: editSponsorSignup,
    getCityCountyByState: getCityCountyByState,
    getCityCountyByStateV2: getCityCountyByStateV2,
    getSponsoredStatesSignup: getSponsoredStatesSignup,
    getSponsoredDemographic: getSponsoredDemographic,
    getSignupPriceInfo: getSignupPriceInfo,
    getPriceInfo: getPriceInfo
  };

  // get price info for state, city, county, sponsored
  function getSignupPriceInfo(token) {
    return $http.get(endPoint + '/pricing', {
      headers: {
        'Authorization': token
      }
    });
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

  function getSponsoredStatesSignup() {
    return $http({
      url: endPoint + '/sponsored_states',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function getSponsoredDemographic() {
    return $http({
      url: endPoint + '/sponsored_categories',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function sponsorList(page) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v1/listing_user/sponsored_ads?page=' + page,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }

  function sponsorListSignup(page, token) {
    return $http({
      url: endPoint + '/v1/listing_user/sponsored_ads',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
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
        url: endPoint + '/v1/listing_user/sponsored_ads/' + id,
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

  function editSponsorSignup(formdata, id, token) {
    return $http({
      url: endPoint + '/v1/listing_user/sponsored_ads/' + id,
      method: 'PATCH',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
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

  function getSponsoredSelectAddlist(token) {
    return $http({
      url: endPoint + '/listing_user/sponsored_ad_select/',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function getCityCountyByState(token, state) {
    return $http({
      url: endPoint + '/v1/listing_user/sponsored_ad_select/' + state,
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function getCityCountyByStateV2(state) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v1/listing_user/sponsored_ad_select/' + state,
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
        url: endPoint + '/v1/listing_user/sponsored_ad/' + id + '/activate_deactivate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
    });
  }
}

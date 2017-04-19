module.exports = ['$http', 'endPoint', 'UserService', service];

function service($http, endPoint, UserService) {
  return {
    addTreatmentCenterSignUp: addTreatmentCenterSignUp,
    queryFeaturedListings: queryFeaturedListings,
    querySponsoredListings: querySponsoredListings,
    queryDetail: queryDetail,
    queryList: queryList,
    add: add,
    edit: edit,
    activate: activate,
    remove: remove,
    inquiry: inquiry,
    submitRating: submitRating,
    search: search
  };

  // home page, addListing
  function addTreatmentCenterSignUp(formData) {
    return $http({
      url: endPoint + '/registrations',
      method: 'POST',
      data: formData,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  }

  // home page, Featured Treatment Centers
  function queryFeaturedListings() {
    return $http.get(endPoint + '/featured_listings');
  }

  // sponsor home
  function querySponsoredListings(type) {
    return $http.post(endPoint + '/sponsored_listings', {
      'sponsored_listing_type': type
    });
  }

  function queryDetail(id) {
    return $http.get(endPoint + '/treatment_center/' + id + '/detail');
  }

  // my treatment centers
  function queryList(page) {
    return UserService.getToken().then(function (token) {
      return $http.get(endPoint + '/listing_user/treatment_centers?page=' + page, {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  function add(formData) {
    return UserService.getToken().then(function (token) {
      return $http.post(endPoint + '/listing_user/treatment_centers', formData, {
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  function edit(id, formData) {
    return UserService.getToken().then(function (token) {
      return $http.patch(endPoint + '/listing_user/treatment_centers/' + id, formData, {
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  function activate(id) {
    return UserService.getToken().then(function (token) {
      return $http.post(endPoint + '/listing_user/treatment_center/' + id + '/activate_deactivate', null, {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  function remove(id) {
    return UserService.getToken().then(function (token) {
      return $http.delete(endPoint + '/listing_user/treatment_centers/' + id, {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  // inquiry on treatment center detail page
  function inquiry(data) {
    return $http.post(endPoint + '/inquiry', data);
  }

  // submit rating
  function submitRating(id, data) {
    return $http.post(endPoint + '/ratings/' + id, data);
  }

  // treatment center search
  function search(finalData) {
    if (finalData.state) {
      var state = finalData.state;
      state = state[0].toUpperCase() + state.slice(1).toLowerCase();
      finalData.state = state;
    }
    return $http.post(endPoint + '/search_treatment_centers', finalData);
  }
}

module.exports = ['$http', 'endPoint', 'UserService', service];

function service($http, endPoint, UserService) {
  return {
    addTreatmentCenterSignUp: addTreatmentCenterSignUp,
    addTreatmentCenter: addTreatmentCenter,
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
    search: search,
    getZipValidation: getZipValidation,
    queryListAll: queryListAll,
    queryStateName: queryStateName,
    queryDetailFront: queryDetailFront,
    getSignupPriceInfo: getSignupPriceInfo,
    searchCenter: searchCenter,
    getCartDetails: getCartDetails,
    deleteSponsorAds: deleteSponsorAds,
    deleteBannerAds: deleteBannerAds,
    addTestCenter: addCenter,
    getCategories: getCategories,
    getTagsSelection: getTagsSelection,
    addOptionalFields: addOptionalFields,
    upgradeMembership: upgradeMembership,
    publishAds: publishAds,
    bannerAdsEdit: bannerAdsEdit,
    getPublishAds: getPublishAds,
    getPriceInfo: getPriceInfo,
    paymentDetailsAdd: paymentDetailsAdd,
    getCardsInfo: getCardsInfo,
    selectCard: selectCard,
    chargeCard: chargeCard,
    getCentersList: getCentersList,
    deleteBannerAdsPaid: deleteBannerAdsPaid,
    deleteSponsorAdsPaid: deleteSponsorAdsPaid
  };

  // Header search
  function searchCenter(searchText) {
    if (angular.isUndefined(searchText) || (searchText === '')) {
      return false;
    }
    return $http({
      url: endPoint + '/v1/search?q=' + searchText,
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  }

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

  function addTreatmentCenter(formData, token) {
    return $http.post(endPoint + '/listing_user/treatment_centers', formData, {
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
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

  function queryDetail(id, token) {
    return $http.get(endPoint + '/listing_user/treatment_centers/' + id, {
      headers: {
        'Authorization': token
      }
    });
  }

  function queryDetailFront(id) {
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

  // my treatment centers all
  function queryListAll(token) {
    return $http.get(endPoint + '/listing_user/treatment_centers', {
      headers: {
        'Authorization': token
      }
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
  // get zip validation
  function getZipValidation(state, zip) {
    return $http.get(endPoint + '/check_zip?state=' + state + '&zip=' + zip, {
      headers: {
        'Content-Type': undefined
      }
    });
  }

  function queryStateName(shortName) {
    return $http.get(endPoint + '/get_state_full_name?state_code=' + shortName);
  }

  // get pricing info
  function getSignupPriceInfo(token) {
    return $http.get(endPoint + '/pricing', {
      headers: {
        'Authorization': token
      }
    });
  }

  // // Get cart details
  // function getCartDetails() {
  //   return UserService.getToken().then(function (token) {
  //     return $http({
  //       url: endPoint + '/v2/cart/',
  //       method: 'GET',
  //       transformRequest: angular.identity,
  //       headers: {
  //         'Content-Type': undefined,
  //         'Authorization': token
  //       }
  //     });
  //   });
  // }

  function deleteSponsorAds(id, cenId) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/treatment_centers/' + cenId + '/sponsored_ads/' + id,
        // url: endPoint + '/v2/sponsored_ads/' + id,
        // url: endPoint + '/v2/cart_subscriptions/' + id,
        //    url: endPoint + '/v2/sponsored_ads/' + id + '?treatment_center_id=' + cenId,
        method: 'DELETE',
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined,

        }
      });
    });
  }

  function deleteSponsorAdsPaid(id, cenId) {
    return UserService.getToken().then(function (token) {
      var formData = new FormData();
      formData.append("subscribed", "true");
      return $http({
        url: endPoint + '/v2/treatment_centers/' + cenId + '/sponsored_ads/' + id,
        // url: endPoint + '/v2/sponsored_ads/' + id,
        // url: endPoint + '/v2/cart_subscriptions/' + id,
        //    url: endPoint + '/v2/sponsored_ads/' + id + '?treatment_center_id=' + cenId,
        method: 'DELETE',
        data: formData,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined,

        }
      });
    });
  }

  function deleteBannerAds(id, cenId) {
    return UserService.getToken().then(function (token) {
      return $http({
        // url: endPoint + '/v2/banner_ads/' + id,
        url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads/' + id,
        method: 'DELETE',
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  function deleteBannerAdsPaid(id, cenId) {
    return UserService.getToken().then(function (token) {
      var formData = new FormData();
      formData.append("subscribed", "true");
      return $http({
        // url: endPoint + '/v2/banner_ads/' + id,
        url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads/' + id,
        method: 'DELETE',
        data: formData,
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  //* ****************** Add test center methods (signup like process/method)***************************** //
  function addCenter(formdata) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/treatment_center_create_center',
        method: 'POST',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }
  // get categories
  function getCategories() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/category_select',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }
  // get tag selection
  function getTagsSelection() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/tag_select',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }
  // optional fields
  function addOptionalFields(formdata, centerId) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/treatment_center_create_optional/' + centerId,
        method: 'POST',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }
  // Upgrade membership
  function upgradeMembership(formdata, cenId) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/treatment_center_subscriptions/' + cenId,
        method: 'PATCH',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }

  // publish ads
  function publishAds(formdata, cenId) {
    return UserService.getToken().then(function (token) {
      return $http({
        // url: endPoint + '/v2/treatment_center_publish_ads',
        url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads',
        method: 'POST',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }

  function bannerAdsEdit(formdata, cenId, id) {
    return UserService.getToken().then(function (token) {
      return $http({
        // url: endPoint + '/v2/treatment_center_update_ad/' + id,
        url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads/' + id,
        // url: endPoint + '/v2/banner_ads/' + id,
        method: 'PATCH',
        data: formdata,
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }

  // get published ads details
  function getPublishAds(centerId) {
    return UserService.getToken().then(function (token) {
      return $http({
        // url: endPoint + '/v2/treatment_center_publish_ads_details/' + centerId,
        url: endPoint + '/v2/treatment_centers/' + centerId + '/banner_ads',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }
  // Get cart details
  function getCentersList() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/treatment_centers_list',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }

  function getCartDetails() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/cart/',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined,
          'Authorization': token
        }
      });
    });
  }

  function getPriceInfo() {
    return UserService.getToken().then(function (token) {
      return $http.get(endPoint + '/pricing', {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  function paymentDetailsAdd(formdata) {
    return UserService.getToken().then(function (token) {
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

  function getCardsInfo() {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/payment_cards_information',
        method: 'GET',
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  function selectCard(formData) {
    return UserService.getToken().then(function (token) {
      return $http({
        url: endPoint + '/v2/cart/choose_card',
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

  function chargeCard() {
    return UserService.getToken().then(function (token) {
      var formData = new FormData();
      formData.append("subscribed", "true");
      return $http({
        url: endPoint + '/v2/cart/charge',
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

  //* ********************************************************************************** *//
}

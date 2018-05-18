module.exports = ['$log', '$http', 'endPoint', service];

function service($log, $http, endPoint) {
  return {
    signUp: signUp,
    addCenter: addCenter,
    editCenter: editCenter,
    getCategories: getCategories,
    getTagsSelection: getTagsSelection,
    addOptionalFields: addOptionalFields,
    upgradeMembership: upgradeMembership,
    publishAds: publishAds,
    publishAdsEdit: publishAdsEdit,
    getPublishAds: getPublishAds,
    getCartDetails: getCartDetails,
    getPriceInfo: getPriceInfo,
    paymentDetailsAddSignup: paymentDetailsAddSignup,
    getCardsInfo: getCardsInfo,
    selectCard: selectCard,
    chargeCard: chargeCard,
    deleteSponsorAds: deleteSponsorAds,
    deleteBannerAds: deleteBannerAds
  };
  // add new user
  function signUp(formdata) {
    return $http({
      url: endPoint + '/v2/signup_user_create',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    });
  }
  // add center
  function addCenter(formdata, token) {
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
  }

  // edit center
  function editCenter(id, formData, token) {
    return $http.patch(endPoint + '/listing_user/treatment_centers/' + id, formData, {
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  // get categories
  function getCategories(token) {
    return $http({
      url: endPoint + '/v2/category_select',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // get tag selection
  function getTagsSelection(token) {
    return $http({
      url: endPoint + '/v2/tag_select',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // optional fields
  function addOptionalFields(formdata, centerId, token) {
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
  }

  // Upgrade membership
  // function upgradeMembership(formdata, token) {
  //   return $http({
  //     url: endPoint + '/upgrade_membership',
  //     method: 'POST',
  //     data: formdata,
  //     transformRequest: angular.identity,
  //     headers: {
  //       'Content-Type': undefined,
  //       'Authorization': token
  //     }
  //   });
  // }
  function upgradeMembership(formdata, cenId, token) {
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
  }

  // publish ads
  function publishAds(formdata, token, cenId) {
    return $http({
      url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads',
      //  url: endPoint + '/v2/treatment_center_publish_ads',
      method: 'POST',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }

  function publishAdsEdit(formdata, token, id, cenId) {
    return $http({
      //  url: endPoint + '/v2/treatment_center_update_ad/' + id,
      url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads/' + id,
      method: 'PATCH',
      data: formdata,
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }

  // get published ads details
  function getPublishAds(centerId, token) {
    return $http({
      //  url: endPoint + '/v2/treatment_center_publish_ads_details/' + centerId,
      url: endPoint + '/v2/treatment_centers/' + centerId + '/banner_ads',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }
  // Get cart details
  function getCartDetails(token) {
    return $http({
      url: endPoint + '/v2/cart/',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
        'Authorization': token
      }
    });
  }

  function getPriceInfo(token) {
    return $http.get(endPoint + '/pricing', {
      headers: {
        'Authorization': token
      }
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

  function getCardsInfo(token) {
    return $http({
      url: endPoint + '/v2/payment_cards_information',
      method: 'GET',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function selectCard(formData, token) {
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
  }

  function chargeCard(token) {
    return $http({
      url: endPoint + '/v2/cart/charge',
      method: 'POST',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function deleteSponsorAds(id, cenId, token) {
    return $http({
      url: endPoint + '/v2/treatment_centers/' + cenId + '/sponsored_ads/' + id,
      // url: endPoint + '/v2/cart_subscriptions/' + id,
      //  url: endPoint + '/v2/sponsored_ads/' + id + '?treatment_center_id=' + cenId,
      method: 'DELETE',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  function deleteBannerAds(id, cenId, token) {
    return $http({
      //  url: endPoint + '/v2/banner_ads/' + id,
      url: endPoint + '/v2/treatment_centers/' + cenId + '/banner_ads/' + id,
      method: 'DELETE',
      transformRequest: angular.identity,
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }
}

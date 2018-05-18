module.exports = ['$http', 'endPoint', 'localStorageService', service];

function service($http, endPoint, localStorageService) {
  return {
    subscribeFeatured: subscribeFeatured
  };

  function subscribeFeatured() {
    var token = localStorageService.get('signupToken');
    return $http({
      url: endPoint + '/listing_user/featured_listings_subscribe',
      method: 'POST',
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
  }
}

function service($http, endPoint) {
  return {
    queryByType: function (type) {
      return $http.post(endPoint + '/sponsored_listings', {
        'sponsored_listing_type': type
      });
    }
  };
}

module.exports = ['$http', 'endPoint', service];

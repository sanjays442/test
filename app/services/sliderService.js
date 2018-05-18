module.exports = ['$http', 'endPoint', service];

function service($http, endPoint) {
  return {
    getSlider: getSlider
  };

  // homepage slider
  function getSlider() {
    return $http.get(endPoint + '/slider');
  }
}

module.exports = ['$log', '$http', service];

function service($log, $http) {
  return {
    getSlider: getSlider
  };

  // homepage slider
  function getSlider() {
    return $http.get('http://www.addictionnetwork.com/blog/custom-slider/');
  }
}

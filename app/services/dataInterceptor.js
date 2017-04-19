module.exports = ['$log', 'endPoint', interceptor];

function interceptor($log, endPoint) {
  return {
    'response': function (response) {
      var reqURL = response.config.url;
      // request data or template from source other then endpoint
      if (reqURL.indexOf(endPoint) === -1) {
        return response;
      }
      // request data from endPoint
      var status = response.status;
      if (status === 200) { // OK
        // $log.info(response.config.url, response.data);
        return response.data;
      }
      $log.error(response.statusText);
      throw new Error(response.statusText);
    }
  };
}

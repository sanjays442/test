module.exports = ['$log', 'endPoint', '$window', interceptor];

function interceptor($log, endPoint, $window) {
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
        //$log.info(response.config.url, response.data);
        //  $log.info('datainterceptor 200 status');

        return response.data;
      } else if (status === 401) {
        $log.info('401 status detected....');
        $window.location.href = '/logout';
        //  $state.go(UIState.LOGOUT);
      }
      $log.error(response.statusText);
      throw new Error(response.statusText);
    }
  };
}

module.exports = ['$log', interceptor];

function interceptor($log) {
  return {
    'response': function (response) {
      if (response.config.url.indexOf('template/') > 0) {
        return response;
      }
      var status = response.status;
      if (status === 200) { // OK
        $log.info(response.config.url, response.data);
        return response.data;
      }
      $log.error(response.statusText);
      throw new Error(response.statusText);
    }
  };
}

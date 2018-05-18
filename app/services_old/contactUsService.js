module.exports = ['$q', '$log', '$http', service];

function service($q, $log, $http) {
  return {
    sendMessage: sendMessage,
    sendInsuranceForm: sendInsuranceForm
  };

  // function sendMessage(formdata) {
  //   return $http({
  //     url: endPoint + '/contact_u',
  //     method: 'POST',
  //     data: formdata,
  //     transformRequest: angular.identity,
  //     headers: {
  //       'Content-Type': undefined
  //       // 'Authorization': token
  //     }
  //   });
  // }
  function sendMessage(formdata) {
    return $http({
      url: 'https://addictionnetwork.secure.force.com/services/apexrest/an_contact_form',
      method: 'POST',
      data: formdata,
      //  transformRequest: angular.identity,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        // 'Content-Type': undefined
        // 'Authorization': token
      }
    });
  }

  // function sendMessage(formdata) {
  // //  var deferred = $q.defer();
  // return  $http({
  //       url: 'https://addictionnetwork.secure.force.com/services/apexrest/an_contact_form',
  //       method: 'POST',
  //       data: formdata,
  //       //  transformRequest: angular.identity,
  //       headers: {
  //          'Content-Type': 'application/json'},
  //       transformRequest: function (data, headersGetter) {
  //         console.log('transformRequest');
  //         // Do transformRequest stuff here
  //         return angular.toJson(data);
  //       },
  //       transformResponse: function (data, headersGetter) {
  //         console.log('transformresponset'+data);
  //         // Do transformResponse stuff here
  //         return angular.fromJson(data);
  //       //  return angular.fromJson({data:'', status:1});
  //       }
  //       //cache: false
  //     });
  //     // .success(function (data, status, headers, config) {
  //     //   deferred.resolve(data);
  //     // })
  //     // .error(function (data, status, headers, config) {
  //     //   deferred.reject(data);
  //     // });
  // //  return deferred.promise;
  // }

  function sendInsuranceForm(formdata) {
    return $http({
      url: 'https://addictionnetwork.secure.force.com/services/apexrest/an_insurance_form',
      method: 'POST',
      data: formdata,
      // transformRequest: angular.identity,
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': undefined
        // 'Authorization': token
      }
    });
  }
}

function service($http, $q, endPoint) {
  var _service = this;
  _service.user = null;
  _service.signIn = signIn;
  _service.getToken = getToken;
  _service.queryProfile = queryProfile;
  _service.editProfile = editProfile;
  _service.changePassword = changePassword;

  // sign in with email and password
  function signIn(email, password) {
    var req = $http.post(endPoint + '/sessions', {
      'sessions': {
        email: email,
        password: password
      }
    });
    return _handle(req).then(function (result) {
      _service.user = result.user;
      return result;
    });
  }

  // return token if user signed in.
  function getToken() {
    // for testing purpose, This has to be removed in production.
    var email = 'best@test.com';
    var passwd = '12345678';
    return _service.signIn(email, passwd).then(function (result) {
      return result.user.auth_token;
    });

    // for production
    // var deferred = $q.defer();
    // if (_service.user) {
    //   deferred.resolve(_service.user.auth_token);
    // } else {
    //   // if token can not be acquired, redirect user to sign in page
    //   deferred.reject('No signed in user detected.')
    // }
    // return deferred.promise;
  }

  // query profile data with auth_token
  function queryProfile() {
    return _service.getToken().then(function (token) {
      var req = $http.get(endPoint + '/profile', {
        headers: {
          'Authorization': token
        }
      });
      return _handle(req).then(function (result) {
        return result.user;
      });
    });
  }

  // edit profile data
  function editProfile(formData) {
    return _service.getToken().then(function (token) {
      var req = $http.post(endPoint + '/profile', formData, {
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
      return _handle(req);
    });
  }

  // change password
  function changePassword(formData) {
    return _service.getToken().then(function (token) {
      var req = $http.post(endPoint + '/password', formData, {
        headers: {
          'Authorization': token
        }
      });
      return _handle(req);
    });
  }

  // handle rejection of promise
  function _handle(req) {
    return req.then(function (res) {
      var status = res.status;
      if (status === 200) {
        return res.data;
      }
      throw new Error(res.statusText);
    });
  }
}

module.exports = ['$http', '$q', 'endPoint', service];

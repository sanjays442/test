function service($http, $q, endPoint, localStorageService) {
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
      localStorageService.set('token', result.user.auth_token);
      return result;
    });
  }

  // return token if user signed in.
  function getToken() {
    // for testing purpose, This has to be removed in production.
    var token = localStorageService.get('token');
    var deferred = $q.defer();
    if (token !== null) {
      deferred.resolve(token);
    } else {
      var email = 'best@test.com';
      var passwd = '12345678';
      return _service.signIn(email, passwd).then(function (result) {
        localStorageService.set('token', result.user.auth_token);
        return result.user.auth_token;
      });
      // if token can not be acquired, redirect user to sign in page
    }
    return deferred.promise;
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
    }).catch(function () {
      localStorage.clear();
    });
  }
}

module.exports = ['$http', '$q', 'endPoint', 'localStorageService', service];

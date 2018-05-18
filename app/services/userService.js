module.exports = ['$http', '$q', '$window', 'endPoint', 'localStorageService', service];

function service($http, $q, $window, endPoint, localStorageService) {
  var _service = this;
  _service.user = null;
  _service.signIn = signIn;
  _service.getToken = getToken;
  _service.queryProfile = queryProfile;
  _service.editProfile = editProfile;
  _service.changePassword = changePassword;
  _service.upgradeUserSignup = upgradeUserSignup;
  _service.upgradeUser = upgradeUser;
  _service.emailOtp = emailOtp;
  _service.phoneOtp = phoneOtp;
  _service.emailOtpApi = emailOtpApi;
  _service.phoneOtpApi = phoneOtpApi;
  _service.forgotUsername = forgotUsername;
  _service.latestPost = latestPost;

  function latestPost() {
    return $http.get('https://blog.addictionnetwork.com/blog/latest_post.php?blogs=all');
  }

  // sign in with email and password
  function signIn(email, password) {
    return $http.post(endPoint + '/sessions', {
      'sessions': {
        email: email,
        password: password
      }
    }).then(function (result) {
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
      localStorageService.remove('token');
      // if token can not be acquired, redirect user to sign in page
      $window.location.href = '/#/login';
    }
    return deferred.promise;
  }

  // query profile data with auth_token
  function queryProfile() {
    return _service.getToken().then(function (token) {
      return $http.get(endPoint + '/profile', {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  // edit profile data
  function editProfile(formData) {
    return _service.getToken().then(function (token) {
      return $http.post(endPoint + '/profile', formData, {
        transformRequest: angular.identity,
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }

  // change password
  function changePassword(formData) {
    return _service.getToken().then(function (token) {
      return $http.post(endPoint + '/password', formData, {
        headers: {
          'Authorization': token
        }
      });
    });
  }

  // Upgrade user
  function upgradeUserSignup(formData, token) {
    return $http.post(endPoint + '/upgrade', formData, {
      headers: {
        'Authorization': token,
        'Content-Type': undefined
      }
    });
  }

  // Email OTP
  function emailOtp(formData) {
    return $http.post(endPoint + '/v1/forget_password/email', formData, {
      // headers: {
      //   'Content-Type': undefined
      // }
    });
  }

  // Phone OTP
  function phoneOtp(formData) {
    return $http.post(endPoint + '/v1/forget_password/phone', formData, {
      // headers: {
      //   'Content-Type': undefined
      // }
    });
  }

  // Email Reset OTP
  function emailOtpApi(formData) {
    return $http.post(endPoint + '/v1/forget_password/reset', formData, {
      // headers: {
      //   'Content-Type': undefined
      // }
    });
  }

  // Phone Reset OTP
  function phoneOtpApi(formData) {
    return $http.post(endPoint + '/v1/forget_password/reset', formData, {
      // headers: {
      //   'Content-Type': undefined
      // }
    });
  }

  // Forgot Username
  function forgotUsername(formData) {
    return $http.post(endPoint + '/v1/forgot_username', formData, {
      // headers: {
      //   'Content-Type': undefined
      // }
    });
  }
  // Upgrade user
  function upgradeUser(formData) {
    return _service.getToken().then(function (token) {
      return $http.post(endPoint + '/upgrade', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': undefined
        }
      });
    });
  }
}

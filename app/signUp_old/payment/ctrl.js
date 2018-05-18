module.exports = ['$injector', '$timeout', '$scope', '$log', '$rootScope', '$state', 'UIState', 'SignUpService', 'localStorageService', 'Status', ctrl];

function ctrl($injector, $timeout, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  // var lm = $rootScope;
  var token = localStorageService.get('signupToken');
  // var centerId = localStorageService.get('signupCenterId');
  //  var alreadyPublished = 0;
  vm.cardType = 'credit';
  vm.allCards = [];
  var creditCardType = require('credit-card-type');

  vm.cartTotal = localStorageService.get('cartTotal');

  var initStartupVars = function () {
    vm.displayMsg = 'You are just one step away from making a difference!!';
    vm.saveDetails = true;
  };
  initStartupVars();

  vm.detectCardType = function (card, event) {
    if (angular.isDefined(card)) {
      var cardVal = card.replace(/ /g, '');
      var cardType = creditCardType(cardVal);
      if (angular.isDefined(cardType[0])) {
        if (cardType[0].type === 'master-card') {
          vm.cardType = 'master';
        } else if (cardType[0].type === 'visa') {
          vm.cardType = 'visa';
        } else if (cardType[0].type === 'american-express') {
          vm.cardType = 'amex';
        } else if (cardType[0].type === 'jcb') {
          vm.cardType = 'jcb';
        } else if (cardType[0].type === 'discover') {
          vm.cardType = 'discover';
        } else if (cardType[0].type === 'diners-club') {
          vm.cardType = 'diners-club';
        } else {
          vm.cardType = 'credit';
        }
      }

      vm.totalDigits = card.replace(/ /g, '').length;
      if (event.keyCode !== 8) {
        if (vm.totalDigits === 4) {
          vm.cardNumber = vm.cardNumber + ' ';
        } else if (vm.totalDigits === 9) {
          vm.cardNumber = vm.cardNumber + ' ';
        } else if (vm.totalDigits === 14) {
          vm.cardNumber = vm.cardNumber + ' ';
        }
      }
    } else {
      // vm.cardType = null;
      vm.totalDigits = 0;
      vm.cardType = 'credit';
    }
  };

  vm.congrats = function () {
    // Validations
    if (vm.paymentForm.cardName.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter name on card.';
      return;
    } else if (vm.paymentForm.cardNumber.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter valid card number.';
      return;
    } else if (vm.paymentForm.expiry.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter expiry month/year.';
      return;
    } else if (vm.paymentForm.cvv.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter valid security code (cvv).';
      return;
    } else if (vm.paymentForm.state.$invalid) {
      shakeme();
      vm.displayMsg = 'State cannot be empty.';
      return;
    } else if (vm.paymentForm.city.$invalid) {
      shakeme();
      vm.displayMsg = 'City cannot be empty.';
      return;
    } else if (vm.paymentForm.country.$invalid) {
      shakeme();
      vm.displayMsg = 'Country cannot be empty.';
      return;
    } else if (vm.paymentForm.zip.$invalid) {
      shakeme();
      vm.displayMsg = 'Zip cannot be empty.';
      return;
    }

    var formData = new FormData();
    if (angular.isUndefined(vm.expiry)) {
      var expiry = '12/2021';
    }
    expiry = vm.expiry;
    var splitExpiry = expiry.split('/');
    var month = splitExpiry[0];
    var year = splitExpiry[1];

    var splitName = vm.cardName.split(' ');
    var firstName = splitName[0];
    var lastName = splitName[1];

    var card = vm.cardNumber.replace(/ /g, '');
    var paymentData = {
      'card_no': card,
      'first_name': firstName,
      // 'middle_name': vm.middleName,
      'last_name': lastName,
      'name': vm.cardName,
      'expiry_year': year,
      'expiry_month': month,
      'card_code': vm.cvv,
      'address': vm.address,
      'city': vm.city,
      'country': vm.country,
      'zip': vm.zip,
      'state': vm.state,
      'default': 'true'
    };
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }

    service.paymentDetailsAddSignup(formData, token).then(function (result) {
      $log.info(result);
      // after card saved, select a card
      var cardId = '';
      service.getCardsInfo(token).then(function (res) {
        $log.info('card info: ');
        $log.info(res);
        vm.allCards = res;
        cardId = vm.allCards.payments[0].customer_payment_profile_id;
        $log.info('selected card id: ' + cardId);

        // select a card and chage it
        formData = new FormData();
        formData.append('payment_card', cardId);

        service.selectCard(formData, token).then(function (res1) {
          $log.info(res1);
          $rootScope.$emit(Status.SUCCEEDED, 'Payment Done...');
          $state.go(UIState.SIGN_UP.SIGNUP_COMPLETED);
          // now charging the selected card
          // service.chargeCard(token).then(function (res2) {
          //   $log.info('finally charged : ');
          //   $log.info(res2);
          // }).catch(function (err) {
          //   $log.info(err);
          //   $rootScope.$emit(Status.FAILED, err.error);
          // });
        }).catch(function (err) {
          $log.info(err);
        });
      }).catch(function (err) {
        $log.info(err);
      });

      //  $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      // $state.go(UIState.SIGN_UP.SIGNUP_COMPLETED);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  };

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }
}

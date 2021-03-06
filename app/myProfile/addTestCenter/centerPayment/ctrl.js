module.exports = ['$document', '$injector', '$timeout', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'localStorageService', 'Status', ctrl];

function ctrl($document, $injector, $timeout, $scope, $log, $rootScope, $state, UIState, service, localStorageService, Status) {
  var vm = this;
  vm.paymentProcessing = 1;
  // var lm = $rootScope;
  //  var token = localStorageService.get('signupToken');
  // get previous steps localstorage data
  var signupData = localStorageService.get('signupStepsData', 'sessionStorage');

  // var centerId = localStorageService.get('signupCenterId');
  //  var alreadyPublished = 0;
  vm.cardType = 'credit';
  vm.allCards = [];
  vm.paymentProcessing = 1;
  var creditCardType = require('credit-card-type');
  vm.cartTotal = localStorageService.get('cartTotal');
  var initStartupVars = function () {
    vm.displayMsg = 'You are just one step away from making a difference!!';
    vm.saveDetails = true;
    //updating progress of steps
    var addCenterProgress = {
      'lastStep': 'myProfile.centerPayment',
      'stepsCompleted': 0
    };
    localStorageService.set('addCenterProgress', addCenterProgress, 'sessionStorage');
  };
  initStartupVars();

  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };

  function runProgress(startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  vm.sponsorAdded = localStorageService.get('sponsorAdded');
  vm.bannerAdded = localStorageService.get('bannerAdded');
  // vm.setProgressValues(70, 75);
  if (vm.sponsorAdded === 1 && vm.bannerAdded === 1) {
    vm.setProgressValues(90, 95);
  } else if (vm.bannerAdded === 1) {
    vm.setProgressValues(75, 85);
  } else if (vm.sponsorAdded === 1) {
    vm.setProgressValues(75, 85);
  } else {
    vm.setProgressValues(60, 75);
  }
  // END: progress values

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

  // for extra placeholder
  vm.extraPlaceholder = function (id, event) {
    if (id === 'expiry') {
      var web = $document.find('[name="' + id + '"]');
      if (web.val() !== '') {
        vm.expiryPlaceholder = 1;
      } else {
        vm.expiryPlaceholder = 0;
      }
      var expiry = $document.find('[id="expiry"]').val();
      if (expiry.length === 2 && (isNaN(expiry) === false) && (event.keyCode !== 8) && (event.keyCode !== 32)) { // isNaN = isNot a Number
        $document.find('[id="expiry"]').val((expiry + '/'));
      }
    } else if (id === 'cvv') {
      var web = $document.find('[name="' + id + '"]');
      if (web.val() !== '') {
        vm.cvvPlaceholder = 1;
      } else {
        vm.cvvPlaceholder = 0;
      }
    }
  };

  vm.cardSelect = '';
  // get all saved cards
  vm.getSavedCards = function () {
    $rootScope.$emit(Status.PROCESSING, '');
    service.getCardsInfo().then(function (res) {
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      vm.savedCards = res;
      if (res.payments.length > 0) {
        vm.cardSelect = res.payments[0].customer_payment_profile_id;
        for (var key in res.payments) {
          if (res.payments[key].default === true) {
            vm.cardSelect = res.payments[key].customer_payment_profile_id;
            break;
          }
        }

      } else {
        vm.cardSelect = 'newCard';
      }
      vm.restoreValues();
    }).catch(function (err) {
      $log.info(err);
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      shakeme();
      vm.displayMsg = err.data.error;
    });
  };
  vm.getSavedCards();

  // when user select saved cards
  vm.payViaSavedCard = function () {
    var cardProfileId = vm.cardSelect;
    $rootScope.$emit(Status.PROCESSING, '');
    // select a card and charge it
    formData = new FormData();
    formData.append('payment_card', cardProfileId);
    formData.append('subscribed', 'true');
    service.selectCard(formData).then(function (res) {
      service.chargeCard().then(function (res2) {
        $log.info('finally charged from saved card: ');
        //  $log.info(res2);
        vm.displayMsg = 'Payment Successfull';
        // $rootScope.$emit(Status.SUCCEEDED, 'Payment Done...');
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
        $state.go(UIState.MY_PROFILE.SIGNUP_COMPLETED);
      }).catch(function (err) {
        $log.info(err);
        //  $rootScope.$emit(Status.FAILED, err.error);
        vm.paymentProcessing = 1;
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
        vm.paymentProcessing = 1;
        shakeme();
        vm.displayMsg = err.data.error;
      });
    }).catch(function (err) {
      $log.info(err);
      //  $rootScope.$emit(Status.FAILED, err.error);
      vm.paymentProcessing = 1;
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      vm.paymentProcessing = 1;
      shakeme();
      vm.displayMsg = err.data.error;
    });
  };

  vm.checkValidation = function () {
    var error = 0;
    if (vm.paymentForm.cardName.$invalid) {
      vm.displayMsg = 'Please enter name as on card.';
      error = 1;
    } else if (vm.paymentForm.cardNumber.$invalid) {
      vm.displayMsg = 'Please enter valid card number.';
      error = 1;
    } else if (vm.paymentForm.expiry.$error.required) {
      vm.displayMsg = 'Please enter expiry month/year.';
      error = 1;
    } else if (vm.paymentForm.expiry.$invalid) {
      vm.displayMsg = 'Please enter expiry month/year in correct format.';
      error = 1;
    } else if (vm.paymentForm.cvv.$invalid) {
      vm.displayMsg = 'Please enter valid security code (cvv).';
      error = 1;
    } else if (vm.paymentForm.state.$invalid) {
      vm.displayMsg = 'State cannot be empty.';
      error = 1;
    } else if (vm.paymentForm.city.$invalid) {
      vm.displayMsg = 'City cannot be empty.';
      error = 1;
    } else if (vm.paymentForm.country.$invalid) {
      vm.displayMsg = 'Country cannot be empty.';
      error = 1;
    } else if (vm.paymentForm.zip.$error.required) {
      vm.displayMsg = 'Zip cannot be empty.';
      error = 1;
    } else if (vm.paymentForm.zip.$invalid) {
      vm.displayMsg = 'Zip must be numeric';
      error = 1;
    }
    if (error === 1) {
      shakeme();
      return 1;
    }
    return 0;
  };

  vm.congrats = function () {
    if (vm.cardSelect !== 'newCard') {
      vm.payViaSavedCard();
      return;
    }
    // Validations
    var valCheck = vm.checkValidation();
    if (valCheck) {
      return;
    }

    // reseting variables
    delete $rootScope.selectedMethod;
    signupData.signupStep.payment = null;
    localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    // ------ //

    var formData = new FormData();
    var paymentData = getFormData();
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    $rootScope.$emit(Status.PROCESSING, 'Please wait...');
    vm.paymentProcessing = 0;
    service.paymentDetailsAdd(formData).then(function (result) {
      $log.info(result);
      // after card saved, select a card
      var cardId = '';
      service.getCardsInfo().then(function (res) {
        //  $log.info('card info: ');
        //  $log.info(res);
        vm.allCards = res;
        cardId = vm.allCards.payments[0].customer_payment_profile_id;
        $log.info('selected card id: ' + cardId);

        // select a card and chage it
        formData = new FormData();
        formData.append('payment_card', cardId);
        formData.append('subscribed', 'true');

        service.selectCard(formData).then(function (res1) {
          $log.info(res1);
          // saving this step data //
          signupData.signupStep.payment = paymentData;
          localStorageService.set('signupStepsData', signupData, 'sessionStorage');
          // now charging the selected card
          service.chargeCard().then(function (res2) {
            $log.info('finally charged : ');
            $log.info(res2);
            // $rootScope.$emit(Status.SUCCEEDED, 'Payment Done...');
            $rootScope.$emit(Status.HIDE_PROCESSING, '');
            vm.paymentProcessing = 1;
            $state.go(UIState.MY_PROFILE.SIGNUP_COMPLETED);
          }).catch(function (err) {
            $log.info(err);
            //  $rootScope.$emit(Status.FAILED, err.error);
            vm.paymentProcessing = 1;
            $rootScope.$emit(Status.HIDE_PROCESSING, '');
            vm.paymentProcessing = 1;
            shakeme();
            vm.displayMsg = err.data.error;
          });
        }).catch(function (err) {
          $log.info(err);
          vm.paymentProcessing = 1;
          $rootScope.$emit(Status.HIDE_PROCESSING, '');
          vm.paymentProcessing = 1;
          shakeme();
          vm.displayMsg = err.data.error;
        });
      }).catch(function (err) {
        $log.info(err);
        vm.paymentProcessing = 1;
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
        vm.paymentProcessing = 1;
        shakeme();
        vm.displayMsg = err.data.error;
      });

      //  $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_ADD_SUCCEESS_MSG);
      // $state.go(UIState.MY_PROFILE.SIGNUP_COMPLETED);
    }).catch(function (err) {
      $log.error(err);
      // $rootScope.$emit(Status.FAILED, err.data.error);
      vm.paymentProcessing = 1;
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      vm.paymentProcessing = 1;
      shakeme();
      vm.displayMsg = err.data.error;
    });
  };

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }

  vm.restoreValues = function () {
    if (angular.isDefined(signupData.signupStep.payment) && signupData.signupStep.payment !== null) {
      var payment = signupData.signupStep.payment;
      vm.cardName = payment.name;
      vm.cardNumber = payment.card_no;
      vm.expiry = payment.expiry_month + '/' + payment.expiry_year;
      vm.cvv = payment.card_code;
      vm.address = payment.address;
      vm.state = payment.state;
      vm.city = payment.city;
      vm.country = payment.country;
      vm.zip = payment.zip;
    } else {
      vm.cardName = '';
      vm.cardNumber = '';
      vm.cvv = '';
      vm.state = '';
      vm.city = '';
      vm.country = '';
      vm.address = '';
      vm.zip = '';
      vm.expiry = '';
    }
    vm.cardSelect = (angular.isDefined($rootScope.selectedMethod)) ? $rootScope.selectedMethod : vm.cardSelect;
  };
  // vm.restoreValues();

  // manipulate and pack form data into object
  function getFormData() {
    if (angular.isUndefined(vm.expiry) || vm.expiry === '') {
      var expiry = '12/2021';
      //  var expiry = '';
    } else {
      expiry = vm.expiry;
    }
    var splitExpiry = expiry.split('/');
    var month = splitExpiry[0] ? splitExpiry[0] : '';
    var year = splitExpiry[1] ? splitExpiry[1] : '';

    if (angular.isUndefined(vm.cardName)) {
      var firstName = '';
      var lastName = '';
      vm.cardName = '';
    } else {
      var splitName = vm.cardName.split(' ');
      var firstName = splitName[0];
      var lastName = splitName[1];
    }

    if (angular.isUndefined(vm.cardNumber)) {
      vm.cardNumber = '';
    } else {
      var card = vm.cardNumber.replace(/ /g, '');
    }

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
      'default': true
    };
    return paymentData;
  }

  vm.goToCart = function () {
    $rootScope.selectedMethod = vm.cardSelect;
    // before going back, check if new card option is selected and save new card info
    if (vm.cardSelect === 'newCard') {
      var paymentData = getFormData();
      // saving this step data //
      signupData.signupStep.payment = paymentData;
      localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    } else {
      signupData.signupStep.payment = null;
      localStorageService.set('signupStepsData', signupData, 'sessionStorage');
    }
    $state.go(UIState.MY_PROFILE.DETAILS);
  };

}

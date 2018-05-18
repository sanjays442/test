module.exports = ['$document', '$injector', '$timeout', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'PaymentService', 'localStorageService', 'Status', ctrl];

function ctrl($document, $injector, $timeout, $scope, $log, $rootScope, $state, UIState, service, paymentService, localStorageService, Status) {
  var vm = this;
  vm.paymentProcessing = 1;

  vm.cardType = 'credit';
  vm.allCards = [];
  vm.paymentProcessing = 1;
  var creditCardType = require('credit-card-type');
  var initStartupVars = function () {
    vm.displayMsg = 'You are just one step away from making a difference!!';
    vm.saveDetails = true;
  };
  initStartupVars();

  vm.cardSelect = '';
  // get all saved cards
  vm.getSavedCards = function () {
    // $rootScope.$emit(Status.PROCESSING, '');
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
      // vm.restoreValues();
    }).catch(function (err) {
      $log.info(err);
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      shakeme();
      vm.displayMsg = err.data.error;
    });
  };
  vm.getSavedCards();

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
      // shakeme();
      return 1;
    }
    return 0;
  };

  vm.congrats = function () {
    if (vm.cardSelect !== 'newCard') {
      $log.info('pay via card');
      //  vm.payViaSavedCard();
      return;
    }
    // Validations
    var valCheck = vm.checkValidation();
    if (valCheck) {
      // $log.info(vm.displayMsg);
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      //  $rootScope.$emit(Status.FAILED, vm.displayMsg);
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
      'state': vm.state
      //'default': true
    };
    for (var key in paymentData) {
      formData.append('payment[' + key + ']', paymentData[key]);
    }
    $rootScope.$emit(Status.PROCESSING, 'Please wait...');
    vm.paymentProcessing = 0;
    service.paymentDetailsAdd(formData).then(function (result) {
      //  $log.info(result);
      //$rootScope.$emit(Status.SUCCEEDED, 'Payment Details Added');
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS);

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

  vm.setDefaultPayment = function (id) {
    /*if (vm.defaultCard[id]) {
      $rootScope.$emit(Status.PROCESSING, '');
      paymentService.setDefaultCard(id).then(function (result) {
        vm.paymentDefault[vm.prevDefaultId] = 1;
        vm.defaultCard[vm.prevDefaultId] = false;
        vm.prevDefaultId = id;
        //  paymentList();
        $rootScope.$emit(Status.SUCCEEDED, 'Default card updated.');
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
      }).catch(function (err) {
        $log.error(err);
        $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
      });
    }*/
    if (vm.cardSelect !== '' && vm.cardSelect !== 'newCard') {
      $rootScope.$emit(Status.PROCESSING, '');
      paymentService.setDefaultCard(id).then(function (result) {
        //  vm.paymentDefault[vm.prevDefaultId] = 1;
        //  vm.defaultCard[vm.prevDefaultId] = false;
        // vm.prevDefaultId = id;
        //  paymentList();
        $rootScope.$emit(Status.SUCCEEDED, 'Default card updated.');
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
      }).catch(function (err) {
        $log.error(err);
        $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
      });
    }

  }

  var deletePrompt = '<div class="modal-header"><h3 class="modal-title" id="modal-title">Delete Payment Details!</h3></div><div class="modal-body" id="modal-body">Are you sure you want to delete?</div><div class="modal-footer"><button class="btn" type="button" ng-click="ok()"> OK </button><button class="btn btn-warning" type="button" ng-click="cancel()">Cancel</button ></div>';
  vm.open = function (id) {
    var paymentId = id.id;
    var modalInstance = $injector.get('$uibModal').open({
      animation: vm.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      template: deletePrompt,
      controller: function () {
        $rootScope.ok = function () {
          onDelete(paymentId);
          modalInstance.close();
        };
        $rootScope.cancel = function () {
          modalInstance.dismiss('cancel');
        };
      },
      bindToController: true
    });
  };

  function onDelete(id) {
    $rootScope.$emit(Status.PROCESSING, '');
    paymentService.removePaymentDetails(id).then(function ( /* result */ ) {
      // paymentList();
      vm.getSavedCards();
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      $rootScope.$emit(Status.SUCCEEDED, Status.PAYMENT_DELETE_SUCCEESS_MSG);
    }).catch(function (err) {
      $log.error(err);
      $rootScope.$emit(Status.FAILED, err.data.error);
    });
  }

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }

  vm.restoreValues = function () {
    if (angular.isDefined(signupData.signupStep.payment) && angular.isDefined(signupData.signupStep.payment)) {
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
    }
  };
  // vm.restoreValues();

  vm.goToCart = function () {
    $state.go(UIState.MY_PROFILE.PAYMENT_DETAILS);
  };
}

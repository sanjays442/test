module.exports = ['$document', '$injector', '$timeout', '$scope', '$log', '$rootScope', '$state', 'UIState', 'TreatmentCenterService', 'SponsorService', 'localStorageService', 'Status', ctrl];

function ctrl($document, $injector, $timeout, $scope, $log, $rootScope, $state, UIState, service, SponsorService, localStorageService, Status) {
  var vm = this;
  vm.paymentProcessing = 1;

  // var centerId = localStorageService.get('signupCenterId');
  //  var alreadyPublished = 0;
  vm.cardType = 'credit';
  vm.allCards = [];
  vm.paymentProcessing = 1;
  vm.cartTotal = 0;
  var creditCardType = require('credit-card-type');

  // --------- get unpaid items data from cart api -----------------//
  vm.loadCart = function () {
    vm.cartError = 0;
    service.getCartDetails().then(function (result) {
      vm.cartDetails = result.cart_subscription;
      calculateSubtotals();
    }).catch(function (err) {
      $log.info(err);
      if (angular.isDefined(err.data.error)) {
        vm.cartError = err.data.error;
      }
      $rootScope.unpaidItemsCount = 0;
    });
  };
  vm.loadCart();
  vm.paymentInfo = localStorageService.get('paymentActionInfo');
  // if (angular.isDefined(vm.paymentInfo) && vm.paymentInfo !== null && vm.paymentInfo.action === 'upgradeMembership') {
  //   vm.cartTotal = 0;
  //   vm.cartTotal = vm.paymentInfo.paymentTotal;
  // } else {
  //   vm.loadCart(); // cart will not load if user do membership upgrade, bcz membership purchase data not exist in api
  // }

  if (angular.isUndefined(vm.paymentInfo) || vm.paymentInfo === null) {
    vm.paymentInfo = {
      'paymentTotal': 0,
      'action': '',
      'data': [],
      'other_data': [],
      'fromState': UIState.MY_PROFILE.TEST_CENTER_DETAILS
    };
    $log.info('payment info not defined or cart is empty');
    //  return;
  }

  // ------ calculating cartTotal from cart api ------------
  function calculateSubtotals() {
    $rootScope.unpaidItemsCount = 0;
    vm.centerSubTotals = {};
    var centerId = '';
    for (var item in vm.cartDetails.items) {
      centerId = vm.cartDetails.items[item].id;
      memtype = vm.cartDetails.items[item].type;
      if (memtype === 'featured' || memtype === 'paid') {
        $rootScope.unpaidItemsCount++;
      }
      vm.centerSubTotals[centerId] = 0; // vm.cartDetails.items[item].subtotal ? vm.cartDetails.items[item].subtotal : 0;
      // vm.cartTotal += vm.cartDetails.items[item].subtotal ? vm.cartDetails.items[item].subtotal : 0;
      // sponsored layouts
      for (var sl in vm.cartDetails.items[item].sponsored_layouts) {
        for (var itm in vm.cartDetails.items[item].sponsored_layouts[sl]) {
          vm.centerSubTotals[centerId] += vm.cartDetails.items[item].sponsored_layouts[sl][itm].subtotal;
          //  vm.cartTotal += vm.cartDetails.items[item].sponsored_layouts[sl][itm].subtotal;
          $rootScope.unpaidItemsCount++;
        }
      }
      // banner ads
      for (var ads in vm.cartDetails.items[item].banner_ads) {
        vm.centerSubTotals[centerId] += vm.cartDetails.items[item].banner_ads[ads].subtotal;
        // vm.cartTotal += vm.cartDetails.items[item].banner_ads[ads].subtotal;
        $rootScope.unpaidItemsCount++;
      }
    }
    vm.cartTotal = vm.cartDetails.total_price;
  }

  //  vm.cartTotal = vm.paymentInfo.paymentTotal;
  var initStartupVars = function () {
    vm.displayMsg = 'You are just one step away from making a difference!!';
    vm.displayMsg = ($rootScope.doPaymentInitMsg) ? $rootScope.doPaymentInitMsg : 'You are just one step away from making a difference!!';
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
    // formData.append('subscribed', 'false');
    service.selectCard(formData).then(function (res) {
      service.chargeCard().then(function (res2) {
        $log.info('finally charged from saved card: ');
        //  $log.info(res2);
        vm.displayMsg = 'Payment Successfull';
        // $rootScope.$emit(Status.SUCCEEDED, 'Payment Done...');
        $rootScope.$emit(Status.HIDE_PROCESSING, '');
        ///  $state.go(UIState.MY_PROFILE.SIGNUP_COMPLETED);
        if (vm.paymentInfo.action !== "addSponsorAds") {
          //  doPendingAction(vm.paymentInfo.action, vm.paymentInfo.data);
        }
        localStorageService.remove('editBannerAdsInfo', 'sessionStorage'); // this is for bannerads pending removal after added
        $rootScope.previousStep = '';
        localStorageService.remove('paymentActionInfo');
        doPendingAction('reloadCart'); //refreshing cart
        $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
      }).catch(function (err) {
        $log.info(err);
        // doPendingAction(vm.paymentInfo.action, vm.paymentInfo.data);
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
      // doPendingAction(vm.paymentInfo.action, vm.paymentInfo.data);
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
  vm.pendingActionExecuted = 0;
  vm.congrats = function () {
    // first execute pending action
    if (vm.paymentInfo.action === "addSponsorAds" && vm.pendingActionExecuted !== 1) {
      vm.pendingActionExecuted = 1;
      //  doPendingAction(vm.paymentInfo.action, vm.paymentInfo.data);
      //  return;
    }

    if (vm.cardSelect !== 'newCard') {
      vm.payViaSavedCard();
      return;
    }
    // Validations
    var valCheck = vm.checkValidation();
    if (valCheck) {
      return;
    }

    var formData = new FormData();

    // resetting variables
    delete $rootScope.doPaymentInfoNew;
    delete $rootScope.cardSelectedMethod;

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
        // formData.append('subscribed', 'false');

        service.selectCard(formData).then(function (res1) {
          $log.info(res1);
          // now charging the selected card
          service.chargeCard().then(function (res2) {
            $log.info('finally charged : ');
            $log.info(res2);
            // $rootScope.$emit(Status.SUCCEEDED, 'Payment Done...');
            $rootScope.$emit(Status.HIDE_PROCESSING, '');
            vm.paymentProcessing = 1;
            //  doPendingAction(vm.paymentInfo.action, vm.paymentInfo.data);
            localStorageService.remove('editBannerAdsInfo', 'sessionStorage'); // this is for bannerads pending removal after added
            $rootScope.previousStep = '';
            localStorageService.remove('paymentActionInfo');
            doPendingAction('reloadCart'); // refreshing cart
            $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
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
    if (angular.isDefined($rootScope.doPaymentInfoNew) && $rootScope.doPaymentInfoNew !== null && angular.isDefined($rootScope.cardSelectedMethod)) {
      var payment = $rootScope.doPaymentInfoNew;
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
    vm.cardSelect = (angular.isDefined($rootScope.cardSelectedMethod)) ? $rootScope.cardSelectedMethod : vm.cardSelect;
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
    var month = splitExpiry[0];
    var year = splitExpiry[1];

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
      'default': 'true'
    };
    return paymentData;
  }

  vm.goBack = function () {
    $rootScope.cardSelectedMethod = vm.cardSelect;
    // before going back, check if new card option is selected and save new card info
    if (vm.cardSelect === 'newCard') {
      var paymentData = getFormData();
      // saving this step data //
      $rootScope.doPaymentInfoNew = getFormData();
    } else {
      $rootScope.doPaymentInfoNew = null;
    }
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
    /*
    if (angular.isDefined(vm.paymentInfo.fromState)) {
      if (vm.paymentInfo.fromState === 'myProfile.editSponsoredPage') {
        $rootScope.previousStep = 'doPayment';
      } else {
        $rootScope.previousStep = '';
      }
      $rootScope.previousStep = 'doPayment';
      $state.go(vm.paymentInfo.fromState);
    } else {
      $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
    }
    */
  };

  // perform pending action after successfull payment
  function doPendingAction(action, data) {
    if (action === 'bannerAdsAdd') {
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
      // bannerAdsAdd(data, 0);
    } else if (action === 'addSponsorAds') {
      addSponsorAds(data, 0);
    } else if (action === 'reloadCart') {
      vm.loadCart();
    }
  }

  function bannerAdsAdd(data, index) {
    if (index >= data.length) {
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      $log.info('Success Add');
      localStorageService.remove('edit_bannerads', 'paymentActionInfo');
      $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
    }
    vm.count++;
    var centerId = data[index].treatment_center_id;
    var formData = new FormData();
    var publishAds = {
      'content': data[index].content,
      'position': data[index].position,
      'center_web_link': data[index].center_web_link
    };
    for (var key in publishAds) {
      formData.append('banner_ad[' + key + ']', publishAds[key]);
    }
    $rootScope.$emit(Status.PROCESSING, 'Adding Banner Ads...');
    service.publishAds(formData, centerId).then(function (result) {
      bannerAdsAdd(data, (index + 1));
    }).catch(function (err) {
      $log.info(err);
      //  vm.count--;
      $rootScope.$emit(Status.HIDE_PROCESSING, '');
      // lm.$emit(Status.FAILED, 'Something went wrong');
    });
  }

  function addSponsorAds(data, index) {
    var cenId = vm.paymentInfo.other_data[0].centerId;
    var formData = new FormData();
    var sponsorData = data[0];
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }

    $rootScope.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    SponsorService.editSponsor(formData, cenId).then(function (res) {
      $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
      // $rootScope.$emit(Status.SUCCEEDED, 'Sponsored added');
      // localStorageService.remove('paymentActionInfo');
      //   $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
      //  vm.congrats(); // calling remaing part of payment funtion
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG + ' ' + err.data.error);
      $rootScope.$emit(Status.HIDE_PROCESSING, Status.PROCESSING_MSG);
      throw err;
    });
  }

}

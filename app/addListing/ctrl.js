module.exports = ['$log', '$scope', '$rootScope', ctrl];

function ctrl($log, $scope, $rootScope) {
  // initialize
  $rootScope.addListingStepDone = 0;
  $rootScope.hideSteps = [];
  // addlisting navigation control
  $scope.$on('$stateChangeStart',
    function (event, toState) {
      var tostate = toState.name.split('.');
      var step0 = ['contactInfo'];
      var step1 = step0.concat(['userInfo']);
      var step2 = ['paidMember']; // step1.concat(['paidMember']);
      var step3 = step2.concat(['centerInfo']);
      var step4 = step3.concat(['centerDetails']);
      var step5 = step4.concat(['paymentDetails']);
      var step6 = step5.concat(['sponsoredPage']);
      var step7 = step6.concat(['bannerAd']);

      var stepDone = $rootScope.addListingStepDone;
      if (tostate[0] === 'addListing') {
        if (stepDone === 0 && step0.indexOf(tostate[1]) === -1) {
          event.preventDefault();
        } else if (stepDone === 1 && step1.indexOf(tostate[1]) === -1) {
          event.preventDefault();
        } else if (stepDone === 2 && (step2.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 3 && (step3.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 4 && (step4.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 5 && (step5.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 6 && (step6.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        } else if (stepDone === 7 && (step7.indexOf(tostate[1]) === -1)) {
          event.preventDefault();
        }
      }
      // trigger savestep for done steps, work like next button
      if (stepDone === 4 && tostate[1] === 'centerDetails') {
        $rootScope.saveStep4(); // only save the step
      }
    });

  // // Require `PhoneNumberFormat`.
  // var PNF = require('google-libphonenumber').PhoneNumberFormat;
  //
  // // Get an instance of `PhoneNumberUtil`.
  // var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
  //
  // // Parse number with country code.
  // var phoneNumber = phoneUtil.parse('5645655511', 'US');
  //
  // // Print number in the international format.
  // console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));
}

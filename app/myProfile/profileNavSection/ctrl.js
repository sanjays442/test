module.exports = ['UIState', ctrl];

function ctrl(UIState) {
  var vm = this;
  vm.links = [{
    uiSref: UIState.MY_PROFILE.PROFILE,
    name: 'My Profile'
  }, {
    uiSref: UIState.MY_PROFILE.ACCOUNT_SETTING,
    name: 'Account Settings'
  }, {
    uiSref: UIState.MY_PROFILE.CHANGE_PASSWORD,
    name: 'Change Password'
  }, {
    uiSref: UIState.MY_PROFILE.MY_CENTERS,
    name: 'My Treatment Centers'
  }, {
    uiSref: UIState.MY_PROFILE.SPONSOR_ADS,
    name: 'Sponsor Pages'
  }, {
    uiSref: UIState.MY_PROFILE.BANNER_ADS,
    name: 'Banner Ads'
  }, {
    uiSref: UIState.MY_PROFILE.PAYMENT_DETAILS,
    name: 'Payment Details'
  }];
}

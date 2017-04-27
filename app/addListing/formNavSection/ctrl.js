module.exports = ['UIState', ctrl];

function ctrl(UIState) {
  var vm = this;
  vm.links = [{
    uiSref: UIState.ADD_LISTING.CONTACT_INFO,
    name: 'Contact',
    stateName: 'contactInfo'
  }, {
    uiSref: UIState.ADD_LISTING.USER_INFO,
    name: 'User Info',
    stateName: 'userInfo'
  }, {
    uiSref: UIState.ADD_LISTING.PAID_MEMBER,
    name: 'Membership',
    stateName: 'paidMember'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_INFO,
    name: 'Treatment Center',
    stateName: 'centerInfo'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Treatment Center Details',
    stateName: 'centerDetails'
  }, {
    uiSref: UIState.ADD_LISTING.PAYMENT_DETAILS,
    name: 'Payment',
    stateName: 'paymentDetails'
  }, {
    uiSref: UIState.ADD_LISTING.SPONSORED_PAGES,
    name: 'Sponsored Pages',
    stateName: 'sponsoredPage'
  }, {
    uiSref: UIState.ADD_LISTING.BANNER_AD,
    name: 'Banner Ads',
    stateName: 'bannerAd'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Featured Listing'
  }];
}

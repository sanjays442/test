module.exports = ['UIState', ctrl];

function ctrl(UIState) {
  var vm = this;
  vm.links = [{
    uiSref: UIState.ADD_LISTING.CONTACT_INFO,
    name: 'Contact',
    stateName: 'contactInfo'
  },  {
    uiSref: UIState.ADD_LISTING.PAID_MEMBER,
    name: 'Membership',
    stateName: 'paidMember'
  }, {
    uiSref: UIState.ADD_LISTING.PAYMENT_DETAILS,
    name: 'Payment',
    stateName: 'paymentDetails'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_INFO,
    name: 'Treatment Center',
    stateName: 'centerInfo'
  }, {
    uiSref: UIState.ADD_LISTING.CENTER_DETAILS,
    name: 'Treatment Center Details',
    stateName: 'centerDetails'
  }, {
    uiSref: UIState.ADD_LISTING.SPONSORED_PAGES,
    name: 'Sponsored Pages',
    stateName: 'sponsoredPage'
  }, {
    uiSref: UIState.ADD_LISTING.BANNER_AD,
    name: 'Banner Ads',
    stateName: 'bannerAd'
  }, {
    uiSref: UIState.ADD_LISTING.FEATURED_LISTING_PAGE1,
    name: 'Featured Listing',
    stateName: 'featuredListing'
  }];
  vm.cartLink = [{
    uiSref: UIState.ADD_LISTING.CART_DETAILS,
    name: 'Cart Details',
    stateName: 'cart'
  }];
  vm.srl = 1;
}

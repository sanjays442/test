var links = [{
  uiSref: 'myProfile.index',
  name: 'My Profile'
}, {
  uiSref: 'myProfile.accountSettings',
  name: 'Account Settings'
}, {
  uiSref: 'myProfile.changePassword',
  name: 'Change Password'
}, {
  uiSref: 'myProfile.myTreatmentCenters',
  name: 'My Treatment Centers'
}, {
  uiSref: 'myProfile.sponsorAds',
  name: 'Sponsor Pages'
}, {
  uiSref: 'myProfile.bannerAds',
  name: 'Banner Ads'
}, {
  uiSref: 'myProfile.paymentDetails',
  name: 'Payment Details'
}];

function ProfileNavSectionCtrl() {
  var vm = this;
  vm.links = links;
}

module.exports = {
  template: require('./view.html'),
  controller: ProfileNavSectionCtrl,
  bindings: {
    'profilePic': '<'
  }
};

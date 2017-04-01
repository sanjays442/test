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
  uiSref: 'sponsorAdsList',
  name: 'Sponsor Pages'
}, {
  uiSref: 'bannerAdsList',
  name: 'Banner Ads'
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

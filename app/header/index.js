var internalLinks = [{
  uiSref: 'home',
  name: 'Home'
}, {
  uiSref: 'treatmentCenterMap',
  name: 'Treatment Centers'
}, {
  uiSref: 'aboutUs',
  name: 'About Us'
}, {
  uiSref: 'blog',
  name: 'Blog'
}, {
  uiSref: 'contactUs',
  name: 'Contact Us'
}, {
  uiSref: 'centerDetail',
  name: 'Add Listing'
}, {
  uiSref: 'login',
  name: 'Login',
  id: 'adic-login'
}, {
  uiSref: 'logout',
  name: 'Logout',
  id: 'adic-logout'
}, {
  uiSref: 'myProfile.index',
  name: 'My Profile',
  id: 'adic-my-profile'
}];

var socialLinks = [{
  href: 'https://www.facebook.com/theaddictionnetwork',
  img: 'themes/addiction/images/fb-2.png'
}, {
  href: 'https://twitter.com/AddictionNet1',
  img: 'themes/addiction/images/twitter-ff-2.png'
}, {
  href: 'https://www.google.com/+Addictionnetwork1',
  img: 'themes/addiction/images/gglplus.png'
}];

function HeaderCtrl() {
  /* todo */
  this.socialLinks = socialLinks;
  this.internalLinks = internalLinks;
}

module.exports = {
  template: require('./view.html'),
  controller: HeaderCtrl
};

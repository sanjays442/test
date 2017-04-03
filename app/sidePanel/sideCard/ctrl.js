var originalDateset = require('./slug.json');

function SideCardCtrl($attrs) {
  var type = $attrs.type;
  var arr = originalDateset[type];
  this.type = type;
  this.listings = arr.map(function (listing) {
    return {
      uiSref: 'sponsorHome({slug: "' + listing + '"})',
      name: listing
    };
  });
}

module.exports = ['$attrs', SideCardCtrl];

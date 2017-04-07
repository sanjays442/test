module.exports = ['$attrs', '$state', ctrl];

var originalDateset = require('./slug.json');

function ctrl($attrs, $state) {
  var vm = this;
  vm.$onInit = onInit;
  vm.nagivateTo = nagivateTo;

  function onInit() {
    var type = $attrs.type;
    vm.filter = type;
    var arr = originalDateset[type];
    vm.listings = arr.map(function (listing) {
      return {
        uiSref: 'sponsorHome({slug: "' + listing + '"})',
        name: listing
      };
    });
  }

  function nagivateTo(listing) {
    $state.go('sponsorHome.filter', {
      filterName: listing.name
    });
  }
}

module.exports = ['$attrs', 'UIState', 'SponsorService', ctrl];

// var originalDateset = require('./slug.json');

function ctrl($attrs, UIState, service) {
  var vm = this;
  vm.$onInit = onInit;
  vm.demographies = [];

  function onInit() {
    // failed at using bindings because there is a space in the type attribute.
    var type = $attrs.type;
    vm.filter = type;
    // var arr = originalDateset[type];
    // vm.listings = arr.map(function (value) {
    //   var name = value.split('|');
    //   return {
    //     name: name[0],
    //     uiSref: UIState.SPONSOR_HOME.FILTER + '({filterName:"' + name[1] + '"})'
    //   };
    // });

    getDemographies();
  }

  function getDemographies() {
    service.getSponsoredDemographic().then(function (response) {
      var slug = '';
      var cardDetail = [];
      for (var key in response) {
        var cardInfo = [];
        cardDetail = response[key];
        for (var dem in cardDetail) {
          var name = cardDetail[dem].name.split(' /').join('');
          slug = name.split(' ').join('-');
          cardInfo[dem] = {
            heading: key,
            name: cardDetail[dem].name,
            uiSref: UIState.SPONSOR_HOME.FILTER + '({filterName:"' + slug.toLowerCase() + '"})'
          };
        }
        vm.demographies.push({
          card: key,
          cardInfo: cardInfo
        });
      }
    });
  }
}

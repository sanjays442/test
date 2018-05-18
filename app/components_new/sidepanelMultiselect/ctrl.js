module.exports = ['$rootScope', ctrl];

var dateset = require('./slug.json');

function ctrl($rootScope) {
  var vm = this;
  vm.$onInit = onInit;
  $rootScope.sidelLinksModel = [];
  vm.sidelLinksModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: true,
    checkBoxes: true,
    groupByTextProvider: function (groupValue) {
      return groupValue;
    },
    groupBy: 'group'
  };

  function onInit() {
    // failed at using bindings because there is a space in the type attribute.
    var arr = dateset;
    var sideLinks = [];
    var i = 0;
    for (var key in arr) {
      for (var key1 in arr[key]) {
        sideLinks[i] = {
          id: arr[key][key1],
          label: arr[key][key1],
          group: key
        };
        i++;
      }
    }
    vm.sideLinks = sideLinks;
  }
}

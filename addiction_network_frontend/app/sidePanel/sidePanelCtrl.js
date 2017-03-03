var originalDateset = require('./slug.json'),
  urlPrefix = 'http://www.addictionnetwork.com';

function SidePanelCtrl($scope, $element, $attrs) {
  var type = $attrs.type;
  var arr = originalDateset[type];
  this.type = type;
  this.listings = arr.map(function (elem) {
    var slug = elem.toLowerCase();
    slug = slug.replace(/ |\//g, '_');
    return {
      link: '#/sponsorhome/?slug=' + slug,
      name: elem
    };
  });
}

module.exports = ['$scope', '$element', '$attrs', SidePanelCtrl];

module.exports = ['$attrs', ctrl];

var MAX_STAR = 5,
  halfStarImg = 'themes/addiction/images/review_star-half.png',
  fullStarImg = 'themes/addiction/images/review_star.png';

function ctrl($attrs) {
  var vm = this;
  vm.images = [];
  vm.$onInit = onInit;
  vm.$onChanges = onChanges;
  vm.onClick = onClick;

  function onInit() {
    vm.displayOnly = $attrs.hasOwnProperty('displayOnly');
  }

  function onChanges(changeObj) {
    if (!changeObj.star) {
      return;
    }
    var _star = changeObj.star.currentValue;
    _update(_star);
  }

  function onClick(index) {
    if (vm.displayOnly) {
      return;
    }
    _update(index);
    vm.onStarUpdate({
      star: index
    });
  }

  function _update(star) {
    var _star = star > MAX_STAR ? MAX_STAR : star;
    // vm.star = _star;
    for (var i = 0; i < MAX_STAR; i++) {
      if (i < _star) {
        vm.images[i] = fullStarImg;
      } else {
        vm.images[i] = halfStarImg;
      }
    }
  }
}

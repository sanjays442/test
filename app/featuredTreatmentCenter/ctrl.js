module.exports = ['$anchorScroll', ctrl];

function ctrl($anchorScroll) {
  var vm = this;
  vm.$postLink = postLink;

  function postLink() {
    $anchorScroll();
  }
}

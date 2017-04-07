module.exports = ['$element', 'mapConfig', ctrl];

function ctrl($element, config) {
  var vm = this;
  // assign the map config to the controller, so html template can access it
  vm.config = config;

  vm.$postLink = postLink;

  function postLink() {
    // the targets are thoese path elements in graphic element(#state)
    var selector = '#states path';
    // use event delegation to add mouse events on the target elements.
    $element.on('mouseenter', selector, function (event) {
      var target = event.target;
      target.setAttribute('fill', config.overcolor);
    });
    $element.on('mouseleave', selector, function (event) {
      var target = event.target;
      target.setAttribute('fill', config.upcolor);
    });
    $element.on('mousedown', selector, function (event) {
      var target = event.target;
      target.setAttribute('fill', config.downcolor);
    });
    $element.on('mouseup', selector, function (event) {
      var target = event.target;
      var id = target.getAttribute('id');
      var stateData = config.states.find(compareId(id));
      if (!stateData) {
        // should never have been this case
        return;
      }
      vm.onSelect({
        state: {
          shortname: stateData.shortname,
          fullname: stateData.fullname
        }
      });
    });
  }
  // find the exact state data from map confing data (map.json) by id
  function compareId(id) {
    return function (state) {
      return state.id === id;
    };
  }
}

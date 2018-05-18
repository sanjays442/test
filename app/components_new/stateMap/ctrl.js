module.exports = ['$log', '$document', '$element', 'mapConfig', '$rootScope', ctrl];

function ctrl($log, $document, $element, config, $rootScope) {
  var vm = this;
  // assign the map config to the controller, so html template can access it
  vm.config = config;
  vm.$postLink = postLink;
  vm.byPassStates = [];
  vm.currentSelected = '';
  vm.prevTarget = '';
  vm.prevSelected = '';

  function postLink() {
    // the targets are thoese path elements in graphic element(#state)
    var selector = '#states path';
    // use event delegation to add mouse events on the target elements.
    $element.on('mouseenter', selector, function (event) {
      var target = event.target;
    //  target.setAttribute('fill', config.overcolor);
    });
    $element.on('mouseleave', selector, function (event) {
      var target = event.target;
      $log.info('by pass states: ');
      $log.info(vm.byPassStates);
    //  vm.prevTarget = target;
      var shortname = target.getAttribute('shortname');
      if (vm.byPassStates.indexOf(shortname) === -1 && vm.currentSelected !== shortname) {
        target.setAttribute('fill', config.upcolor);
        $log.info('normal');
      }
      if (vm.currentSelected === shortname) {
        target.setAttribute('fill', '#015b8e');
        $log.info('leave event ' + shortname);
      }
      if (vm.prevTarget !== '' && vm.prevTarget !== target) {
      //  vm.prevTarget.setAttribute('fill', config.upcolor);
      }
    //  vm.prevTarget = target;
  //    vm.prevSelected = shortname;
  //    target.setAttribute('fill', '#f8eded');
    });
    $element.on('mousedown', selector, function (event) {
      var target = event.target;
    //  target.setAttribute('fill', config.downcolor);
    //  target.setAttribute('fill', config.downcolor);
    });
    $element.on('click', selector, function (event) {
      $log.info('from main');
      $log.info(vm.selectedStates);
      var target = event.target;
      var shortname = target.getAttribute('shortname');
    //  $log.info(target);
      var selectedStates = vm.selectedStates;// $rootScope.selectedMapStates;
      $log.info('prev selected: ' + vm.prevSelected);
      if (angular.isDefined(vm.prevSelected)  && vm.byPassStates.indexOf(vm.prevSelected) >= 0  ) {
        $log.info('prev targeet: ' + vm.prevTarget);
        if (vm.prevTarget !== '') {
          vm.prevTarget.setAttribute('fill', '#8f8686');
        } else {
          dynElem =  $document.find("[shortname='" + vm.prevSelected + "']");
          dynElem.attr('fill', '#8f8686');
        }
      } else if (vm.prevSelected !== '' && vm.byPassStates.indexOf(vm.prevSelected) === -1) {
        if (vm.prevTarget !== '') {
          vm.prevTarget.setAttribute('fill',  config.upcolor);
        } else {
          dynElem =  $document.find("[shortname='" + vm.prevSelected + "']");
          dynElem.attr('fill', '#ebeced');
        }
        $log.info('prev target: unselected default color' + vm.prevSelected );
      } else if (angular.isDefined(vm.prevTarget) && vm.prevTarget !== '') {
        // vm.prevTarget.setAttribute('fill', config.upcolor);
      }
      console.log( event);
      console.log( selectedStates);
    //  console.log( angular.element(target).data('shortname'));

      vm.currentSelected = shortname;
      console.log(shortname);
      for (var map in selectedStates) {
      //  $log.info(map + ' ---  ' + selectedStates[map]);
        if (map === shortname && selectedStates[map] === true) {
          $log.info('selected: ' + shortname);
          $log.info('pushing: ' + shortname);
          target.setAttribute('fill', '#8f8686'); // grey
          var index =  vm.byPassStates.indexOf(shortname);
          if (index === -1) {
            vm.byPassStates.push(shortname);
          }
        } else if (map === shortname && selectedStates[map] === false) {
          target.setAttribute('fill', config.upcolor);
          $log.info('poping: ' + shortname);
          var index =  vm.byPassStates.indexOf(shortname);
          if (index > -1) {
            vm.byPassStates.splice(index, 1);
          }
        }
      }
      vm.prevTarget = target;
      vm.prevSelected = shortname;
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
          fullname: stateData.fullname,
          id: stateData.id,
          transform: stateData.transform,
          d: stateData.d,
          upcolor: vm.config.upcolor,
          statestroke: vm.config.statestroke,
          namefill: vm.config.namefill,
          latlong: stateData.latlong,
          zoomlevel: stateData.zoomlevel,
          image: stateData.image,
          slugState: stateData.slugState
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

  // broadcast listen events
  var unbindFn1;
  var vm = this;
  vm.$onInit = onInit;
  vm.$onDestroy = onDestroy;
  if (angular.isUndefined(vm.run)) {
    vm.run = 1;
  }
  console.log('map ran' + vm.run);
  vm.run++;
  function onInit() {
    unbindFn1 = $rootScope.$on('loadMapSelection', handleLoadMapSelection);
    unbindFn2 = $rootScope.$on('stateSelectedData', handleStateSelDataEvent);
    unbindFn3 = $rootScope.$on('stateSelectAll', handleStateSelAllEvent);
  }
  // outer click scope
  function handleStateSelDataEvent(event, data) {
    vm.selectedStates = data.stateSelected;
    vm.currentSelected = data.curSelected;
    vm.statusSelect = data.status;
    shortname =   vm.currentSelected;
    var selectedStates = vm.selectedStates;
    // when clicked from outer links check for previous selected
    $log.info('TESSSSSSS prev selected: ' + vm.prevSelected);
    $log.info('bypass array ' + vm.byPassStates);
    if (angular.isDefined(vm.prevSelected) && vm.byPassStates.indexOf(vm.prevSelected) >= 0 ) {
      if (vm.prevTarget !== '') {
        $log.info(vm.prevTarget);
        $log.info('prev target: ' + vm.prevTarget);
        vm.prevTarget.setAttribute('fill', '#8f8686');
      } else {
        $log.info('prevSelected: ' + vm.prevSelected);
        dynElem =  $document.find("[shortname='" + vm.prevSelected + "']");
        dynElem.attr('fill', '#8f8686');
      }
    } else if (vm.prevSelected !== '' && vm.byPassStates.indexOf(vm.prevSelected) === -1) {
      if (vm.prevTarget !== '') {
        vm.prevTarget.setAttribute('fill',  config.upcolor);
      } else {
        dynElem =  $document.find("[shortname='" + vm.prevSelected + "']");
        dynElem.attr('fill', '#ebeced');
      }
    }
    for (var map in selectedStates) {
    //  $log.info(map + ' ---  ' + selectedStates[map]);
      if (map === shortname && selectedStates[map] === true) {
        $log.info('selected: ' + shortname);
        $log.info('pushing: ' + shortname);
        // target.setAttribute('fill', '#8f8686'); // grey
        index =  vm.byPassStates.indexOf(shortname);
        if (index === -1) {
          vm.byPassStates.push(shortname);
        }
      } else if (map === shortname && selectedStates[map] === false) {
      //  target.setAttribute('fill', config.upcolor);
        $log.info('poping: ' + shortname);
        index =  vm.byPassStates.indexOf(shortname);
        if (index > -1) {
          vm.byPassStates.splice(index, 1);
        }
      }
    }
    var dynElem = '';
    if (vm.currentSelected === shortname) {
      dynElem =  $document.find("[shortname='" + shortname + "']");
      dynElem.attr('fill', '#015b8e'); // blue
      $log.info('filling blue to: ' + shortname);
    } else {

    }

    // when clicked from outer links check for previous selected
    // if (vm.prevSelected !== shortname && vm.prevSelected !== '') {
    //   index =  vm.byPassStates.indexOf(vm.prevSelected);
    //   dynElem =  $document.find("[shortname='" + vm.prevSelected + "']");
    //
    //   $log.info('TESSSSSSS: ' + index);
    //   if (index > -1) {
    //     dynElem.attr('fill', '#8f8686'); // grey
    //   } else {
    //     dynElem.attr('fill', '#ebeced');
    //   }
    // }
    vm.prevTarget = '';
    vm.prevSelected = shortname;
  }

  function handleLoadMapSelection(event, data) {
    if (already == '') {
      var already = 0;
    } else {
      already = already + 1;
    }
    if (already > 0) {
      console.log('return');
      return;
    }

    $log.info('load........');
    var dynElem = '';
    var stateSelected = data.stateSelected;
    for (var state in stateSelected) {
      $log.info(state);
      if ( stateSelected[state] === true) {
        dynElem =  $document.find("[shortname='" + state + "']");
        dynElem.attr('fill', '#8f8686');
        index =  vm.byPassStates.indexOf(state);
        if (index === -1) {
          vm.byPassStates.push(state);
        }
      }
    }
  }
  // select all feauture
  function handleStateSelAllEvent(event, data) {
    if (already == '') {
      var already = 0;
    } else {
      already = already + 1;
    }
    if (already > 0) {
      console.log('return');
      return;
    }

    $log.info('load........Select all');
    var dynElem = '';
    var stateSelected = data.stateSelected;
    for (var state in stateSelected) {
      // $log.info(state);
      if ( stateSelected[state] === true) {
        dynElem =  $document.find("[shortname='" + state + "']");
        dynElem.attr('fill', '#8f8686');
        index =  vm.byPassStates.indexOf(state);
        if (index === -1) {
          vm.byPassStates.push(state);
        }
      }
    }
  }
  function onDestroy() {
    unbindFn1();
    unbindFn2();
    unbindFn2();
  }
}

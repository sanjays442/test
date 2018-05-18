module.exports = ['$document', '$log', '$rootScope', '$injector', '$state', 'UIState', 'SponsorService', 'TreatmentCenterService', 'localStorageService', 'Status', '$timeout', 'MapService', ctrl];

function ctrl($document, $log, $rootScope, $injector, $state, UIState, service, centerService, localStorageService, Status, $timeout, mapService) {
  var vm = this;
  var value = 0;

  vm.checkFirst = function () {
    value++;
    if (value > 6) {
      if ($rootScope.centerSelected.length === 0) {
        $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
      }
    }
  };

  // initializing side cards values
  vm.multiselectModelSettings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };
  vm.demographic = {
    scrollableHeight: '195px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      // if (itemText === 'Jhon') {
      //   return 'Jhonny!';
      // }
      // return itemText;
      return 'Demographic';
    }
  };
  vm.settings = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Setting';
    }
  };
  vm.treatment = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Treatment Approach';
    }
  };
  vm.additional_services = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Additional Services';
    }
  };
  vm.payment = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'Payment';
    }
  };
  vm.byDrug = {
    scrollableHeight: '200px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'By Drug';
    }
  };

  vm.stateSelectSetting = {
    scrollableHeight: '235px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: false,
    checkBoxes: true
  };

  vm.buttonTxtDemographic = {
    buttonDefaultText: 'Demographic'
  };
  vm.buttonTxtTreatmentApproach = {
    buttonDefaultText: 'Treatment Approach'
  };
  vm.buttonTxtSetting = {
    buttonDefaultText: 'Setting'
  };
  vm.buttonTxtAdditionalServices = {
    buttonDefaultText: 'Additional Services'
  };
  vm.buttonTxtPayment = {
    buttonDefaultText: 'Payment'
  };
  vm.buttonTxtByDrug = {
    buttonDefaultText: 'By Drug'
  };

  $rootScope.demographic = [];
  $rootScope.treatmentApproach = [];
  $rootScope.setting = [];
  $rootScope.additionalServices = [];
  $rootScope.payment = [];
  $rootScope.byDrug = [];

  if (angular.isUndefined($rootScope.activeCenter)) {
    $rootScope.activeCenter = '';
  }
  if (angular.isUndefined(vm.centerWise)) {
    vm.centerwise = {};
  }

  // pre load from cart item
  vm.setCategoryCartData = function (cartMode) {
    var actCen = cartMode.data.id;
    var catgs = [];
    for (var key in cartMode.data.sponsored_layouts.categories) {
      //  $rootScope.treatmentApproachModel[actCen].push();
      catgs.push(cartMode.data.sponsored_layouts.categories[key].name);
    }

    var demographic = $rootScope.otherIds.Demographic;
    $rootScope.demographicModel = {};
    $rootScope.demographicModel[actCen] = [];
    for (var key in demographic) {
      if (catgs.indexOf(demographic[key].name) >= 0) {
        $rootScope.demographicModel[actCen].push({
          'id': demographic[key].id
        });
      }
    }

    var treatmentApproach = $rootScope.otherIds['Treatment Approach'];
    $rootScope.treatmentApproachModel = {};
    $rootScope.treatmentApproachModel[actCen] = [];
    for (key in treatmentApproach) {
      if (catgs.indexOf(treatmentApproach[key].name) >= 0) {
        $rootScope.treatmentApproachModel[actCen].push({
          'id': treatmentApproach[key].id
        });
      }
    }

    var setting = $rootScope.otherIds.Setting;
    $rootScope.settingModel = {};
    $rootScope.settingModel[actCen] = [];
    for (key in setting) {
      if (catgs.indexOf(setting[key].name) >= 0) {
        $rootScope.settingModel[actCen].push({
          'id': setting[key].id
        });
      }
    }

    var additionalServices = $rootScope.otherIds['Additional Services'];
    $rootScope.additionalServicesModel = {};
    $rootScope.additionalServicesModel[actCen] = [];
    for (key in additionalServices) {
      if (catgs.indexOf(additionalServices[key].name) >= 0) {
        $rootScope.additionalServicesModel[actCen].push({
          'id': additionalServices[key].id
        });
      }
    }

    var payment = $rootScope.otherIds.Payment;
    $rootScope.paymentModel = {};
    $rootScope.paymentModel[actCen] = [];
    for (key in payment) {
      if (catgs.indexOf(payment[key].name) >= 0) {
        $rootScope.paymentModel[actCen].push({
          'id': payment[key].id
        });
      }
    }
    var byDrug = $rootScope.otherIds['By Drug'];
    $rootScope.byDrugModel = {};
    $rootScope.byDrugModel[actCen] = [];
    for (key in byDrug) {
      if (catgs.indexOf(byDrug[key].name) >= 0) {
        $rootScope.byDrugModel[actCen].push({
          'id': byDrug[key].id
        });
      }
    }
  };

  // get other sponsored ids
  if (angular.isUndefined($rootScope.otherIds) || $rootScope.otherIds === null) {
    service.getSponsoredDemographic().then(function (response) {
      $rootScope.otherIds = response;
      setOtherDemography();
    });
  } else {
    setOtherDemography();
  }

  function setOtherDemography() {
    if ($rootScope.centerSelected.length === 0) {
      var disabledValue = true;
    } else {
      disabledValue = false;
    }
    var demographic = $rootScope.otherIds.Demographic;
    for (var key in demographic) {
      // console.log('slug: ' + slug + ' value: ' + slugs.Demographic[slug]);
      $rootScope.demographic[key] = {
        id: demographic[key].id,
        label: demographic[key].name,
        price: demographic[key].price
      };
    }
    var treatmentApproach = $rootScope.otherIds['Treatment Approach'];
    for (key in treatmentApproach) {
      // console.log('slug: ' + slug + ' value: ' + slugs.TreatmentApproach[slug]);
      $rootScope.treatmentApproach[key] = {
        id: treatmentApproach[key].id,
        label: treatmentApproach[key].name,
        price: treatmentApproach[key].price
      };
    }

    var setting = $rootScope.otherIds.Setting;
    for (key in setting) {
      $rootScope.setting[key] = {
        id: setting[key].id,
        label: setting[key].name,
        price: setting[key].price
      };
    }

    var additionalServices = $rootScope.otherIds['Additional Services'];
    for (key in additionalServices) {
      $rootScope.additionalServices[key] = {
        id: additionalServices[key].id,
        label: additionalServices[key].name,
        price: additionalServices[key].price
      };
    }

    var payment = $rootScope.otherIds.Payment;
    for (key in payment) {
      $rootScope.payment[key] = {
        id: payment[key].id,
        label: payment[key].name,
        price: payment[key].price
      };
    }
    var byDrug = $rootScope.otherIds['By Drug'];
    for (key in byDrug) {
      $rootScope.byDrug[key] = {
        id: byDrug[key].id,
        label: byDrug[key].name,
        price: byDrug[key].price
      };
    }

    // test if cartmode
    // --------------check if edit/delete/add mode -------------------//
    var cartMode = localStorageService.get('cartMode');
    vm.cartMode = localStorageService.get('cartMode');
    if (angular.isDefined(cartMode) && cartMode !== null) {
      if (cartMode.mode === 'edit' && cartMode.item === 'sponsored_layouts') {
        vm.setCategoryCartData(cartMode);
        // localStorageService.remove('cartMode');
        // vm.updateCart();
        $log.info(cartMode.data);
        saveToLocalStorage($rootScope, localStorageService);
        $rootScope.onInit();
      }
    }
  }

  vm.onStateSelect = function (state) {
    // vm.open(state); // testing purpose
    if (angular.isDefined($rootScope.treatmentCentersModel) && $rootScope.treatmentCentersModel.length > 0) {
      vm.open(state, false);
    } else if (angular.isDefined($rootScope.centerSelected.length) && $rootScope.centerSelected.length > 0) {
      vm.open(state, false);
    } else {
      $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
      return;
    }
    // if ($rootScope.centerSelected.length > 0) {
    //   vm.open(state);
    // } else {
    //   $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
    //   return;
    // }
  };
  $rootScope.countyText = {
    buttonDefaultText: 'Select County'
  };
  $rootScope.cityText = {
    buttonDefaultText: 'Select City'
  };
  $rootScope.stateSelectText = {
    buttonDefaultText: 'Select State'
  };

  // getting all states
  if (angular.isUndefined($rootScope.allStates) || $rootScope.allStates === null) {
    mapService.getStates().then(function (response) {
      $rootScope.allStates = response;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }
  // get states ids
  if (angular.isUndefined($rootScope.stateIds) || $rootScope.stateIds === null) {
    service.getSponsoredStatesSignup().then(function (response) {
      $rootScope.stateIds = response.states;
      // preselect states checkbox
      if (vm.stateCheckCtrlRun !== 1) {
        $timeout(function () {
          vm.stateCheckCtrl();
        }, 800);
      }
      var statesCol = Math.ceil(($rootScope.stateIds.length / 9));
      vm.statesColsHtml = [];
      for (i = 1; i <= statesCol; i++) {
        vm.statesColsHtml.push(i * 9);
      }
    });
  } else {
    var statesCol = Math.ceil(($rootScope.stateIds.length / 9));
    vm.statesColsHtml = [];
    for (i = 1; i <= statesCol; i++) {
      vm.statesColsHtml.push(i * 9);
    }
  }

  vm.checkboxCheck = function () {
    if ($rootScope.centerSelected.length === 0) {
      $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
      vm.checkAllText = ' Select all states';
      event.preventDefault();
      return;
    }
  };
  vm.selectStateAll = function () {
    if ($rootScope.checkedAllStates[$rootScope.activeCenter]) {
      vm.checkAllText[$rootScope.activeCenter] = ' Unselect all states';
      vm.selectAllState(true, 0);
    } else {
      vm.checkAllText[$rootScope.activeCenter] = ' Select all states';
      $rootScope.statesSel[$rootScope.activeCenter] = [];
      $rootScope.checkedStateModel[$rootScope.activeCenter] = [];
      $rootScope.checkedStateDetail[$rootScope.activeCenter] = [];
      vm.selectAllState(false, 0);
    }
    vm.updateCart();
  };

  // get values from localStorageService
  if (angular.isDefined(localStorageService.get('signupSponsoredPage', 'sessionStorage'))) {
    var sponsoredInfo = localStorageService.get('signupSponsoredPage', 'sessionStorage');
    if (sponsoredInfo !== null) {
      $rootScope.cityModel = sponsoredInfo.cityModel;
      $rootScope.countyModel = sponsoredInfo.countyModel;

      $rootScope.statesSel = sponsoredInfo.statesSel;
      $rootScope.demographicModel = sponsoredInfo.demographic;
      $rootScope.treatmentApproachModel = sponsoredInfo.treatmentApproach;
      $rootScope.settingModel = sponsoredInfo.setting;
      $rootScope.additionalServicesModel = sponsoredInfo.additionalServices;
      $rootScope.paymentModel = sponsoredInfo.payment;
      $rootScope.byDrugModel = sponsoredInfo.byDrug;
      if (sponsoredInfo.treatmentCenter) {
        $rootScope.centerSelected = sponsoredInfo.treatmentCenter;
        $rootScope.treatmentCentersModel = sponsoredInfo.treatmentCenter;
      }
      $rootScope.checkedAllStates = sponsoredInfo.checkedAllStates;

      $rootScope.checkedStateModel = sponsoredInfo.checkedStateModel;
      $rootScope.checkedStateDetail = sponsoredInfo.checkedStateDetail;
      // $rootScope.stateSelectModel = sponsoredInfo.stateSelectModel;
    }
  }

  // initializing according to centerid
  $rootScope.loadModelsCenterwise = function () {
    if (angular.isUndefined($rootScope.checkedAllStates) || $rootScope.checkedAllStates === null) {
      $rootScope.checkedAllStates = {};
      for (var cen in $rootScope.treatmentCentersValue) {
        var centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.checkedAllStates[centerId] = '';
      }
    }
    if (angular.isUndefined(vm.checkAllText) || vm.checkAllText === null) {
      vm.checkAllText = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        vm.checkAllText[centerId] = ' Select all states';
      }
    }

    if (angular.isUndefined($rootScope.checkedStateModel) || angular.isUndefined($rootScope.checkedStateModel[$rootScope.activeCenter]) || $rootScope.checkedStateModel.length === 0) {
      $rootScope.checkedStateModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.checkedStateModel[centerId] = [];
      }
    }

    if (angular.isUndefined($rootScope.statesSel) || angular.isUndefined($rootScope.statesSel[$rootScope.activeCenter]) || $rootScope.statesSel === null) {
      $rootScope.statesSel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.statesSel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.statesDetail) || angular.isUndefined($rootScope.statesDetail[$rootScope.activeCenter]) || $rootScope.statesDetail === null) {
      $rootScope.statesDetail = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.statesDetail[centerId] = [];
      }
    }

    if (angular.isUndefined($rootScope.checkedStateDetail) || angular.isUndefined($rootScope.checkedStateDetail[$rootScope.activeCenter]) || $rootScope.checkedStateDetail === null) {
      $rootScope.checkedStateDetail = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.checkedStateDetail[centerId] = [];
      }
    }

    if (angular.isUndefined($rootScope.cityModel) || angular.isUndefined($rootScope.cityModel[$rootScope.activeCenter]) || $rootScope.cityModel === null) {
      $rootScope.cityModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.cityModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.countyModel) || angular.isUndefined($rootScope.countyModel[$rootScope.activeCenter]) || $rootScope.countyModel === null) {
      $rootScope.countyModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.countyModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.demographicModel) || angular.isUndefined($rootScope.demographicModel[$rootScope.activeCenter]) || $rootScope.demographicModel.length === 0 || $rootScope.demographicModel === null) {
      $rootScope.demographicModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.demographicModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.treatmentApproachModel) || angular.isUndefined($rootScope.treatmentApproachModel[$rootScope.activeCenter]) || $rootScope.treatmentApproachModel === null) {
      $rootScope.treatmentApproachModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.treatmentApproachModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.settingModel) || angular.isUndefined($rootScope.settingModel[$rootScope.activeCenter]) || $rootScope.settingModel === null) {
      $rootScope.settingModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.settingModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.additionalServicesModel) || angular.isUndefined($rootScope.additionalServicesModel[$rootScope.activeCenter]) || $rootScope.additionalServicesModel === null) {
      $rootScope.additionalServicesModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.additionalServicesModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.paymentModel) || angular.isUndefined($rootScope.paymentModel[$rootScope.activeCenter]) || $rootScope.paymentModel === null) {
      $rootScope.paymentModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.paymentModel[centerId] = [];
      }
    }
    if (angular.isUndefined($rootScope.byDrugModel) || angular.isUndefined($rootScope.byDrugModel[$rootScope.activeCenter]) || $rootScope.byDrugModel === null) {
      $rootScope.byDrugModel = {};
      for (cen in $rootScope.treatmentCentersValue) {
        centerId = $rootScope.treatmentCentersValue[cen].id;
        $rootScope.byDrugModel[centerId] = [];
      }
    }
    if (angular.isDefined($rootScope.stateIds) || $rootScope.stateIds !== null) {
      // preselect states checkbox, categories selected highlights
      if (vm.stateCheckCtrlRun !== 1) {
        $timeout(function () {
          vm.stateCheckCtrl();
          vm.highlightSelectedCategories(); // code written below
        }, 800);
      }
    }
  };

  // var token = localStorageService.get('signupToken');
  vm.open = function (state, checkboxClick) {
    vm.activeState = {
      id: state.id,
      name: state.fullname
    };
    vm.stateCheckboxClick(state, true, true);
    // var stateMap = '<svg version="1.1" id="state_map" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewbox="' + state.viewbox + '" xml:space="preserve">  <g id="state">   <g> <path ng-attr-id="' + state.id + '" ng-attr-fill="' + state.upcolor + '" ng-attr-stroke="' + state.statestroke + '" ng-attr-d="' + state.d + '" stroke-width="1" cursor="pointer"></path></g></g><g id="abb"><text ng-attr-id="' + state.shortname + '" ng-attr-transform="' + state.transform + '" pointer-events="none"><tspan x="0" y="0" font-family="Arial" font-size="11" ng-attr-fill="' + state.slugfill + '">' + state.shortname + '</tspan></text></g></svg>';
    // var stateMap = '<div id="googleMap" style="width:100%;height:400px;"></div><script>function myMap() {  var mapProp = {center: new google.maps.LatLng(' + state.latlong + '),zoom:' + state.zoomlevel + '};var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);}</script><script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzZiyHarHVkYQCBywa0HYl0MD77BRiL64&callback=myMap"></script>';
    //  var stateMap = '<img src="themes/addiction/images/' + state.image + '.png" style = "width:100%;opacity:0.2">';
    //  getCountyCity(vm, state, stateMap, service, $injector, $rootScope, localStorageService);
  };

  // ------ New functions for updating models of 6 categories without dropdown multiselect --------- //
  if (angular.isUndefined(vm.categoriesActiveIds)) {
    vm.categoriesActiveIds = [];
    vm.categoriesActiveIds[$rootScope.activeCenter] = {};
  }
  vm.updateCategoriesModel = function (value, catgType) {
    // $log.info($rootScope.demographicModel[$rootScope.activeCenter]);
    var id = value.id;
    var label = value.label;
    var modelObj = {
      'id': id
    };
    var matched = 0;
    var demographicModel = $rootScope.demographicModel[$rootScope.activeCenter];
    var treatmentApproachModel = $rootScope.treatmentApproachModel[$rootScope.activeCenter];
    var paymentModel = $rootScope.paymentModel[$rootScope.activeCenter];
    var additionalServicesModel = $rootScope.additionalServicesModel[$rootScope.activeCenter];
    var settingModel = $rootScope.settingModel[$rootScope.activeCenter];
    var byDrugModel = $rootScope.byDrugModel[$rootScope.activeCenter];

    if (angular.isUndefined(vm.categoriesActiveIds)) {
      vm.categoriesActiveIds = [];
      vm.categoriesActiveIds[$rootScope.activeCenter] = {};
    }

    if (catgType === 'demographic') {
      // testing if id is already exist in model before pushing
      for (var key in demographicModel) {
        if (demographicModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        demographicModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectDemographic(modelObj);
      } else {
        // Item selected: add into model
        $log.info('not there: ' + label);
        demographicModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
    if (catgType === 'treatmentApproach') {
      // testing if id is already exist in model before pushing
      for (var key in treatmentApproachModel) {
        if (treatmentApproachModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        treatmentApproachModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectTreatment(modelObj);
      } else {
        // Item selected: add into model
        treatmentApproachModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
    if (catgType === 'payment') {
      // testing if id is already exist in model before pushing
      for (var key in paymentModel) {
        if (paymentModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        paymentModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectPayment(modelObj);
      } else {
        // Item selected: add into model
        paymentModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
    if (catgType === 'additionalServices') {
      // testing if id is already exist in model before pushing
      for (var key in additionalServicesModel) {
        if (additionalServicesModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        additionalServicesModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectAdditional(modelObj);
      } else {
        // Item selected: add into model
        additionalServicesModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
    if (catgType === 'setting') {
      // testing if id is already exist in model before pushing
      for (var key in settingModel) {
        if (settingModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        settingModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectSetting(modelObj);
      } else {
        // Item selected: add into model
        settingModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
    if (catgType === 'byDrug') {
      // testing if id is already exist in model before pushing
      for (var key in byDrugModel) {
        if (byDrugModel[key].id === id) {
          matched = 1;
          break;
        }
      }
      if (matched === 1) {
        // Item deSelected: remove from model
        byDrugModel.splice(key, 1);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = false;
        vm.itemDeselectBydrug(modelObj);
      } else {
        // Item selected: add into model
        byDrugModel.push(modelObj);
        vm.categoriesActiveIds[$rootScope.activeCenter][id] = true;
        vm.updateCart();
      }
    }
  };

  vm.highlightSelectedCategories = function () {
    vm.categoriesActiveIds = {};
    vm.categoriesActiveIds[$rootScope.activeCenter] = {};
    vm.scrollClass = {};
    vm.scrollClass[$rootScope.activeCenter] = {};
    var stringId = '';
    demographicModel = $rootScope.demographicModel[$rootScope.activeCenter];
    treatmentApproachModel = $rootScope.treatmentApproachModel[$rootScope.activeCenter];
    paymentModel = $rootScope.paymentModel[$rootScope.activeCenter];
    additionalServicesModel = $rootScope.additionalServicesModel[$rootScope.activeCenter];
    settingModel = $rootScope.settingModel[$rootScope.activeCenter];
    byDrugModel = $rootScope.byDrugModel[$rootScope.activeCenter];

    vm.scrollClass[$rootScope.activeCenter].demographic = ($rootScope.demographic.length > 8) ? 'scrollable-div' : '';
    vm.scrollClass[$rootScope.activeCenter].treatmentApproach = ($rootScope.treatmentApproach.length > 8) ? 'scrollable-div' : '';
    vm.scrollClass[$rootScope.activeCenter].payment = ($rootScope.payment.length > 8) ? 'scrollable-div' : '';
    vm.scrollClass[$rootScope.activeCenter].setting = ($rootScope.setting.length > 8) ? 'scrollable-div' : '';
    vm.scrollClass[$rootScope.activeCenter].byDrug = ($rootScope.byDrug.length > 8) ? 'scrollable-div' : '';
    vm.scrollClass[$rootScope.activeCenter].additionalServices = ($rootScope.additionalServices.length > 8) ? 'scrollable-div' : '';

    for (key in demographicModel) {
      stringId = demographicModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
    for (key in treatmentApproachModel) {
      stringId = treatmentApproachModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
    for (key in paymentModel) {
      stringId = paymentModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
    for (key in additionalServicesModel) {
      stringId = additionalServicesModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
    for (key in settingModel) {
      stringId = settingModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
    for (key in byDrugModel) {
      stringId = byDrugModel[key].id.toString();
      vm.categoriesActiveIds[$rootScope.activeCenter][stringId] = true;
    }
  };

  // -------- End: 6 Categories model update functions --------------------------------------------//

  vm.citySelCount = 0;
  vm.citySelectFun = function (item) {
    vm.citySelCount++;
    // save to localStorageService
    saveToLocalStorage($rootScope, localStorageService);
    $rootScope.onInit();
  };

  vm.deSelectCityFun = function (item) {
    saveToLocalStorage($rootScope, localStorageService);
    vm.itemDeselectCity(item);
    vm.citySelCount--;
  };
  vm.countySelCount = 0;
  vm.countySelectFun = function () {
    vm.countySelCount++;
    // save to localStorageService
    saveToLocalStorage($rootScope, localStorageService);
    $rootScope.onInit();
  };

  vm.deSelectCountyFun = function (item) {
    saveToLocalStorage($rootScope, localStorageService);
    vm.itemDeselectCounty(item);
    vm.countySelCount--;
  };

  // item deselect events
  vm.itemDeselectState = function (item) {
    vm.deleteItemType = 'state';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    // vm.updateCart();
  };
  vm.itemDeselectCity = function (item) {
    vm.deleteItemType = 'city';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
  };
  vm.itemDeselectCounty = function (item) {
    vm.deleteItemType = 'county';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
  };
  vm.itemDeselectDemographic = function (item) {
    vm.deleteItemType = 'demographic';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };
  vm.itemDeselectTreatment = function (item) {
    vm.deleteItemType = 'treatmentApproach';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };
  vm.itemDeselectPayment = function (item) {
    vm.deleteItemType = 'payment';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };
  vm.itemDeselectAdditional = function (item) {
    vm.deleteItemType = 'additionalServices';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };
  vm.itemDeselectSetting = function (item) {
    vm.deleteItemType = 'setting';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };
  vm.itemDeselectBydrug = function (item) {
    vm.deleteItemType = 'byDrug';
    vm.deleteFromCart(item); // delete item from cart, when deselected any item
    vm.updateCart();
  };

  vm.updateCart = function () {
    if ($rootScope.centerSelected.length === 0) {
      $rootScope.$emit(Status.FAILED, 'Select any treatment center.');
      event.preventDefault();
      return;
    }
    saveToLocalStorage($rootScope, localStorageService);
    $rootScope.onInit();
  };
  vm.updateStateSelect = function (state, stateCheck) {
    // var stateShortName = state.shortname;
    var stateShortName = state.slug ? state.slug : state.shortname;
    var stateLower = stateShortName.toLowerCase();
    for (var key in $rootScope.stateIds) {
      // if ($rootScope.stateIds[key].name === state.shortname) {
      var name = $rootScope.stateIds[key].name.trim();
      state = $rootScope.stateIds[key].state.trim();
      if ($rootScope.stateIds[key].slug === stateLower) {
        var stateSelectedData = {
          'id': $rootScope.stateIds[key].id,
          'shortname': stateShortName.toUpperCase(),
          'state': (state === '') ? name : state
        };
        break;
      }
    }
    var index = 0;
    if (angular.isDefined($rootScope.checkedStateModel[$rootScope.activeCenter])) {
      index = $rootScope.checkedStateModel[$rootScope.activeCenter].indexOf(stateSelectedData.shortname);
    }
    if (stateCheck === true && index === -1) {
      $rootScope.checkedStateModel[$rootScope.activeCenter].push(stateSelectedData.shortname);
      if (angular.isUndefined($rootScope.checkedStateDetail)) {
        $rootScope.checkedStateDetail = {};
      }
      $rootScope.checkedStateDetail[$rootScope.activeCenter].push(stateSelectedData);
    } else if (index >= 0 && stateCheck === false) {
      // trigger delete function for state, if it is in cart
      vm.itemDeselectState(stateSelectedData.id);

      $rootScope.checkedStateModel[$rootScope.activeCenter].splice(index, 1);
      if (angular.isUndefined($rootScope.checkedStateDetail)) {
        $rootScope.checkedStateDetail = {};
      }
      $rootScope.checkedStateDetail[$rootScope.activeCenter].splice(index, 1);
    }
  };
  $rootScope.dropDownClickOnload = function () {
    $timeout(function () {
      dropDownClickOnload($document);
    }, 700);
  };

  vm.deleteFromCart = function (item) {
    if (angular.isUndefined(vm.deleteItemType) || vm.deleteItemType === '' || vm.deleteItemType === null) {
      $log.info('stopped: could not get delete item type.');
      return;
    }
    if (angular.isUndefined(item) || item.id === '' || item.id === null) {
      $log.info('stopped: could not get item id.');
      return;
    }
    var itemInfo = '';
    if (vm.deleteItemType === 'demographic') {
      demographic = $rootScope.otherIds.Demographic;
      for (key in demographic) {
        if (demographic[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': demographic[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'treatmentApproach') {
      treatmentApproach = $rootScope.otherIds['Treatment Approach'];
      for (key in treatmentApproach) {
        if (treatmentApproach[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': treatmentApproach[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'payment') {
      payment = $rootScope.otherIds.Payment;
      for (key in payment) {
        if (payment[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': payment[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'additionalServices') {
      additionalServices = $rootScope.otherIds['Additional Services'];
      for (key in additionalServices) {
        if (additionalServices[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': additionalServices[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'setting') {
      setting = $rootScope.otherIds.Setting;
      for (key in setting) {
        if (setting[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': setting[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'byDrug') {
      byDrug = $rootScope.otherIds['By Drug'];
      for (key in byDrug) {
        if (byDrug[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': byDrug[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'state') {
      var state = $rootScope.stateIds;
      for (key in state) {
        if (state[key].id === item) {
          itemInfo = {
            'id': item,
            'name': state[key].name
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'city') {
      var city = $rootScope.city;
      for (key in city) {
        if (city[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': city[key].label
          };
          break;
        }
      }
    } else if (vm.deleteItemType === 'county') {
      var county = $rootScope.county;
      for (key in county) {
        if (county[key].id === item.id) {
          itemInfo = {
            'id': item.id,
            'name': county[key].label
          };
          break;
        }
      }
    }

    var actualDelItemInfo = '';
    // get cart data
    centerService.getCartDetails().then(function (result) {
      vm.cartDetails = result.cart_subscription.items;
      for (var key in vm.cartDetails) {
        var sponsoredLayouts = vm.cartDetails[key].sponsored_layouts;
        if (vm.deleteItemType === 'state') {
          var cartState = sponsoredLayouts.state;
          for (var sts in cartState) {
            if (cartState[sts].name === itemInfo.name) {
              actualDelItemInfo = {
                'id': cartState[sts].id,
                'name': cartState[sts].name
              };
              break;
            }
          }
        }
        if (vm.deleteItemType === 'city') {
          var cartCity = sponsoredLayouts.city;
          for (var cty in cartCity) {
            if (cartCity[cty].name === itemInfo.name) {
              actualDelItemInfo = {
                'id': cartCity[cty].id,
                'name': cartCity[cty].name
              };
              break;
            }
          }
        }
        if (vm.deleteItemType === 'county') {
          var cartCounty = sponsoredLayouts.county;
          for (var cnt in cartCounty) {
            if (cartCounty[cnt].name === itemInfo.name) {
              actualDelItemInfo = {
                'id': cartCounty[cnt].id,
                'name': cartCounty[cnt].name
              };
              break;
            }
          }
        }
        if (vm.deleteItemType.indexOf(['treatmentApproach', 'demographic', 'payment', 'additionalServices', 'setting', 'byDrug'])) {
          var cartCatg = sponsoredLayouts.categories;
          for (var catg in cartCatg) {
            if (cartCatg[catg].name === itemInfo.name) {
              actualDelItemInfo = {
                'id': cartCatg[catg].id,
                'name': cartCatg[catg].name
              };
              break;
            }
          }
        }

        if (actualDelItemInfo !== '') {
          break;
        }
      }
      if (actualDelItemInfo !== '') {
        $log.info('actual item id: ' + actualDelItemInfo.id);
        // delete sponsored ads using itemId
        centerService.deleteSponsorAds(actualDelItemInfo.id, $rootScope.activeCenter).then(function (result) {
          $rootScope.$emit(Status.SUCCEEDED, 'Item Removed: ' + actualDelItemInfo.name);

          centerService.getCartDetails().then(function (result) {
            itemData = result.cart_subscription.items[vm.cartMode.index];
            // updating current selected cart data (ref: productDetails ctrl > vm.editCenter )
            var cartMode = {
              'mode': 'edit',
              'item': 'sponsored_layouts',
              'data': itemData,
              'index': vm.cartMode.index
            };
            localStorageService.set('cartMode', cartMode);
            // refresh cart item count
            $rootScope.calculateItems(result.cart_subscription.items);
          }).catch(function (err) {
            $log.info(err);
          });
        }).catch(function (err) {
          $log.info(err);
        });
      }
    }).catch(function (err) {
      $log.info(err);
    });
  };
  vm.multiselectModelSettingsCity = {
    //  scrollableHeight: scrollableHeightCity,
    //  width: '350px',
    scrollableHeight: '350px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    //  enableSearch: true,
    required: true,
    keyboardControls: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'City';
    }
  };
  vm.multiselectModelSettingsCounty = {
    //  scrollableHeight: scrollableHeightCounty,
    scrollableHeight: '350px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    // enableSearch: true,
    required: true,
    keyboardControls: true,
    smartButtonMaxItems: 1,
    smartButtonTextConverter: function () {
      return 'County';
    }
  };
  vm.showCityCountySelected = 0;
  $rootScope.selectedMapStates = [];
  vm.stateCheckboxClick = function (state, selectOnly, mapClicked, deselectAll) {
    vm.showCityCountySelected = 0;
    // selectonly ===true: clicking from map/external links
    // selectonly ===false : clicking from checkboxes
    // deselectAll === true: for true means deselect all function running
    vm.displayCitySelect = 0;
    vm.displayCountySelect = 0;
    var shortname = state.shortname ? state.shortname : state.slug;
    shortname = shortname.toUpperCase(); // added newly to fix link selection problem
    vm.stateCurrentSelection = shortname;
    vm.stateCurrentSelectionName = state.state ? state.state : state.fullname;
    vm.stateInfo = state;

    if (angular.isUndefined(vm.prevSelStyle)) {
      vm.prevSelStyle = {};
    }
    if (angular.isUndefined(vm.stateSelectCheck)) {
      vm.stateSelectCheck = {};
    }
    if (selectOnly === true) {
      // vm.prevSelStyle = {};
      vm.curSelStyle = {};
      vm.curSelStyle[shortname] = 'color:#015b8e;text-decoration:underline;';
      // select checkbox too if already not check for new
      if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === false) {
        vm.stateSelectCheck[shortname] = true;
        vm.prevSelStyle[shortname] = 'color:#8f8686;';
        vm.setMapColor(shortname, '#8f8686', 'set');
        vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
        saveToLocalStorage($rootScope, localStorageService);
        //  $rootScope.onInit();
      } else if (angular.isUndefined(vm.stateSelectCheck[shortname])) {
        vm.stateSelectCheck[shortname] = true;
        vm.prevSelStyle[shortname] = 'color:#8f8686;';
        vm.setMapColor(shortname, '#8f8686', 'set', mapClicked);
        vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
        saveToLocalStorage($rootScope, localStorageService);
      } else if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === true && deselectAll !== true) {
        vm.setMapColor(shortname, '#8f8686', 'set', mapClicked); // for selecting map
        // below lines are not using bcz to prevent deselect on external link / map (disabled deselect functions of external link click)
        // vm.stateSelectCheck[shortname] = false;
        // vm.prevSelStyle[shortname] = '';
        // vm.setMapColor(shortname, '#ebeced', 'unset', mapClicked);
        // vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
        // saveToLocalStorage($rootScope, localStorageService);
      } else if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === true && deselectAll === true) {
        vm.stateSelectCheck[shortname] = false;
        vm.prevSelStyle[shortname] = '';
        vm.setMapColor(shortname, '#ebeced', 'unset', mapClicked);
        vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
        saveToLocalStorage($rootScope, localStorageService);
      }
      $rootScope.selectedMapStates = vm.stateSelectCheck;
      // vm.loadCityCounty(state, 1);
      if (deselectAll !== false && deselectAll !== true) {
        vm.loadCityCounty(state, 0); // load city county on state select
      }
    } else if (selectOnly === false && angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === false) {
      vm.curSelStyle = {};
      vm.curSelStyle[shortname] = 'color:#015b8e;text-decoration:underline;';
      vm.prevSelStyle[shortname] = '';
      vm.setMapColor(shortname, '#ebeced', 'unset', mapClicked);
      vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
      saveToLocalStorage($rootScope, localStorageService);
    } else if (selectOnly === false && angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === true) {
      vm.curSelStyle = {};
      vm.curSelStyle[shortname] = 'color:#015b8e;text-decoration:underline;';
      //  vm.stateSelectCheck[shortname] = true;
      vm.prevSelStyle[shortname] = 'color:#8f8686;';
      vm.setMapColor(shortname, '#8f8686', 'set');
      vm.updateStateSelect(state, vm.stateSelectCheck[shortname]);
      saveToLocalStorage($rootScope, localStorageService);
    }
    $rootScope.onInit();
    // if (angular.isUndefined(vm.stateSelectCheck)) {
    //   vm.stateSelectCheck = {};
    //   vm.stateSelectCheck[state.slug] = true;
    //   $log.info('initialized stateSelectCheck');
    // } else if (vm.stateSelectCheck[state.slug] === true) {
    //   //  vm.stateSelectCheck[state.slug] = false;
    //   vm.prevSelStyle[shortname] = 'color:#8f8686';
    //   vm.curSelStyle[shortname] = 'color:#015b8e;text-decoration:underline;';
    // } else if (vm.stateSelectCheck[state.slug] === false) {
    //   //  vm.stateSelectCheck[state.slug] = true;
    //   vm.prevSelStyle[shortname] = '';
    //   vm.curSelStyle[shortname] = '';
    // } else {
    //   //  vm.stateSelectCheck[state.slug] = true;
    // }
    //
    // //  $log.info('stateselectcheck: ' + vm.stateSelectCheck[state.slug]);
    // vm.updateStateSelect(state, vm.stateSelectCheck[state.slug]);
    // // save to localStorageService
    // saveToLocalStorage($rootScope, localStorageService);
    // $rootScope.onInit();
  };

  vm.setMapColor = function (shortname, fill, set_unset, mapClicked) {
    if (mapClicked === true) {
      $log.info('Clicked from map');
      return;
    }

    dynEl = $document.find("[shortname='" + shortname + "']");
    //  $log.info(dynEl);
    if (set_unset === 'set') {
      dynEl.attr('fill', fill);
    } else if (set_unset === 'unset') {
      dynEl.attr('fill', fill);
    }
    var stateMap = {
      'stateSelected': vm.stateSelectCheck,
      'curSelected': shortname,
      'status': set_unset
    };
    vm.prevSelectedState = shortname;
    $rootScope.$emit('stateSelectedData', stateMap);
  };

  vm.loadMapSelection = function () {
    var stateMap = {
      'stateSelected': vm.stateSelectCheck
    };
    $log.info('load map run');
    $rootScope.$emit('loadMapSelection', stateMap);
  };

  vm.loadCityCounty = function (state, mapOnly) {
    state.fullname = state.state ? state.state : state.fullname;
    state.shortname = state.slug ? state.slug : state.shortname;
    state.slug = state.slug ? state.slug : state.shortname;
    state.image = state.image ? state.image : (state.fullname.toLowerCase()).replace(' ', '');
    vm.stateImage = state.image ? state.image : (state.fullname.toLowerCase()).replace(' ', '');
    if (mapOnly !== 1) {
      getCountyCity(vm, state, '', service, $injector, $rootScope, localStorageService, Status);
    }
  };

  vm.showCityCountyDropdown = function (show) {
    if (show === 'city') {
      vm.displayCitySelect = 1;
      vm.displayCountySelect = 0;
    } else {
      vm.displayCountySelect = 1;
      vm.displayCitySelect = 0;
    }
    // vm.loadCityCounty(vm.stateInfo);
  };

  vm.closeCityCounty = function () {
    vm.displayCitySelect = 0;
    vm.displayCountySelect = 0;
  };

  // called upper side - on load preselect states
  vm.stateCheckCtrl = function () {
    vm.stateCheckCtrlRun = 1;
    // check cart edit mode
    vm.cartEditMode();
    //  $log.info($rootScope.checkedStateModel);
    if (angular.isUndefined(vm.stateSelectCheck)) {
      vm.stateSelectCheck = {};
      vm.prevSelStyle = {};
    }
    if (angular.isDefined($rootScope.checkedStateModel)) {
      var checkedState = $rootScope.checkedStateModel[$rootScope.activeCenter];
      for (key in checkedState) {
        // $log.info(checkedState[key]);
        vm.stateSelectCheck[checkedState[key]] = true;
        vm.prevSelStyle[checkedState[key]] = 'color:#8f8686;';
      }
      vm.loadMapSelection();
    }
  };

  vm.cartEditMode = function () {
    // ---------- if cart edit mode ----------------//
    cartMode = localStorageService.get('cartMode');
    //  $log.info(cartMode);
    if (angular.isDefined(cartMode) && cartMode !== null) {
      $log.info('In cart edit mode');
      if (cartMode.mode === 'edit' && cartMode.item === 'sponsored_layouts') {
        // localStorageService.remove('cartMode');
        // vm.updateCart();
        // saveToLocalStorage($rootScope, localStorageService);
        // $rootScope.onInit();
        actCen = cartMode.data.id;
        var cits = [];
        var counts = [];
        var stats = [];
        for (var key in cartMode.data.sponsored_layouts.city) {
          //  $rootScope.treatmentApproachModel[actCen].push();
          cits.push(cartMode.data.sponsored_layouts.city[key].name);
        }
        for (var key in cartMode.data.sponsored_layouts.county) {
          //  $rootScope.treatmentApproachModel[actCen].push();
          counts.push(cartMode.data.sponsored_layouts.county[key].name);
        }
        for (var key in cartMode.data.sponsored_layouts.state) {
          //  $rootScope.treatmentApproachModel[actCen].push();
          stats.push(cartMode.data.sponsored_layouts.state[key].id);
        }

        if (angular.isUndefined($rootScope.checkedStateDetail)) {
          $rootScope.checkedStateDetail = {};
        }

        // clearing any previous stored data before edit
        $rootScope.cityModel = {};
        $rootScope.cityModel[actCen] = [];
        $rootScope.countyModel = {};
        $rootScope.countyModel[actCen] = [];

        $rootScope.checkedStateModel = {};
        $rootScope.checkedStateModel[actCen] = [];
        $rootScope.checkedStateDetail = {};
        $rootScope.checkedStateDetail[actCen] = [];
        // $log.info($rootScope.stateIds);
        for (key in $rootScope.stateIds) {
          if (stats.indexOf($rootScope.stateIds[key].id) >= 0) {
            //  $log.info($rootScope.stateIds[key].name);
            stateSelectedData = {
              'id': $rootScope.stateIds[key].id,
              'shortname': ($rootScope.stateIds[key].slug).toUpperCase(),
              'state': $rootScope.stateIds[key].name
            };
            $rootScope.checkedStateModel[actCen].push(($rootScope.stateIds[key].slug).toUpperCase());
            $rootScope.checkedStateDetail[actCen].push(stateSelectedData);
          }
        }
        $log.info($rootScope.checkedStateModel);
        saveToLocalStorage($rootScope, localStorageService);
        $rootScope.onInit();
      }
    }
  };

  vm.selectAllState = function (selectall, key) {
    if (key >= $rootScope.stateIds.length) {
      return;
    }

    if (selectall) {
      //  for (key in $rootScope.stateIds) {
      //  $log.info($rootScope.stateIds[key].name);
      shortname = ($rootScope.stateIds[key].slug).toUpperCase();
      if (shortname === '') {
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
        //  continue;
      }
      stateSelectedData = {
        'id': $rootScope.stateIds[key].id,
        'shortname': ($rootScope.stateIds[key].slug).toUpperCase(),
        'state': $rootScope.stateIds[key].state,
        'name': $rootScope.stateIds[key].name
      };

      if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === false) {
        vm.stateCheckboxClick(stateSelectedData, true, false, false); // 4th parameter tells deselect all = false (means select all = true) (used to prevent loading city county during all state selection)
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
        // vm.stateSelectCheck[shortname] = true;
        // vm.prevSelStyle[shortname]  = 'color:#8f8686;';
        // vm.setMapColor(shortname, '#8f8686', 'set');
        // vm.updateStateSelect(stateSelectedData, vm.stateSelectCheck[shortname]);
      } else if (angular.isUndefined(vm.stateSelectCheck[shortname])) {
        vm.stateCheckboxClick(stateSelectedData, true, false, false);
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
      } else if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === true) {
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
      }
      //  continue;
      // $rootScope.checkedStateModel[$rootScope.activeCenter].push($rootScope.stateIds[key].name);
      // $rootScope.checkedStateDetail[$rootScope.activeCenter].push(stateSelectedData);
      // vm.updateStateSelect(stateSelectedData, true);
      // } forlop end
      // vm.curSelStyle = {};
      // vm.curSelStyle[shortname] = 'color:#015b8e;text-decoration:underline;';
      // saveToLocalStorage($rootScope, localStorageService);
      // return;
      // if (angular.isUndefined(vm.stateSelectCheck)) {
      //   vm.stateSelectCheck  = {};
      // }
      // if (angular.isDefined($rootScope.checkedStateModel)) {
      //   var checkedState = $rootScope.checkedStateModel[$rootScope.activeCenter];
      //   for (key in checkedState) {
      //     vm.stateSelectCheck[checkedState[key]] = true;
      //   }
      // }
      // // save to localStorageService
      // saveToLocalStorage($rootScope, localStorageService);
      // $rootScope.onInit();
      // vm.stateCheckCtrl(); // pre select all
    } else {
      $log.info('unselecting all....');
      //  for (key in $rootScope.stateIds) {
      //  $log.info($rootScope.stateIds[key].name);
      shortname = ($rootScope.stateIds[key].slug).toUpperCase();
      if (shortname === '') {
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
        // continue;
      }
      stateSelectedData = {
        'id': $rootScope.stateIds[key].id,
        'shortname': ($rootScope.stateIds[key].slug).toUpperCase(),
        'state': $rootScope.stateIds[key].state,
        'name': $rootScope.stateIds[key].name
      };

      if (angular.isDefined(vm.stateSelectCheck[shortname]) && vm.stateSelectCheck[shortname] === true) {
        vm.stateCheckboxClick(stateSelectedData, true, false, true);
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
        // vm.stateSelectCheck[shortname] = false;
        // vm.prevSelStyle[shortname]  = '';
        // vm.setMapColor(shortname, '#ebeced', 'unset', false);
        // vm.updateStateSelect(stateSelectedData, vm.stateSelectCheck[shortname]);
      } else {
        $timeout(function () {
          vm.selectAllState(selectall, (key + 1));
        }, 50);
      }

      //  continue;
      // $rootScope.checkedStateModel[$rootScope.activeCenter].push($rootScope.stateIds[key].name);
      // $rootScope.checkedStateDetail[$rootScope.activeCenter].push(stateSelectedData);
      // vm.updateStateSelect(stateSelectedData, true);
      //    } foloop
    }
  };

  vm.gotoCart = function () {
    // $state.go(UIState.SIGN_UP.DETAILS);
    $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
  };
}

function getCountyCity(vm, state, stateMap, service, $injector, $rootScope, localStorageService, Status) {
  //  $rootScope.$emit(Status.PROCESSING, 'Loading...');
  $rootScope.city = [];
  $rootScope.county = [];
  vm.showCityCountySelected = 1;
  service.getCityCountyByStateV2(state.shortname).then(function (response) {
    $rootScope.$emit(Status.HIDE_PROCESSING, '');
    var i = 0;
    var modifiedCitySelect = [];
    var modifiedCountySelect = [];
    for (var key in response.city) {
      modifiedCitySelect[i] = {
        id: response.city[key].id,
        label: response.city[key].name
      };
      var cityLength = response.city.length;
      i++;
    }
    var totalCityHeight = 20 * cityLength + 100;
    if (totalCityHeight > 700) {
      totalCityHeight = 550;
    }
    for (key in response.county) {
      modifiedCountySelect[i] = {
        id: response.county[key].id,
        label: response.county[key].name
      };
      var countyLength = response.county.length;
      i++;
    }
    var totalCountyHeight = 20 * countyLength + 110;
    if (totalCountyHeight > 700) {
      totalCountyHeight = 550;
    }
    if (countyLength > 14) {
      var widthCounty = 'two_columns county_negative_two';
      var scrollableHeightCounty = 'auto';
    }
    if (countyLength > 42) {
      widthCounty = 'three_columns';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 56) {
      widthCounty = 'four_columns county_negative_four';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 70) {
      widthCounty = 'five_columns county_negative';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 84) {
      widthCounty = 'six_columns county_negative_six';
      scrollableHeightCounty = 'auto';
    }
    if (countyLength > 100) {
      widthCounty = 'seven_columns';
      scrollableHeightCounty = totalCountyHeight + 'px';
    }
    if (cityLength > 14) {
      var widthCity = 'two_columns negative_margin';
      var scrollableHeightCity = 'auto';
    }
    if (cityLength > 42) {
      widthCity = 'three_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 56) {
      widthCity = 'four_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 70) {
      widthCity = 'five_columns negative_margin';
      scrollableHeightCity = 'auto';
    }
    if (cityLength > 84) {
      widthCity = 'six_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    if (cityLength > 88) {
      widthCity = 'six_and_last_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    if (cityLength > 100) {
      widthCity = 'seven_columns negative_margin';
      scrollableHeightCity = totalCityHeight + 'px';
    }
    $rootScope.multiselectModelSettingsCounty = {
      scrollableHeight: scrollableHeightCounty,
      // scrollableHeight: 'auto',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: true,
      showUncheckAll: true,
      // enableSearch: true,
      required: true,
      keyboardControls: true,
      smartButtonMaxItems: 1,
      smartButtonTextConverter: function () {
        return 'County';
      }
    };
    $rootScope.multiselectModelSettingsCity = {
      scrollableHeight: scrollableHeightCity,
      // scrollableHeight: 'auto',
      scrollable: true,
      checkBoxes: true,
      showCheckAll: true,
      showUncheckAll: true,
      // enableSearch: true,
      required: true,
      keyboardControls: true,
      smartButtonMaxItems: 1,
      smartButtonTextConverter: function () {
        return 'City';
      }
    };
    $rootScope.width = 'three_columns';
    $rootScope.city = modifiedCitySelect;
    $rootScope.county = modifiedCountySelect;

    cartMode = localStorageService.get('cartMode');
    if (angular.isDefined(cartMode) && cartMode !== null) {
      if (cartMode.mode === 'edit' && cartMode.item === 'sponsored_layouts') {
        // localStorageService.remove('cartMode');
        // vm.updateCart();
        // saveToLocalStorage($rootScope, localStorageService);
        // $rootScope.onInit();
        actCen = cartMode.data.id;
        var cits = [];
        var counts = [];
        for (var key in cartMode.data.sponsored_layouts.city) {
          //  $rootScope.treatmentApproachModel[actCen].push();
          cits.push(cartMode.data.sponsored_layouts.city[key].name);
        }
        for (var key in cartMode.data.sponsored_layouts.county) {
          //  $rootScope.treatmentApproachModel[actCen].push();
          counts.push(cartMode.data.sponsored_layouts.county[key].name);
        }

        // $rootScope.cityModel = {};
        // $rootScope.cityModel[actCen] = [];
        // $rootScope.countyModel = {};
        // $rootScope.countyModel[actCen] = [];

        for (key in modifiedCitySelect) {
          if (cits.indexOf(modifiedCitySelect[key].label) >= 0) {
            // testing if already there
            var matched = 0;
            for (key1 in $rootScope.cityModel[actCen]) {
              if ($rootScope.cityModel[actCen][key1].id === modifiedCitySelect[key].id) {
                matched = 1;
                break;
              }
            }
            if (matched === 0) {
              $rootScope.cityModel[actCen].push({
                'id': modifiedCitySelect[key].id,
                'label': modifiedCitySelect[key].label
              });
            }
          }
        }

        for (key in modifiedCountySelect) {
          if (counts.indexOf(modifiedCountySelect[key].label) >= 0) {
            // testing if already there
            matched = 0;
            for (key1 in $rootScope.countyModel[actCen]) {
              if ($rootScope.countyModel[actCen][key1].id === modifiedCountySelect[key].id) {
                matched = 1;
                break;
              }
            }

            if (matched === 0) {
              $rootScope.countyModel[actCen].push({
                'id': modifiedCountySelect[key].id,
                'label': modifiedCountySelect[key].label
              });
            }
          }
        }
        // saving
        saveToLocalStorage($rootScope, localStorageService);
      }
    }
  });
}

function dropDownClickOnload($document) {
  angular.element(function () {
    var demographic = angular.element($document[0].querySelector('#demographic .dropdown-toggle'));
    var treatment = angular.element($document[0].querySelector('#treatmentApproach .dropdown-toggle'));
    var setting = angular.element($document[0].querySelector('#setting .dropdown-toggle'));
    var additionalServices = angular.element($document[0].querySelector('#additionalServices .dropdown-toggle'));
    var payment = angular.element($document[0].querySelector('#payment .dropdown-toggle'));
    var byDrug = angular.element($document[0].querySelector('#byDrug .dropdown-toggle'));
    var selectCounty = angular.element($document[0].querySelector('#selectCounties .dropdown-toggle'));
    var selectCities = angular.element($document[0].querySelector('#selectCities .dropdown-toggle'));

    // var statesSelect = angular.element($document[0].querySelector('#statesSelect .dropdown-toggle'));

    if (angular.isDefined(demographic[0])) {
      // elem[0].disabled = true;
      // elem[0].clicked = true;
      demographic[0].click();
    }
    if (angular.isDefined(treatment[0])) {
      treatment[0].click();
    }
    if (angular.isDefined(setting[0])) {
      setting[0].click();
    }
    if (angular.isDefined(additionalServices[0])) {
      additionalServices[0].click();
    }
    if (angular.isDefined(payment[0])) {
      payment[0].click();
    }
    if (angular.isDefined(byDrug[0])) {
      byDrug[0].click();
    }
    if (angular.isDefined(selectCounty[0])) {
      selectCounty[0].click();
    }
    if (angular.isDefined(selectCities[0])) {
      selectCities[0].click();
    }
  });
}

// saving to localStorageService
function saveToLocalStorage($rootScope, localStorageService) {
  var sponsor = {
    'cityModel': $rootScope.cityModel,
    'countyModel': $rootScope.countyModel,
    // 'deletedStates': $rootScope.deletedStates,
    'stateSel': $rootScope.statesSel,
    // 'statesDetail': $rootScope.statesDetail,
    'treatmentCenter': $rootScope.treatmentCentersModel,
    'demographic': $rootScope.demographicModel,
    'treatmentApproach': $rootScope.treatmentApproachModel,
    'setting': $rootScope.settingModel,
    'additionalServices': $rootScope.additionalServicesModel,
    'payment': $rootScope.paymentModel,
    'byDrug': $rootScope.byDrugModel,
    'centersValue': $rootScope.treatmentCentersValue,
    'checkedAllStates': $rootScope.checkedAllStates,
    'checkedStateModel': $rootScope.checkedStateModel,
    'checkedStateDetail': $rootScope.checkedStateDetail
  };
  if (localStorageService.isSupported) {
    localStorageService.set('signupSponsoredPage', sponsor, 'sessionStorage');
  }
}

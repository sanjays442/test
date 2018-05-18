module.exports = ['$document', '$injector', '$scope', '$log', '$rootScope', '$state', 'Status', 'UIState', 'SignUpService', 'localStorageService', '$timeout', ctrl];

function ctrl($document, $injector, $scope, $log, $rootScope, $state, Status, UIState, service, localStorageService, $timeout) {
  var vm = this;
  var lm = $rootScope;
  var token = localStorageService.get('signupToken');
  // Get localstored data of this step
  var signupData = localStorageService.get('signupStepsData');

  var initStartupVars = function () {
    vm.centerFormInit = {};
    vm.centerFormInit.categories = 1;
    vm.centerFormInit.centerName = 1;
    vm.centerFormInit.website = 1;
    vm.centerFormInit.email = 1;
    vm.centerFormInit.phone = 1;
    vm.centerFormInit.address = 1;
    vm.displayMsg = 'Please enter the details';
    localStorageService.remove('edit_bannerads');
    vm.skipShowToOptional = 0;
  };
  initStartupVars();

  vm.resetNextStepVars = function () {
    localStorageService.remove('signupSponsoredPage'); // it will remove previous values from sponsored page test centers to prevent errors for multiple center
    localStorageService.remove('bannerAdded', 'sponsorAdded', 'cartMode'); // remove previous status
  };

  // for extra placeholder
  // vm.websitePlaceholder = 0;
  vm.extraPlaceholder = function (id) {
    if (id === 'website') {
      var web = $document.find('[name="' + id + '"]');
      if (web.val() !== '') {
        vm.websitePlaceholder = 1;
      } else {
        vm.websitePlaceholder = 0;
      }
    } else if (id === 'email') {
      var eml = $document.find('[name="' + id + '"]');
      if (eml.val() !== '') {
        vm.emailPlaceholder = 1;
      } else {
        vm.emailPlaceholder = 0;
      }
    } else if (id === 'phone') {
      var phn = $document.find('[name="' + id + '"]');
      if (phn.val() !== '') {
        vm.phonePlaceholder = 1;
      } else {
        vm.phonePlaceholder = 0;
      }
    }
  };

  // set progressbar progress values
  vm.setProgressValues = function (startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      runProgress(startVal, endVal);
    }, 800);
  };

  function runProgress(startVal, endVal) {
    vm.progressValue = startVal;
    $timeout(function () {
      if (startVal < endVal) {
        runProgress((startVal + 1), endVal);
      }
    }, 80);
  }
  vm.setProgressValues(15, 35);
  // END: progress values

  vm.multiselectModelSettings = {
    scrollableHeight: '160px',
    scrollable: true,
    checkBoxes: true,
    showCheckAll: false,
    showUncheckAll: false,
    smartButtonMaxItems: 1,
    // smartButtonTextConverter: function () {
    //   return 'Category';
    // },
    required: true
  };
  vm.categorySelectText = {
    buttonDefaultText: 'Select Category'
  };
  vm.tagsSelectText = {
    buttonDefaultText: 'Tags'
  };

  vm.centerCategories = [];
  vm.categoryModel = [];
  vm.catgsToggleFun = function () {
    // temporary off this function by return
    return;
    if (vm.catgsToggle === 1) {
      vm.catgsToggle = 0;
    } else {
      vm.catgsToggle = 1;
    }
  };
  vm.checkedstring = [];
  vm.toggleChecked = function (id, tf, labelClick) {
    if (tf === true) {
      vm.checkedstring[id] = 'checked';
    } else {
      vm.checkedstring[id] = '';
    }
    if (labelClick === 'label_click' && tf !== true) {
      vm.tagCheckboxModel[id] = true;
      vm.checkedstring[id] = 'checked';
    } else if (labelClick === 'label_click' && tf === true) {
      vm.tagCheckboxModel[id] = false;
      vm.checkedstring[id] = '';
    }
  };

  // select all sub tags category options
  vm.selectSubtagAllOption = function (tagId, options, tf) {
    for (var key in options) {
      if (tf && vm.tagCheckboxModel[options[key].id] !== true) {
        vm.toggleChecked(options[key].id, false, 'label_click');
      } else if (tf === false && vm.tagCheckboxModel[options[key].id] === true) {
        vm.toggleChecked(options[key].id, true, 'label_click');
      }
    }

  };

  vm.catgcheckedstring = [];
  vm.catgcheckedstring[1] = '';
  vm.catgcheckedstring[2] = '';
  vm.catgcheckedstring[3] = '';
  vm.catgcheckedstring[4] = '';
  vm.catgChecked = function (id, tf, labelClick) {
    if (tf === true) {
      vm.catgcheckedstring[id] = 'checked';
    } else {
      vm.catgcheckedstring[id] = '';
    }
    if (labelClick === 'label_click' && tf !== true) {
      vm.categoryModel[id] = true;
      vm.catgcheckedstring[id] = 'checked';
    } else if (labelClick === 'label_click' && tf === true) {
      vm.categoryModel[id] = false;
      vm.catgcheckedstring[id] = '';
    }
  };

  vm.tagsData = [];
  vm.tagCheckboxModel = [];
  vm.tagsToggleFun = function () {
    if (vm.tagsToggle === 1) {
      vm.tagsToggle = 0;
    } else {
      vm.tagsToggle = 1;
    }
  };
  vm.tagToggleDynamic = function (tagsId) {
    if (vm.tagToggle[tagsId]) {
      vm.tagToggle[tagsId] = 0;
      vm.tagToggleIconClass[tagsId] = 'fa-plus-square-o';
    } else {
      vm.tagToggle[tagsId] = 1;
      vm.tagToggleIconClass[tagsId] = 'fa-minus-square-o';
      // vm.activeTagid = tagsId;
      vm.closeOtherTags(tagsId);
    }
  };
  vm.closeOtherTags = function (curId) {
    for (var tg in vm.tagsData.tags) {
      var tagsId = vm.tagsData.tags[tg].id;
      if (vm.tagToggle[tagsId] === 1 && tagsId !== curId) {
        vm.tagToggleDynamic(tagsId);
      }
    }
  };

  // get categories
  service.getCategories(token).then(function (result) {
    for (var key in result.categories) {
      var category = {
        'label': result.categories[key].name,
        'id': result.categories[key].id
      };
      vm.centerCategories.push(category);
    }
    vm.restoreValues();
  }).catch(function (err) {
    $log.info(err);
  });

  // get tags selection
  service.getTagsSelection(token).then(function (result) {
    vm.tagsData = result;
  }).catch(function (err) {
    $log.info(err);
  });

  vm.restoreValues = function () {
    if (angular.isDefined(signupData.signupStep.testCenter) && angular.isDefined(signupData.signupStep.testCenter.center_name)) {
      var testCenter = signupData.signupStep.testCenter;
      //  $log.info(signupData.signupStep.testCenter);
      vm.centerName = testCenter.center_name;
      var catg = testCenter.category_id;
      catg = catg.split(',');
      for (var key in catg) {
        var catgId = catg[key];
        vm.categoryModel[catgId] = true;
        vm.catgcheckedstring[catgId] = 'checked';
      }
      vm.website = testCenter.center_web_link;
      vm.email = testCenter.email;
      vm.phone = testCenter.phone;
      vm.address = testCenter.address_line_1;
      var tagsId = testCenter.tag_id;
      tagsId = tagsId.split(',');
      for (key in tagsId) {
        vm.tagCheckboxModel[tagsId[key]] = true;
        vm.checkedstring[tagsId[key]] = 'checked';
      }
      // check all retrieve
      if (testCenter.tagIdMain !== '') {
        if (angular.isUndefined(vm.checkAllTagOption)) {
          vm.checkAllTagOption = {};
        }
        var mainTags = testCenter.tagIdMain;
        mainTags = mainTags.split(',');
        for (key in mainTags) {
          vm.checkAllTagOption[mainTags[key]] = true;
        }
      }

    } else {
      // $log.info('notdef');
    }
    // if membership step is already done once then skip button will show
    if (angular.isDefined(localStorageService.get('membership')) && localStorageService.get('membership') !== null) {
      vm.skipShow = 1;
    }
  };

  vm.onCategorySelect = function () {
    vm.centerFormInit.categories = 0;
  };
  vm.onCategoryDeSelect = function () {
    vm.centerFormInit.categories = 0;
  };

  function shakeme() {
    angular.element('.progress-img-wrap').addClass('shake');
    $timeout(function () {
      angular.element('.shake').removeClass('shake');
    }, 500);
  }

  // EDIT: check center added but not completed or to add new center
  vm.editCenter = function(id, centerData){
    lm.$emit(Status.PROCESSING, '');
    vm.processing = 1;
    var formData = new FormData();
    for (key in centerData) {
      formData.append('treatment_center[' + key + ']', centerData[key]);
    }

    service.editCenter(id, formData, token).then(function (result) {
      $log.info(result);
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // saving steps data //
      //check all data
      var tagIdMain = '';
      for (var tagId in vm.checkAllTagOption) {
        if (vm.checkAllTagOption[tagId]) {
          tagIdMain += tagId + ',';
        }
      }
      tagIdMain = tagIdMain.slice(',' - 1);
      centerData.tagIdMain = tagIdMain;
      signupData.signupStep.testCenter = centerData;
      // setting final data
      localStorageService.set('signupStepsData', signupData, 'sessionStorage');
      localStorageService.set('signupCenterId', id);
      $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
    }).catch(function (err) {
      $log.info(err);
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      vm.displayMsg = 'Something went wrong';
    });
  };

  // delaying because if tags are open other fields are hidden then it will not capture data from that
  vm.addCenterBefore = function () {
    vm.tagsToggle = 1;
    $timeout(function () {
      vm.addCenter();
    }, 500);
  };
  vm.addCenter = function () {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var catId = '';
    for (var key in vm.categoryModel) {
      if (vm.categoryModel[key]) {
        catId += key + ',';
      }
    }
    catId = catId.slice(',', -1);

    if (vm.centerForm.centerName.$error.required) {
      // lm.$emit(Status.FAILED, 'Please enter Center name');
      shakeme();
      vm.displayMsg = 'Please enter center name';
      return;
    } else if (vm.categoryModel.length === 0) {
      shakeme();
      vm.displayMsg = 'Click arrow to select categories';
      return;
    } else if (vm.centerForm.website.$error.required) {
      shakeme();
      vm.displayMsg = 'Please enter website';
      return;
    } else if (vm.centerForm.website.$error.pattern) {
      shakeme();
      vm.displayMsg = 'Invalid website';
      return;
    } else if (vm.centerForm.email.$error.required) {
      shakeme();
      vm.displayMsg = 'Please enter Email address';
      return;
    } else if (vm.centerForm.email.$error.pattern) {
      shakeme();
      vm.displayMsg = 'Invalid email';
      return;
    } else if (vm.centerForm.phone.$invalid) {
      shakeme();
      vm.displayMsg = 'Invalid phone';
      return;
    } else if (vm.centerForm.address.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter Address';
      return;
    }
    var tagIds = '';
    if (angular.isDefined(vm.tagCheckboxModel) && vm.tagCheckboxModel.length > 0) {
      for (key in vm.tagCheckboxModel) {
        if (vm.tagCheckboxModel[key]) {
          tagIds += key + ',';
        }
        // $log.info('key: ' + key + ' value: ' + vm.tagCheckboxModel[key]);
      }
    }
    tagIds = tagIds.slice(0, -1);

    var formData = new FormData();
    var centerData = {
      'center_name': vm.centerName,
      'category_id': catId,
      'center_web_link': vm.website,
      'email': vm.email,
      'phone': vm.phone,
      'tag_id': tagIds,
      'address_line_1': vm.address
    };

    // test if stored data is same as current data then move forward without adding centers
    if (angular.isDefined(signupData.signupStep.testCenter)) {
      var tstCen = signupData.signupStep.testCenter;
      var sameData = 0;
      for (key in tstCen) {
        sameData = 1;
        if (key === 'tagIdMain') {
          continue;
        }
        if (tstCen[key] !== centerData[key]) {
          sameData = 0;
          break;
        }
      }
      if (sameData) {
        $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
        return;
      }
      vm.skipShowToOptional = 1;
    }

    for (key in centerData) {
      formData.append('treatment_center[' + key + ']', centerData[key]);
    }

    // testing if last added center is eligible for edit mode
    var lastAddedCenter = localStorageService.get('lastAddedCenter');
    if(angular.isDefined(lastAddedCenter) && lastAddedCenter!==null && lastAddedCenter.editMode === true){
      vm.editCenter(lastAddedCenter.id, centerData);
      return;
    }

    lm.$emit(Status.PROCESSING, '');
    vm.processing = 1;
    service.addCenter(formData, token).then(function (result) {
      localStorageService.set('signupCenterId', result.treatment_center.id);
      // lm.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // saving center details for further step
      if (localStorageService.get('center_added') === null) {
        var centerDetail = [{
          'centerId': result.treatment_center.id,
          'centerName': vm.centerName,
          'cost': 10
        }];
      } else {
        centerDetail = localStorageService.get('center_added');
      }
      //  localStorageService.set('center_added', centerDetail);
      var centerInfo = [{
        'id': result.treatment_center.id,
        'label': vm.centerName
      }];
      localStorageService.set('current_center', centerInfo);
      var centerInfoCur = {
        'id': result.treatment_center.id,
        'label': vm.centerName,
        'editMode':true
      };
      localStorageService.set('lastAddedCenter', centerInfoCur);
      vm.resetNextStepVars();

      // saving steps data //
      //check all data
      var tagIdMain = '';
      for (var tagId in vm.checkAllTagOption) {
        if (vm.checkAllTagOption[tagId]) {
          tagIdMain += tagId + ',';
        }
      }
      tagIdMain = tagIdMain.slice(',' - 1);
      centerData.tagIdMain = tagIdMain;
      signupData.signupStep.testCenter = centerData;
      // removing next step previous values
      signupData.signupStep.optionalFields = {};
      signupData.signupStep.publishAds = {};
      // setting final data
      localStorageService.set('signupStepsData', signupData, 'sessionStorage');

      $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
    }).catch(function (err) {
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // lm.$emit(Status.FAILED, err.data.error);
      $log.info(err);
      vm.error = '';
      if (angular.isDefined(err.data.treatment_center.email)) {
        vm.error = err.data.treatment_center.email.errors[0];
      } else if (angular.isDefined(err.data.treatment_center.center_name)) {
        vm.error = err.data.treatment_center.center_name.errors[0];
      }
      shakeme();
      vm.displayMsg = vm.error;
      // lm.$emit(Status.FAILED, vm.error);
      // $log.info(err);
    });
  };

  vm.skip = function (where) {
    if (where === 'optional') {
      $state.go(UIState.SIGN_UP.OPTIONAL_FIELDS);
    } else {
      $state.go(UIState.SIGN_UP.SPONSER);
    }

  };
}

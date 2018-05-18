module.exports = ['$timeout', '$scope', '$document', '$log', '$rootScope', '$state', '$stateParams', 'Status', 'UIState', 'SignUpService', 'TreatmentCenterService', 'MapService', 'localStorageService', 'UserService', 'CartDetailService',
  ctrl];

function ctrl($timeout, $scope, $document, $log, $rootScope, $state, $stateParams, Status, UIState, signupService, service, mapService, localStorageService, UserService, CartDetailService) {
  var vm = this;
  var id = $stateParams.id;
  var lm = $rootScope;
  var token = localStorageService.get('token');

  var initStartupVars = function () {
    vm.centerFormInit = {};
    vm.centerFormInit.categories = 1;
    vm.centerFormInit.centerName = 1;
    vm.centerFormInit.website = 1;
    vm.centerFormInit.email = 1;
    vm.centerFormInit.phone = 1;
    vm.centerFormInit.address = 1;
    vm.displayMsg = '';
  };
  initStartupVars();

  // for extra placeholder
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

  // Logo preview code
  vm.logoPreview = 0;
  // Uploaded single image preview
  $scope.imagePreview = function (element) {
    vm.err_type = 0;
    // vm.previewImg = 'hello';
    var reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onload = function (e) {
      vm.previewImg = e.target.result;
      // $log.info(rs.testimg);
      $document[0].getElementById('logo_preview').src = vm.previewImg;
    };
    vm.logoPreview = 1;
  };
  vm.deleteLogo = function () {
    $document[0].getElementById('logo_preview').src = '';
    vm.logoData = null;
    vm.logoPreview = 0;
  };

  // ------- MULTIPREVIEW -----//
  vm.multiPrvElm = [];
  vm.multiPreview = [];
  vm.newGallData = [];
  var removedKeyMulti = [];
  $scope.imagePreviewMulti = function (element) {
    removedKeyMulti = [];
    var reader = new FileReader();
    var len = element.files.length;
    $log.info(element.files[0]);
    for (var key = 0; key < len; key++) {
      // $log.info(key + '  --file: ' + element.files[key]);
      vm.multiPrvElm[key] = element.files[key];
      vm.multiPreview[key] = 1;
    }
    vm.loadMultiPrev(reader, element, 0);
    //  vm.newGallData = vm.galleryData;
    // for (key in vm.multiPrvElm) {
    //   reader.readAsDataURL(element.files[key]);
    //   reader.onload = function (e) {
    //     $log.info(e.target.result);
    //     $document[0].getElementById('multi_preview-' + key).src = e.target.result;
    //   };
    // }
  };

  vm.loadMultiPrev = function (reader, element, ik) {
    var tmp = ik;
    reader.readAsDataURL(element.files[ik]);
    reader.onload = function (e) {
      //  $log.info('test: ' + i + '   ' + e.target.result);
      $document[0].getElementById('multi_preview-' + ik).src = e.target.result;
      if (ik < (vm.multiPrvElm.length - 1)) {
        tmp++;
        vm.loadMultiPrev(reader, element, tmp);
      } else {
        $log.info('return at: ' + ik);
        return;
      }
    };
  };

  vm.deleteMulti = function (key) {
    $document[0].getElementById('multi_preview-' + key).src = '';
    vm.multiPreview[key] = 0;
    removedKeyMulti.push(key);
  };
  // -------END: MULTIPREVIEW -----//

  vm.restoreValues = function () {
    service.queryDetail(id, token).then(function (result) {
      for (var key in result.treatment_center) {
        vm[key] = result.treatment_center[key];
      }
      vm.overview = result.treatment_center.content_1;
      vm.treatmentApproach = result.treatment_center.content_2;
      vm.usp = result.treatment_center.content_3;

      vm.logoData = result.treatment_center.listing_image;
      // categories preselect
      var catg = vm.categories;
      for (var key in catg) {
        var catgId = catg[key].id;
        vm.categoryModel[catgId] = true;
        vm.catgcheckedstring[catgId] = 'checked';
      }
      // logo preselect
      if (result.treatment_center.listing_image !== null) {
        $document[0].getElementById('logo_preview').src = result.treatment_center.listing_image;
        vm.logoPreview = 1;
      }
      // gallery images preload
      if (result.treatment_center.center_images !== null) {
        var multiImages = result.treatment_center.center_images;
        for (var k in result.treatment_center.center_images) {
          $log.info(result.treatment_center.center_images[k].file);
          vm.multiPrvElm[k] = result.treatment_center.center_images[k].file;
          vm.multiPreview[k] = 1;
        }
        $timeout(function () {
          for (k in vm.multiPrvElm) {
            $document[0].getElementById('multi_preview-' + k).src = vm.multiPrvElm[k];
          }
        }, 800);
        //  vm.loadMultiImages(multiImages, 0);
      }

      //  getCities(state);
      //  vm.testPhone();
      // select categories
      //  selectCategory();
    });
  };

  vm.loadMultiImages = function (images, ik) {
    var tmp = ik;
    //  $log.info('test: ' + i + '   ' + e.target.result);
    $document[0].getElementById('multi_preview-' + ik).src = images[ik];
    if (ik < (images.length - 1)) {
      tmp++;
      vm.loadMultiImages(reader, element, tmp);
    } else {
      $log.info('return at: ' + ik);
      return;
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

  vm.goToNext = function () {
    // validation check for step 1, if validation error then return
    var stp1 = vm.checkValidation(1);
    if (stp1 === 1) {
      return;
    }
    vm.showFirstStep = 0;
    vm.showSecondStep = 1;
  };
  vm.goToBack = function () {
    vm.showFirstStep = 1;
    vm.showSecondStep = 0;
  };

  vm.checkValidation = function (step) {
    var error = 0;
    if (step === 1) {
      if (vm.centerForm.centerName.$error.required) {
        vm.displayMsg = 'Please enter center name';
        error = 1;
      } else if (vm.categoryModel.length === 0) {
        vm.displayMsg = 'Select any category';
        error = 1;
      } else if (vm.centerForm.website.$error.required) {
        error = 1;
        vm.displayMsg = 'Please enter website';
      } else if (vm.centerForm.website.$error.pattern) {
        vm.displayMsg = 'Invalid website';
        error = 1;
      } else if (vm.centerForm.email.$error.required) {
        vm.displayMsg = 'Please enter Email address';
        error = 1;
      } else if (vm.centerForm.email.$error.pattern) {
        vm.displayMsg = 'Invalid email';
        error = 1;
      } else if (vm.centerForm.phone.$invalid) {
        vm.displayMsg = 'Invalid phone';
        error = 1;
      } else if (vm.centerForm.address.$invalid) {
        vm.displayMsg = 'Please enter Address';
        error = 1;
      }
    } else if (step === 2) {
      if (vm.centerForm.description.$invalid) {
        vm.displayMsg = 'Please enter description';
        error = 1;
      } else if (vm.centerForm.overview.$invalid) {
        vm.displayMsg = 'Please enter overview';
        error = 1;
      } else if (vm.centerForm.treatmentApproach.$invalid) {
        vm.displayMsg = 'Please enter treatmentApproach';
        error = 1;
      } else if (vm.centerForm.usp.$invalid) {
        vm.displayMsg = 'Please enter valid usp';
        error = 1;
      }
    }

    if (error === 1) {
      shakeme();
      return 1;
    }
    return 0;
  };

  vm.updateCenter = function (skip) {
    //  lm.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var catId = '';
    for (var key in vm.categoryModel) {
      if (vm.categoryModel[key]) {
        catId += key + ',';
      }
    }
    catId = catId.slice(',', -1);

    // validation check
    var stp1 = vm.checkValidation(1);
    var stp2 = 0;
    if (skip !== true) {
      stp2 = vm.checkValidation(2);
    }
    if (stp1 === 1 || stp2 === 1) {
      return;
    }

    if(angular.isUndefined(vm.description)){
      vm.description = '';
    }
    if(angular.isUndefined(vm.overview)){
      vm.overview = '';
    }
    if(angular.isUndefined(vm.treatmentApproach)){
      vm.treatmentApproach='';
    }
    if(angular.isUndefined(vm.usp)){
      vm.usp='';
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
    var imageData = vm.galleryData;

    var centerData = {
      'center_name': vm.center_name,
      'category_id': catId,
      'center_web_link': vm.center_web_link,
      'email': vm.email,
      'phone': vm.phone,
      // 'tag_id': tagIds,
      'address_line_1': vm.address_line_1,
      // 'city': vm.city,
    };
    var optionalFields = {
      'listing_image': vm.logoData,
      'description': vm.description,
      'content_1': vm.overview,
      'content_2': vm.treatmentApproach,
      'content_3': vm.usp
    };

    for (key in centerData) {
      formData.append('treatment_center[' + key + ']', centerData[key]);
    }
    if (skip !== true) {
      if (imageData) {
        var len = imageData.length;
        for (var i = 0; i < len; i++) {
          if (removedKeyMulti.indexOf(i) >= 0) {
            $log.info('image index removed: ' + i + ' ' + imageData.item(i));
            continue;
          }
          formData.append('treatment_center[image_data][]', imageData.item(i));
        }
      }
      for (key in optionalFields) {
        formData.append('treatment_center[' + key + ']', optionalFields[key]);
      }
    }
    lm.$emit(Status.PROCESSING, '');
    vm.processing = 1;
    service.edit(id, formData).then(function (result) {
      //  signupService.addCenter(formData, token).then(function (result) {
      // lm.$emit(Status.SUCCEEDED, Status.SIGNUP_CENTER);
      //  vm.restoreValues();

      //  localStorageService.set('center_added', centerDetail);
      var centerInfo = [{
        'id': result.treatment_center.id,
        'label': vm.centerName
      }];
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      //  localStorageService.set('current_center', centerInfo);

      // saving steps data //
      //    signupData.signupStep.testCenter = centerData;
      // removing next step previous values
      //    signupData.signupStep.optionalFields = {};
      //    signupData.signupStep.publishAds = {};
      // setting final data
      //  localStorageService.set('signupStepsData', signupData, 'sessionStorage');

      $state.go(UIState.MY_PROFILE.TEST_CENTER_DETAILS);
    }).catch(function (err) {
      // lm.$emit(Status.FAILED, err.data.error);
      $log.info(err);
      lm.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      vm.displayMsg = 'Something went wrong';
      vm.error = '';
      if (angular.isDefined(err.data.treatment_center.email.errors)) {
        vm.error = err.data.treatment_center.email.errors[0];
        $log.info(vm.error);
      }
      // $log.info(err);
    });
  };
  vm.skip = function () {
    // $state.go(UIState.SIGN_UP.SPONSER);
    $state.go(UIState.MY_PROFILE.SPONSORED_PAGE);
  };
}

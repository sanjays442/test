module.exports = ['$injector', '$document', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'TreatmentCenterService', 'Status', '$timeout', ctrl];

function ctrl($injector, $document, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status, $timeout) {
  var vm = this;
  var rs = $rootScope;
  // var token = localStorageService.get('signupToken');
  // get previous steps localstorage data
  var signupData = localStorageService.get('signupStepsData', 'sessionStorage');
  $log.info(signupData);

  var initStartupVars = function () {
    vm.optionalInit = {};
    vm.optionalInit.description = 1;
    vm.optionalInit.overview = 1;
    vm.optionalInit.treatmentApproach = 1;
    vm.optionalInit.usp = 1;
    vm.displayMsg = 'Explaination of each field here?';
    var addCenterProgress = {'lastStep':'myProfile.optionalfields', 'stepsCompleted':0};
    localStorageService.set('addCenterProgress',addCenterProgress, 'sessionStorage');
  };
  initStartupVars();

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
  vm.setProgressValues(0, 25);
  // END: progress values

  vm.updateMembership = function () {
    $state.go(UIState.MY_PROFILE.UPDATE_MEMBERSHIP);
  };

  vm.logoPreview = 0;
  // Uploaded image preview
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
    vm.logoData = '';
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
      vm.newGallData[ik] = e.target.result;
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
  // ------- MULTIPREVIEW -----//

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
      type: mimeString
    });
  }

  // ******************** restore values *************** //
  vm.restoreValues = function () {
    if (angular.isDefined(signupData.signupStep.optionalFields) && angular.isDefined(signupData.signupStep.optionalFields.description)) {
      var optional = signupData.signupStep.optionalFields;
      vm.description = optional.description;
      vm.overview = optional.content_1;
      vm.treatmentApproach = optional.content_2;
      vm.usp = optional.content_3;
      if (angular.isDefined(optional.listing_image) && optional.listing_image!==null) {
        vm.logoPreview = 1;
        $document[0].getElementById('logo_preview').src = optional.listing_image;
        vm.previewImg = optional.listing_image;
        vm.logoData  = dataURItoBlob(optional.listing_image);
      }
      if (angular.isDefined(optional.galleryData) && optional.galleryData[0]!==null) {
        // vm.galleryData = {item:[]};
        vm.galleryData = [];
        for(var key in optional.galleryData){
          vm.multiPreview[key] = 1;
          vm.multiPrvElm.push(optional.galleryData[key]);
          vm.newGallData.push(optional.galleryData[key]);
        }
        $timeout(function () {
          for(key in vm.multiPrvElm){
            $document[0].getElementById('multi_preview-' + key).src = vm.multiPrvElm[key];
             vm.galleryData.push(dataURItoBlob(optional.galleryData[key]));
          }
        }, 500);

      }
    }
  };
  vm.restoreValues();

  vm.optionalFieldsSubmit = function () {
    // rs.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var logo = vm.logoData;
    // var gallery = rs.galleryData;
    if (angular.isUndefined(logo)) {
      logo = '';
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
    // var galleryData = '';
    // if (angular.isDefined(gallery)) {
    //   var len = gallery.length;
    //   for (var i = 0; i < len; i++) {
    //     //  formData.append('treatment_center[image_data][]', imageData.item(i));
    //     //  galleryData.push(gallery.item(i));
    //     galleryData += gallery.item(i) + ',';
    //   }
    //   galleryData = galleryData.slice(',', -1);
    // }
    function shakeme() {
      angular.element('.progress-img-wrap').addClass('shake');
      $timeout(function () {
        angular.element('.shake').removeClass('shake');
      }, 500);
    }

    if (vm.optionalForm.description.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter description';
      return;
    } else if (vm.optionalForm.overview.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter overview';
      return;
    } else if (vm.optionalForm.treatmentApproach.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter treatmentApproach';
      return;
    } else if (vm.optionalForm.usp.$invalid) {
      shakeme();
      vm.displayMsg = 'Please enter valid usp';
      return;
    }

    var formData = new FormData();
    var imageData = vm.galleryData;
    if (imageData) {
      var len = imageData.length;
      var galleryData =[];
      for (var i = 0; i < len; i++) {
        if (removedKeyMulti.indexOf(i) >= 0) {
          //  $log.info('image index removed: ' + i + ' ' + imageData.item(i));
          continue;
        }
        galleryData.push(vm.newGallData[i]);
        if(angular.isUndefined(imageData.item)){
          formData.append('treatment_center[image_data][]', imageData[i]);
        }else{
          formData.append('treatment_center[image_data][]', imageData.item(i));
        }
      }
    }

    var optionalData = {
      'listing_image': logo,
      'description': vm.description,
      'content_1': vm.overview,
      'content_2': vm.treatmentApproach,
      'content_3': vm.usp
    };
    for (var key in optionalData) {
      formData.append('treatment_center[' + key + ']', optionalData[key]);
    }
    var optionalDataSave = {
      'listing_image': (vm.logoPreview)?vm.previewImg:null,
      'description': vm.description,
      'content_1': vm.overview,
      'content_2': vm.treatmentApproach,
      'content_3': vm.usp,
      'galleryData': galleryData
    };

    var centerId = localStorageService.get('signupCenterId');
    if (angular.isUndefined(centerId)) {
      $log.info('Center id not defined');
      return;
    }
    rs.$emit(Status.PROCESSING, '');
    vm.processing = 1;
  //  service.addOptionalFields(formData, centerId).then(function (result) {
    service.edit(centerId, formData).then(function (result) {
      // rs.$emit(Status.SUCCEEDED, 'Optional fields updated');
      rs.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      // saving steps data //
      signupData.signupStep.optionalFields = optionalDataSave;
      localStorageService.set('signupStepsData', signupData, 'sessionStorage');
      $state.go(UIState.MY_PROFILE.UPDATE_MEMBERSHIP);
    }).catch(function (err) {
      rs.$emit(Status.HIDE_PROCESSING, '');
      vm.processing = 0;
      rs.$emit(Status.FAILED, err.data.error);
      $log.info(err);
    });
  };
  vm.goBack = function () {
    $rootScope.fromBackButton = 1;
    $state.go(UIState.MY_PROFILE.ADD_TEST_CENTER);
  };
}

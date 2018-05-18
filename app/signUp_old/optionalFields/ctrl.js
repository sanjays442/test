module.exports = ['$injector', '$document', '$scope', '$log', '$rootScope', '$state', 'UIState', 'localStorageService', 'SignUpService', 'Status', '$timeout', ctrl];

function ctrl($injector, $document, $scope, $log, $rootScope, $state, UIState, localStorageService, service, Status, $timeout) {
  var vm = this;
  var rs = $rootScope;
  var token = localStorageService.get('signupToken');

  var initStartupVars = function () {
    vm.optionalInit = {};
    vm.optionalInit.description = 1;
    vm.optionalInit.overview = 1;
    vm.optionalInit.treatmentApproach = 1;
    vm.optionalInit.usp = 1;
    vm.displayMsg = 'Explaination of each field here?';
  };
  initStartupVars();

  vm.updateMembership = function () {
    $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
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
  // ------- MULTIPREVIEW -----//
  vm.optionalFieldsSubmit = function () {
    // rs.$emit(Status.PROCESSING, Status.PROCESSING_MSG);
    var logo = vm.logoData;
    // var gallery = rs.galleryData;
    if (angular.isUndefined(logo)) {
      logo = '';
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
      for (var i = 0; i < len; i++) {
        if (removedKeyMulti.indexOf(i) >= 0) {
          $log.info('image index removed: ' + i + ' ' + imageData.item(i));
          continue;
        }
        formData.append('treatment_center[image_data][]', imageData.item(i));
      }
    }

    var optionalData = {
      'listing_image': logo,
      'description': vm.description,
      'content_1': vm.overview,
      'content_2': vm.treatmentApproach,
      'content_3': vm.usp
      // 'content_4': '',
      // 'heading_1': '',
      // 'heading_2': '',
      // 'heading_3': '',
      // 'heading_4': '',
      // 'image_data': galleryData
    };
    for (var key in optionalData) {
      formData.append('treatment_center[' + key + ']', optionalData[key]);
    }

    var centerId = localStorageService.get('signupCenterId');
    if (angular.isUndefined(centerId)) {
      $log.info('Center id not defined');
      return;
    }

    service.addOptionalFields(formData, centerId, token).then(function (result) {
      $log.info(result);
      rs.$emit(Status.SUCCEEDED, 'Optional fields updated');
      $state.go(UIState.SIGN_UP.UPDATE_MEMBERSHIP);
    }).catch(function (err) {
      rs.$emit(Status.FAILED, err.data.error);
      $log.info(err);
    });
  };
}

describe('SponsorListingBox Controller', function () {
  var componentName = 'sponsorListingBox',
    _$log,
    _$state,
    _service,
    $rootScope,
    UIState,
    $q,
    ctrl;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  beforeEach(angular.mock.inject(function ($injector) {
    _$log = $injector.get('$log');
    _$state = $injector.get('$state');
    _service = $injector.get('TreatmentCenterService');
    $rootScope = $injector.get('$rootScope');
    $q = $injector.get('$q');
    UIState = $injector.get('UIState');
    var $componentController = $injector.get('$componentController');
    ctrl = $componentController(componentName, {
      $log: _$log,
      $state: _$state,
      service: _service
    }, null);
  }));

  describe(' with invalid state (ui-router) not in [`sponsorHome.filter`, `sponsorHome.state`, `sponsorHome.county`, sponsorHome.city] ', function () {
    beforeEach(angular.mock.inject(function () {
      _$state.go(UIState.ABOUT_US);
      $rootScope.$digest();
    }));

    it('should go to home page', function () {
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$state.current.name).toEqual(UIState.HOME);
    });
  });

  describe(' with invalid `filterName`, ', function () {
    beforeEach(angular.mock.inject(function () {
      _$state.go(UIState.SPONSOR_HOME.FILTER, {
        filterName: ''
      });
      $rootScope.$digest();
    }));

    it('should go to home page', function () {
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$state.current.name).toEqual(UIState.HOME);
    });
  });

  describe(' with valid `filterName`, ', function () {
    var _filterName = 'Rehab for Men';
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.FILTER, {
        filterName: _filterName
      });
      $rootScope.$digest();
    });

    it('should call backend API', function () {
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        return deferred.promise;
      });
      expect(_service.querySponsoredListings).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(_service.querySponsoredListings).toHaveBeenCalledWith(_filterName);
    });

    it('should have result and display no error when API is resolved', function () {
      var result = {};
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve(result);
        return deferred.promise;
      });
      ctrl.$onInit();
      $rootScope.$digest();
      expect(ctrl.entry).toBe(result);
      expect(ctrl.displayError).toBeFalsy();
    });

    it('should have no result and dislay error when API is rejected', function () {
      var errMsg = 'Epected error message';
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.reject(errMsg);
        return deferred.promise;
      });
      spyOn(_$log, 'error');
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$log.error).toHaveBeenCalledWith(errMsg);
      expect(ctrl.result).toBeUndefined();
      expect(ctrl.displayError).toBeTruthy();
    });
  });

  describe(' with invalid `stateName`, ', function () {
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.STATE, {
        stateName: ''
      });
      $rootScope.$digest();
    });

    it('should go to home page', function () {
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$state.current.name).toEqual(UIState.HOME);
    });
  });

  describe(' with valid `stateName`, ', function () {
    var _stateName = 'CA';
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.STATE, {
        stateName: _stateName
      });
      $rootScope.$digest();
    });

    it('should call backend API', function () {
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        return deferred.promise;
      });
      expect(_service.querySponsoredListings).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(_service.querySponsoredListings).toHaveBeenCalledWith(_stateName);
    });

    it('should have result and display no error when API is resolved', function () {
      var result = {};
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve(result);
        return deferred.promise;
      });
      ctrl.$onInit();
      $rootScope.$digest();
      expect(ctrl.entry).toBe(result);
      expect(ctrl.displayError).toBeFalsy();
    });

    it('should have no result and dislay error when API is rejected', function () {
      var errMsg = 'Epected error message';
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.reject(errMsg);
        return deferred.promise;
      });
      spyOn(_$log, 'error');
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$log.error).toHaveBeenCalledWith(errMsg);
      expect(ctrl.result).toBeUndefined();
      expect(ctrl.displayError).toBeTruthy();
    });
  });

  describe(' with invalid `countyName`, ', function () {
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.COUNTY, {
        countyName: ''
      });
      $rootScope.$digest();
    });

    it('should go to home page', function () {
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$state.current.name).toEqual(UIState.HOME);
    });
  });

  describe(' with valid `countyName`, ', function () {
    var _countyName = 'Cook County';
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.COUNTY, {
        stateName: 'IL',
        countyName: _countyName
      });
      $rootScope.$digest();
    });

    it('should call backend API', function () {
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        return deferred.promise;
      });
      expect(_service.querySponsoredListings).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(_service.querySponsoredListings).toHaveBeenCalledWith(_countyName);
    });

    it('should have result and display no error when API is resolved', function () {
      var result = {};
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve(result);
        return deferred.promise;
      });
      ctrl.$onInit();
      $rootScope.$digest();
      expect(ctrl.entry).toBe(result);
      expect(ctrl.displayError).toBeFalsy();
    });

    it('should have no result and dislay error when API is rejected', function () {
      var errMsg = 'Epected error message';
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.reject(errMsg);
        return deferred.promise;
      });
      spyOn(_$log, 'error');
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$log.error).toHaveBeenCalledWith(errMsg);
      expect(ctrl.result).toBeUndefined();
      expect(ctrl.displayError).toBeTruthy();
    });
  });

  describe(' with invalid `cityName`, ', function () {
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.CITY, {
        cityName: ''
      });
      $rootScope.$digest();
    });

    it('should go to home page', function () {
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$state.current.name).toEqual(UIState.HOME);
    });
  });

  describe(' with valid `cityName`, ', function () {
    var _cityName = 'Cook County';
    beforeEach(function () {
      _$state.go(UIState.SPONSOR_HOME.CITY, {
        stateName: 'IL',
        countyName: 'Cook County',
        cityName: _cityName
      });
      $rootScope.$digest();
    });

    it('should call backend API', function () {
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        return deferred.promise;
      });
      expect(_service.querySponsoredListings).not.toHaveBeenCalled();
      ctrl.$onInit();
      expect(_service.querySponsoredListings).toHaveBeenCalledWith(_cityName);
    });

    it('should have result and display no error when API is resolved', function () {
      var result = {};
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve(result);
        return deferred.promise;
      });
      ctrl.$onInit();
      $rootScope.$digest();
      expect(ctrl.entry).toBe(result);
      expect(ctrl.displayError).toBeFalsy();
    });

    it('should have no result and dislay error when API is rejected', function () {
      var errMsg = 'Epected error message';
      spyOn(_service, 'querySponsoredListings').and.callFake(function () {
        var deferred = $q.defer();
        deferred.reject(errMsg);
        return deferred.promise;
      });
      spyOn(_$log, 'error');
      ctrl.$onInit();
      $rootScope.$digest();
      expect(_$log.error).toHaveBeenCalledWith(errMsg);
      expect(ctrl.result).toBeUndefined();
      expect(ctrl.displayError).toBeTruthy();
    });
  });
});

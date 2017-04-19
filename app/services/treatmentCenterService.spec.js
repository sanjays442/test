describe('TreatmentCenterService', function () {
  var $httpBackend,
    endPoint,
    $rootScope,
    service;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  beforeEach(angular.mock.inject(['$injector', function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    endPoint = $injector.get('endPoint');
    $rootScope = $injector.get('$rootScope');
    service = $injector.get('TreatmentCenterService');
  }]));
  // After every spec, do the following:
  afterEach(function () {
    // Make sure we have flushed all of our requests.
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  var methods = [
    'addTreatmentCenterSignUp',
    'queryFeaturedListings',
    'querySponsoredListings',
    'queryDetail',
    'queryList',
    'add',
    'edit',
    'activate',
    'remove',
    'inquiry',
    'submitRating',
    'search'
  ];
  methods.forEach(function (method) {
    it('should have method `' + method + '`.', function () {
      expect(angular.isFunction(service[method])).toBe(true);
    });
  });

  // addTreatmentCenterSignUp
  describe('addTreatmentCenterSignUp - todo', function () {});

  // queryFeaturedListings
  describe('queryFeaturedListings - todo', function () {});

  // querySponsoredListings
  describe('querySponsoredListings', function () {
    var type,
      data,
      requestURL;
    beforeEach(function () {
      type = 'new listing';
      data = {
        'sponsored_listing_type': type
      };
      requestURL = endPoint + '/sponsored_listings';
    });

    it('should get sponsored listings when backend is fine.', function () {
      var mockResponse = [];
      $httpBackend.whenPOST(requestURL, data).respond(mockResponse);
      service.querySponsoredListings(type).then(function (result) {
        expect(result).toEqual(mockResponse);
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });

    it('should throw error when backend is broken.', function () {
      $httpBackend.whenPOST(requestURL, data).respond(500, '');
      service.querySponsoredListings(type).catch(function (res) {
        expect(res.status).toEqual(500);
        expect(res.data).toEqual('');
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });
  });

  // queryDetail
  describe('queryDetail', function () {
    var id,
      requestURL;
    beforeEach(function () {
      id = 100;
      requestURL = endPoint + '/treatment_center/' + id + '/detail';
    });

    it('should get treatment center detail when backend is fine.', function () {
      var mockResponse = {};
      $httpBackend.whenGET(requestURL).respond(mockResponse);
      service.queryDetail(id).then(function (res) {
        expect(res).toEqual(mockResponse);
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });

    it('should throw an error when backend is broken.', function () {
      $httpBackend.whenGET(requestURL).respond(500, '');
      service.queryDetail(id).catch(function (res) {
        expect(res.status).toEqual(500);
        expect(res.data).toEqual('');
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });
  });

  // queryList
  describe('queryList - todo', function () {});

  // add
  describe('add - todo', function () {});

  // edit
  describe('edit - todo', function () {});

  // activate
  describe('activate - todo', function () {});

  // remove
  describe('remove - todo', function () {});

  // inquiry
  describe('inquiry - todo', function () {});

  // submitRating
  describe('submitRating - todo', function () {});
});

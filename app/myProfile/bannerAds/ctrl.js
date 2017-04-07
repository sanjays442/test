function ctrl($document, AdvertisementService) {
  var list = this;

  function bannersList() {
    AdvertisementService.advertisementList().then(function (response) {
      list.advertisement = response;
    }).catch(function (err) {
      throw err;
    });
  }
  bannersList();

  list.actDect = function (id) {
    AdvertisementService.updateStatus(id).then(function (response) {
      var status = angular.element($document.querySelector('#status-' + id));
      if (response.active) {
        list.active = response.active;
        status.html('Deactivate');
      } else {
        list.active = response.active;
        status.html('Activate');
      }
    }).catch(function (err) {
      throw err;
    });
  };
}

module.exports = ['$document', 'AdvertisementService', ctrl];

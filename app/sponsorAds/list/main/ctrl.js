function ctrl($log, SponsorService) {
  var list = this;

  list.totalAds = 0;
  list.totalPages = [];
  list.currentPage = 1;

  list.pageChanged = function (newPage) {
    sponsorList(newPage);
    window.scrollTo(0, 100);
  };

  function sponsorList(page) {
    SponsorService.sponsorList(page).then(function (response) {
      list.sponsor = response;

      list.totalPages = new Array(response.total_pages);
      for (var i = 1; i <= response.total_pages; i++) {
        list.totalPages.push(i);
      }
      list.currentPage = response.current_page;
    }).catch(function (err) {
      throw err;
    });
  }
  sponsorList(1);
  list.actDect = function (id) {
    SponsorService.updateStatus(id).then(function (response) {
      var status = angular.element(document.querySelector('#status-' + id));
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

module.exports = ['$log', 'SponsorService', ctrl];

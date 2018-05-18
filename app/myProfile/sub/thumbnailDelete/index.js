function ThumbnailCtrl() {

}

module.exports = {
  template: require('./view.html'),
  controller: ThumbnailCtrl,
  bindings: {
    imgUrl: '@',
    onDelete: '&'
  }
};
// http://www.addictionnetwork.com/add-treatment-center/?image_ref=1425491373-logo-windy%20hill%20pavillion.jpg&p_ref=JSwzYFMtU2BgCmAK

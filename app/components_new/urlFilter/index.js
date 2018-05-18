module.exports = filter;

var httpProto = 'http://',
  httpsProto = 'https://';

function filter() {
  return function (link) {
    if (!link) {
      return '';
    }
    var i = link.search(httpProto);
    // the link starts with 'http://'
    if (i === 0) {
      return link;
    }
    i = link.search(httpsProto);
    // the link starts with 'https://'
    if (i === 0) {
      return link;
    }

    // the link does not start with 'http://' nor 'https://'
    return httpProto + link;
  };
}

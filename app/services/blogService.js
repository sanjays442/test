module.exports = ['$http', service];

function service($http) {
  return {
    getBlog: getBlog,
    getBlogSingle: getBlogSingle,
    getBlogPaged: getBlogPaged,
    getBlogSingleAbout: getBlogSingleAbout
  };

  // homepage slider
  function getBlog() {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=all');
  }

  function getBlogPaged(paged) {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=all&paged=' + paged);
  }

  function getBlogSingle(singleBlog) {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=single&title=' + singleBlog);
  }

  function getBlogSingleAbout(singleBlog) {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=about&title=' + singleBlog);
  }
}

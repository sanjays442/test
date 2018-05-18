module.exports = ['$http', service];

function service($http) {
  return {
    getBlog: getBlog,
    getBlogSingle: getBlogSingle,
    getBlogPaged: getBlogPaged,
    getBlogSingleAbout: getBlogSingleAbout,
    checkIfBlogExists: checkIfBlogExists
  };

  // homepage slider
  function getBlog() {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=all');
  }

  function getBlogPaged(paged) {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=all&paged=' + paged);
  }

  function checkIfBlogExists(singleBlog) {
    $http.get('//blog.addictionnetwork.com/blog/post_exist.php?slug=' + singleBlog).then(function (result) {
      return result.data;
    });
  }

  function getBlogSingle(singleBlog) {
     // console.log('india'+checkIfBlogExists(singleBlog));
    $http.get('//blog.addictionnetwork.com/blog/post_exist.php?slug=' + singleBlog).then(function (result) {
      if (result.data === '0') {
        window.location.href = '/404';
      }
    });
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=single&title=' + singleBlog);
  }

  function getBlogSingleAbout(singleBlog) {
    return $http.get('//blog.addictionnetwork.com/blog/access_blog.php?blogs=about&title=' + singleBlog);
  }
}

module.exports = {
  template: require('./view.html'),
  controller: require('./ctrl'),
  bindings: {
    ratings: '<'
  }
};

// ratings :[{
//   "id": 3,
//   "star": 5,
//   "name": "Cat Woman",
//   "review": "Awesome"
// }]

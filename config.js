
module.exports = {
  feedURL: 'http://localhost:3000/v1/purchases',
  createPurchaseURL: 'http://localhost:3000/v1/purchases',
  purchaseURL: function (id) {
    return 'http://localhost:3000/v1/purchases/' + id;
  },
  registerURL: 'http://localhost:3000/v1/users',
  loginURL: 'http://localhost:3000/v1/login',
  likePurchaseURL: function (id) {
    return 'http://localhost:3000/v1/purchases/' + id + '/likes';
  },
  unlikePurchaseURL: function (id) {
    return 'http://localhost:3000/v1/purchases/' + id + '/likes';
  },
  foursquareClientID: function () {
    return 'LXSSV0Q43OEKKMRJIRX3RDGWYMEKSUZNUHJTF3UCBX5AQJUS';
  },
  foursquareClientSecret: function () {
    return 'JAZW3PATQJNWUIN5I4UDD52LDMJKG1HHWLGOI4VY34WHAXNN';
  }
};

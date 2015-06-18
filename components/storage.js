/* globals fetch */

var React = require('react-native');
var config = require('../config');

const ACCESSTOKENKEY = 'ACCESSTOKEN';
const USERKEY = 'USERNAME';

var {
  AsyncStorage,
} = React;

function Storage () {
  this.accessToken = null;
  this.user = null;

  AsyncStorage.getItem(ACCESSTOKENKEY).then((key) => this.accessToken = key);
  AsyncStorage.getItem(USERKEY).then((value) => this.user = JSON.parse(value));
};

Storage.prototype.setAccessToken = function (key) {
  AsyncStorage.setItem(ACCESSTOKENKEY, key);
  this.accessToken = key;
};

Storage.prototype.isLoggedIn = function () {
  return this.accessToken !== null;
};

Storage.prototype.logout = function () {
  AsyncStorage.multiRemove([USERKEY, ACCESSTOKENKEY]).then(() => {
    this.accessToken = null;
    this.user = null;
  });
};

Storage.prototype.setUser = function (user) {
  AsyncStorage.setItem(USERKEY, JSON.stringify(user));
  this.user = user;
};

Storage.prototype.getUser = function (user) {
  return this.user;
};

Storage.prototype.login = function (user) {
  return this.unauthenticatedRequest('POST', config.loginURL, { user: user })
    .then((response) => response.text())
    .then((responseText) => {
      var json = JSON.parse(responseText);

      if (json.error) {
        return json.error;
      } else {
        this.setAccessToken(json.access_token);
        this.setUser(user);
        return false;
      }
    });
};

Storage.prototype.register = function (user) {
  return this.unauthenticatedRequest('POST', config.registerURL, { user: user })
    .then((response) => response.text())
    .then((responseText) => {
      var json = JSON.parse(responseText);

      if (json.error) {
        return json.error;
      } else {
        this.setAccessToken(json.access_token);
        this.setUser(user);
        return false;
      }
    });
};

Storage.prototype.createPurchase = function (purchase) {
  return this.authenticatedRequest('POST', config.createPurchaseURL, { purchase: purchase });
};

Storage.prototype.likePurchase = function (purchase) {
  return this.authenticatedRequest('POST', config.likePurchaseURL(purchase.id));
};

Storage.prototype.unlikePurchase = function (purchase) {
  return this.authenticatedRequest('DELETE', config.unlikePurchaseURL(purchase.id));
};

Storage.prototype.authenticatedRequest = function (method, url, data) {
  return fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.accessToken
    },
    body: JSON.stringify(data)
  });
};

Storage.prototype.unauthenticatedRequest = function (method, url, data) {
  return fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

module.exports = new Storage;

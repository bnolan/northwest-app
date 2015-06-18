/* globals alert */

var React = require('react-native');
var Storage = require('./storage');

var {
  StyleSheet,
  Text,
  TouchableOpacity
} = React;

module.exports = React.createClass({
  displayName: 'LikeButton',

  onLike: function () {
    if (!Storage.isLoggedIn()) {
      alert('Log in to rate places');
      return;
    }

    var username = Storage.user.username;
    var p = this.props.purchase;

    if (this.userLikesPurchase(p)) {
      // p.likes = p.likes.filter((n) => n !== username);
      Storage.unlikePurchase(p);
    } else {
      // p.likes.push(username);
      Storage.likePurchase(p);
    }
  },

  userLikesPurchase: function (p) {
    return Storage.isLoggedIn() && p.likes.find((n) => n === Storage.user.username);
  },

  render: function () {
    var liked = this.userLikesPurchase(this.props.purchase);

    return (
      <TouchableOpacity style={styles.likeButton} activeOpacity={0.2} onPress={this.onLike}>
        <Text style={liked ? styles.liked : styles.unliked}>
          { liked ? '♡' : '♡' }
        </Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  likeButton: {
    margin: 2,
    borderRadius: 2
  },
  liked: {
    fontSize: 28,
    color: '#f09',
    marginTop: 10,
    marginLeft: 22
  },
  unliked: {
    fontSize: 28,
    color: '#777',
    marginTop: 10,
    marginLeft: 22
  }
});


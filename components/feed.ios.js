/* globals fetch */

var React = require('react-native');
var timeago = require('timeago');
var config = require('../config');
var Storage = require('./storage');

var {
  StyleSheet,
  Text,
  Image,
  ActivityIndicatorIOS,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var Feed = React.createClass({
  getInitialState: function () {
    return {
      loading: true
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    fetch(config.feedURL)
      .then((response) => response.text())
      .then((responseText) => {
        var json = JSON.parse(responseText);

        this.setState({
          purchases: json.purchases,
          loading: false
        });
      });
  },

  onLike: function (p) {
    var username = Storage.user.username;

    if (this.userLikesPurchase(p)) {
      p.likes = p.likes.filter((n) => n !== username);
    } else {
      p.likes.push(username);
    }

    this.setState({ purchases: this.state.purchases });
  },

  userLikesPurchase: function (p) {
    return p.likes.find((n) => n === Storage.user.username);
  },

  render: function () {
    if (this.state.loading) {
      return (<ActivityIndicatorIOS style={{marginTop: 100}} />);
    } else {
      var purchases = this.state.purchases.map((p) => {
        var image = p.photo && <Image style={styles.productImage} source={{uri: 'http://localhost:3000/fixtures/' + p.photo }} />;
        var liked = this.userLikesPurchase(p);

        return (
          <View style={styles.purchase}>
            <View style={styles.icons}>
              <Image
                style={styles.avatar}
                source={{uri: p.user.avatar}}
              />
              <TouchableHighlight style={styles.likeButton} underlayColor='#ccc' onPress={this.onLike.bind(this, p)}>
                <Text style={liked ? styles.liked : styles.unliked}>
                  { liked ? '♡' : '♡' }
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.details}>
              <Text style={styles.description}>
                { p.user.username } bought a { p.name } from { p.venue.name }
              </Text>
              <Text style={styles.address}>
                { p.venue.address }
              </Text>
              <Text style={styles.meta}>
                { timeago(Date.parse(p.created_at)).replace(/about /, '') }
              </Text>
              <Text style={styles.likes}>
                { p.likes.length } likes
              </Text>
              { image }
            </View>
          </View>
        );
      });

      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            { purchases}
          </View>
        </ScrollView>
      );
    }
  }
});

var styles = StyleSheet.create({
  user: {
    marginRight: 4,
    fontWeight: 'bold',
    color: '#333'
  },
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
  },
  product: {
    marginLeft: 4,
    marginRight: 4,
    fontWeight: 'bold',
    color: '#333'
  },
  store: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#333'
  },
  purchase: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignSelf: 'stretch',
    paddingTop: 8
  },
  details: {
    flexDirection: 'column',
    width: 320
  },
  avatar: {
    width: 48,
    height: 48,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 24,
    borderColor: '#ccc',
    borderWidth: 1
  },
  address: {
    color: '#777',
    marginTop: 2
  },
  meta: {
    color: '#777',
    marginTop: 2
  },
  likes: {
    color: '#777',
    marginTop: 2,
    marginBottom: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  wrapper: {
    flex: 1,
  },
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Feed;

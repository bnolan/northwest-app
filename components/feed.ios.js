/* globals fetch */

var React = require('react-native');
var timeago = require('timeago');
var config = require('../config');
var LikeButton = require('./like-button.js');
var Loading = require('./loading');
var ShowPurchase = require('./show-purchase.ios.js');
var storage = require('./storage');

var {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  ScrollView
} = React;

var Feed = React.createClass({
  getInitialState: function () {
    return {
      loading: true
    };
  },

  componentDidMount: function () {
    this.fetchData();

    storage.on('liked', this.getStateFromStores.bind(this));
    storage.on('unliked', this.getStateFromStores.bind(this));
  },

  getStateFromStores: function () {
    this.setState({ purchases: storage.purchases, loading: false });
  },

  fetchData: function () {
    storage.refreshPurchases().then(this.getStateFromStores.bind(this)).done();
  },

  onShowProduct: function (p) {
    this.props.navigator.push({
      component: ShowPurchase, title: 'View Purchase', passProps: { purchase: p }
    });
  },

  render: function () {
    if (this.state.loading) {
      return <Loading />;
    } else {
      var purchases = this.state.purchases.map((p) => {
        var image = p.photo && <Image style={styles.productImage} source={{uri: 'http://localhost:3000/fixtures/' + p.photo }} />;

        return (
          <TouchableHighlight underlayColor='#ccc' onPress={this.onShowProduct.bind(this, p)}>
            <View style={styles.purchase}>
              <Image
                style={styles.avatar}
                source={{uri: p.user.avatar}}
              />
              <View style={styles.details}>
                <Text style={styles.description}>
                  <Text style={{fontWeight: 'bold' }}>{ p.name }</Text>
                  &nbsp;by&nbsp;
                  <Text style={{fontWeight: 'bold' }}>{ p.user.username }</Text>
                </Text>
                <Text style={styles.address}>
                  <Text style={{color: '#333'}}>{ p.venue.name }</Text>, { p.venue.address }
                </Text>
                <Text style={styles.meta}>
                  { timeago(Date.parse(p.created_at)).replace(/about /, '') }
                </Text>
                <Text style={styles.likes}>
                  { p.likes.length } { p.likes.length === 1 ? 'like' : 'likes' }
                </Text>
                { image }
              </View>

              <LikeButton purchase={p} />
            </View>
          </TouchableHighlight>
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
    width: 240
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

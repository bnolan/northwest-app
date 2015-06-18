/* globals alert */

var React = require('react-native');
var storage = require('./storage');
var SelectVenue = require('./select-venue');

var {
  StyleSheet,
  NavigatorIOS,
  ActivityIndicatorIOS
} = React;

var Feed = React.createClass({
  getInitialState: function () {
    return {
      initialPosition: 'unknown',
      geolocating: true
    };
  },

  componentDidMount: function () {
    this.fetchLocation();
  },

  fetchLocation: function () {
    this.setState({geolocating: true});

    navigator.geolocation.getCurrentPosition(
      (initialPosition) => {
        this.setState({geolocating: false, initialPosition: initialPosition});
      },
      (error) => {
        console.log(error);
      }
    );
  },

  render: function () {
    var self = this;

    if (this.state.geolocating) {
      return (
        <ActivityIndicatorIOS style={styles.activity} />
      );
    } else {
      return (
        <NavigatorIOS
          ref='nav'
          style={styles.wrapper}
          onPress={self.onFeed}
          initialRoute={{ component: SelectVenue, title: 'Where did you shop?', passProps: { initialPosition: this.state.initialPosition }}} />
      );
    }
  }
});

var styles = StyleSheet.create({
  activity: {
    marginTop: 100
  },
  wrapper: {
    flex: 1
  }
});

module.exports = Feed;
/* globals fetch, alert */

var React = require('react-native');
var storage = require('./storage');
var config = require('../config');
var PurchaseForm = require('./purchase-form');
var Loading = require('./loading');

var {
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicatorIOS,
  View,
  TouchableHighlight,
  ScrollView
} = React;

module.exports = React.createClass({
  displayName: 'SelectVenue',

  getInitialState: function () {
    return {
      venues: [],
      loading: true
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    this.setState({loading: true});

    var url = 'https://api.foursquare.com/v2/venues/search?ll=' + this.props.initialPosition.coords.latitude + ',' + this.props.initialPosition.coords.longitude + '&radius=200&intent=browse&client_id=' + config.foursquareClientID() + '&client_secret=' + config.foursquareClientSecret() + '&v=20150616';

    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          venues: responseData.response.venues,
          loading: false
        });
      })
      .done();
  },

  onSetVenue: function (venue) {
    var venueProps = {
      name: venue.name,
      address: venue.location.address,
      latitude: venue.location.lat,
      longitude: venue.location.lng,
      id: venue.id
    };

    this.props.navigator.push({
      component: PurchaseForm, title: 'New Purchase', passProps: { venue: venueProps }
    });
  },

  render: function () {
    var self = this;

    if (this.state.loading) {
      return <Loading />;
    }

    var results = this.state.venues.map(function (v) {
      return (
        <TouchableHighlight underlayColor='#ccc' onPress={self.onSetVenue.bind(self, v)}>
          <View style={styles.result}>
            <Text>{v.name}</Text>
            <Text>{v.location.address}</Text>
          </View>
        </TouchableHighlight>
      );
    });

    return (
      <ScrollView>
        <View>
          { results }
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  activity: {
    marginTop: 100
  },
  subheader: {
    backgroundColor: '#eee',
    padding: 10,
    paddingTop: 20,
    textAlign: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  subheaderText: {
    fontWeight: 'bold'
  },
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  purchaseName: {
    height: 32,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#777',
    backgroundColor: 'white',
    margin: 4,
    flex: 1,
    padding: 6
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#f0a',
    borderRadius: 4,
    fontSize: 16,
    margin: 20
  }
});

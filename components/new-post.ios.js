/* globals fetch, alert, XMLHttpRequest */

var React = require('react-native');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView
} = React;

var Feed = React.createClass({
  getInitialState: function () {
    return {
      loading: true,

      venues: []

      // purchase: {
      //   name: 'Lamborghini Murcielago', 
      //   created_at: '2015-06-16T17:47:43+12:00', 
      //   user: { name: 'captainbenis' }, 
      //   photo: 'murcielago.png', 
      //   store: {}
      // }
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    var url = 'https://api.foursquare.com/v2/venues/search?ll=-33.868,151.206&radius=200&intent=browse&client_id=LXSSV0Q43OEKKMRJIRX3RDGWYMEKSUZNUHJTF3UCBX5AQJUS&client_secret=JAZW3PATQJNWUIN5I4UDD52LDMJKG1HHWLGOI4VY34WHAXNN&v=20150616';

    this.setState({loading: true});

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

  onSetVenue: function (v) {
    this.setState({
      purchase: { venue: v }
    });
  },

  onNameChange: function (v) {
    var p = this.state.purchase;
    p.name = v;

    this.setState({ purchase: p });
  },

  onSave: function () {
    var x = new XMLHttpRequest();
    x.open('POST', 'http://localhost:3000/v1/purchases');
    x.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    x.send(JSON.stringify({ purchase: this.state.purchase }));
  },

  render: function () {
    var self = this;

    if (this.state.loading) {
      return (
        <ActivityIndicatorIOS />
      );
    } else if (!this.state.purchase) {
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
    } else {
      return (
        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <Text>
              Purchased at { this.state.purchase.venue.name }:
            </Text>

            <TextInput placeholder='Product name' onChangeText={this.onNameChange} style={styles.purchaseName} />

            <TouchableHighlight underlayColor='#ccc' onPress={self.onSave}>
              <View style={styles.saveButton}>
                <Text>Save!</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      );
    }
  }
});

var styles = StyleSheet.create({
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
    padding: 6,
  },
  saveButton: {
    padding: 10,
    backgroundColor: '#f0a',
    borderRadius: 4,
    fontSize: 16,
    margin: 20
  }
});

module.exports = Feed;

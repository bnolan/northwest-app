/* globals fetch, XMLHttpRequest, alert */

var React = require('react-native');
var storage = require('./storage');
var config = require('../config');
var PurchaseForm = require('./purchase-form');
var Camera = require('react-native-camera');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  ScrollView
} = React;

module.exports = React.createClass({
  displayName: 'PurchaseForm',

  getInitialState: function () {
    return {
      cameraType: Camera.constants.Type.back,
      purchase: {
        venue: this.props.venue,
        user: storage.getUser()
      }
    };
  },

  onNameChange: function (v) {
    var p = this.state.purchase;
    p.name = v;

    this.setState({ purchase: p });
  },

  onSave: function () {
    this.refs.cam.capture(function(err, data) {
      console.log(err, data);
    });

    return;

    storage.createPurchase(this.state.purchase)
      .then((response) => response.text())
      .then((responseText) => {
        var json = JSON.parse(responseText);

        if (json.error) {
          alert('Could not save: \n' + json.error);
        } else {
          alert('Yay it saved');
        }
      })
      .done();
  },

  render: function () {
    var p = this.state.purchase;

    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.description}>
            Purchased by&nbsp;
            <Text style={{fontWeight: 'bold' }}>{ p.user.username }</Text>
          </Text>
          <Text style={styles.address}>
            <Text style={{color: '#333'}}>{ p.venue.name }</Text>, { p.venue.address }
          </Text>

          <TextInput placeholder='Product name' onChangeText={this.onNameChange} style={styles.purchaseName} />

          <Camera
            ref='cam'
            style={styles.camera}
            onBarCodeRead={this._onBarCodeRead}
            type={this.state.cameraType} />

          <TouchableHighlight underlayColor='#ccc' onPress={this.onSave}>
            <View style={styles.saveButton}>
              <Text style={styles.buttonText}>Save Purchase</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  camera: {
    width: 160,
    height: 160
  },
  container: {
    padding: 20
  },
  bold: {
    fontWeight: 'bold',
    color: '#555'
  },
  address: {
    color: '#777',
    marginBottom: 12
  },
  description: {
    marginBottom: 4
  },
  venue: {
    marginBottom: 20
  },
  purchaseName: {
    height: 32,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#777',
    backgroundColor: 'white',
    flex: 1,
    padding: 6,
    marginBottom: 20
  },
  saveButton: {
    padding: 10,
    borderColor: '#777',
    borderRadius: 4,
    borderWidth: 2,
    fontSize: 16,
    flex: 1
  },
  buttonText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});


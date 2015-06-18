/* globals alert */

var React = require('react-native');
var Storage = require('./storage.js');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} = React;

var Settings = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      username: '',
      password: ''
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    this.setState(Storage.user);
  },

  onUsernameChange: function (event) {
    this.setState({ username: event.nativeEvent.text });
  },

  onEmailChange: function (event) {
    this.setState({ email: event.nativeEvent.text });
  },

  onPasswordChange: function (event) {
    this.setState({ password: event.nativeEvent.text });
  },

  register: function () {
    if (this.state.username === '') {
      alert('Not valid yo');
      return;
    }

    Storage.register(this.state).then((err) => {
      if (!err) {
        alert('You are registered');
      } else {
        alert('Unable to register:\n' + err);
      }
    });
  },

  render: function () {
    return (
      <View style={styles.settingsView}>
        <View>
          <Text>Login</Text>
          <Text>Register</Text>
        </View>

        <Text>Your username:</Text>
        <TextInput onChange={this.onUsernameChange} value={this.state.username} style={styles.textinput} />
        <Text>Your email:</Text>
        <TextInput keyboardType='email-address' onChange={this.onEmailChange} value={this.state.email} style={styles.textinput} />
        <Text>Your password:</Text>
        <TextInput onChange={this.onPasswordChange} value={this.state.password} style={styles.textinput} password={true} />

        <TouchableHighlight onPress={this.register}>
          <View style={styles.button}>
            <Text>Register</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  settingsView: {
    marginTop: 100
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#f0a',
    color: 'black',
    padding: 10
  },
  result: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  textinput: {
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

module.exports = Settings;

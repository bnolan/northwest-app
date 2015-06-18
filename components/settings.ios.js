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
      password: '',
      mode: 'register',
      loggedIn: Storage.isLoggedIn()
    };
  },

  componentDidMount: function () {
    this.fetchData();
  },

  fetchData: function () {
    if (Storage.isLoggedIn()) {
      this.setState({
        email: Storage.user.email,
        username: Storage.user.username,
        password: Storage.user.password
      });
    }
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

  onLogout: function () {
    Storage.logout();

    this.setState({
      email: '',
      username: '',
      password: '',
      loggedIn: false
    });
  },

  onRegister: function () {
    Storage.register(this.state).then((err) => {
      if (!err) {
        alert('You are registered');
        this.setState({loggedIn: true });
      } else {
        alert('Unable to register:\n' + err);
      }
    });
  },

  onLogin: function () {
    Storage.login(this.state).then((err) => {
      if (!err) {
        alert('You are logged in');
        this.setState({loggedIn: true });
      } else {
        alert('Unable to log in:\n' + err);
      }
    });
  },

  render: function () {
    if (this.state.loggedIn) {
      return (
        <View style={styles.settingsView}>
          <Text>Your username is {this.state.username}</Text>

          <TouchableHighlight onPress={this.onLogout}>
            <View style={styles.button}>
              <Text>Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else {
      var email;

      if (this.state.mode === 'register') {
        email = (
          <View>
            <Text>Your email:</Text>
            <TextInput keyboardType='email-address' onChange={this.onEmailChange} value={this.state.email} style={styles.textinput} />
          </View>
        );
      }

      return (
        <View style={styles.settingsView}>
          <View>
            <TouchableHighlight onPress={ () => this.setState({mode: 'login'}) } style={ [styles.tabButton, this.state.mode === 'login' ? styles.active : styles.inactive] }>
              <Text>Login</Text>
            </TouchableHighlight>

            <TouchableHighlight onPress={ () => this.setState({mode: 'register'}) } style={ [styles.tabButton, this.state.mode === 'register' ? styles.active : styles.inactive] }>
              <Text>Register</Text>
            </TouchableHighlight>
          </View>

          <Text>Your username:</Text>
          <TextInput onChange={this.onUsernameChange} value={this.state.username} style={styles.textinput} />

          { email }

          <Text>Your password:</Text>
          <TextInput onChange={this.onPasswordChange} value={this.state.password} style={styles.textinput} password={true} />

          <TouchableHighlight onPress={ this.state.mode === 'login' ? this.onLogin : this.onRegister }>
            <View style={styles.button}>
              <Text>{ this.state.mode }</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }
});

var styles = StyleSheet.create({
  settingsView: {
    marginTop: 30,
    padding: 30
  },
  tabButton: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: 10,
    marginTop: 10,
    width: 80
  },
  active: {
    backgroundColor: '#f0a',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#ccc',
    padding: 10,
    marginTop: 10,
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

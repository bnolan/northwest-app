var React = require('react-native');
var Feed = require('./components/feed.ios.js');
var NewPurchase = require('./components/new-purchase.js');
var Settings = require('./components/settings.ios.js');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  Image,
  ActivityIndicatorIOS
} = React;

var northwest = React.createClass({
  getInitialState: function () {
    return {
      selection: 'Welcome'
    };
  },

  onWelcome: function () {
    this.setState({selection: 'Welcome'});
  },

  onFeed: function () {
    this.setState({selection: 'Feed'});
  },

  onPost: function () {
    this.setState({selection: 'Post'});
  },

  onSettings: function () {
    this.setState({selection: 'Settings'});
  },

  render: function () {
    return (
       <TabBarIOS>
        <TabBarIOS.Item title='Willkomen' onPress={this.onWelcome} selected={this.state.selection === 'Welcome'}>
          <Image style={styles.image} source={{ uri: 'http://i.imgur.com/Kitv0Dc.png' }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Neuheiten' onPress={this.onFeed} selected={this.state.selection === 'Feed'}>
          <NavigatorIOS
            ref='nav'
            barTintColor='#ffde00'
            style={styles.wrapper}
            initialRoute={{ component: Feed, title: 'Trending Purchases' }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Gekauft' onPress={this.onPost} selected={this.state.selection === 'Post'}>
          <NewPurchase />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Konto' onPress={this.onSettings} selected={this.state.selection === 'Settings'}>
          <Settings />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  image: {
    flex: 1
  }
});

AppRegistry.registerComponent('northwest', () => northwest);

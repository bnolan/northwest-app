var React = require('react-native');
var Feed = require('./components/feed.ios.js');
var NewPurchase = require('./components/new-purchase.js');
var Settings = require('./components/settings.ios.js');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS
} = React;

var northwest = React.createClass({
  getInitialState: function () {
    return {
      selection: 'Feed'
    };
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
    var self = this;

    return (
       <TabBarIOS>
        <TabBarIOS.Item title='Feed' onPress={self.onFeed} selected={this.state.selection === 'Feed'}>
          <NavigatorIOS
            ref='nav'
            style={styles.wrapper}
            onPress={self.onFeed}
            initialRoute={{ component: Feed, title: 'Trending Purchases' }} />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Post' onPress={self.onPost} selected={this.state.selection === 'Post'}>
          <NewPurchase />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Settings' onPress={self.onSettings} selected={this.state.selection === 'Settings'}>
          <Settings />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

AppRegistry.registerComponent('northwest', () => northwest);

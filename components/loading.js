var React = require('react-native');

var {
  StyleSheet,
  ActivityIndicatorIOS,
  View,
  Image
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={styles.wrapper}>
        <Image resizeMode='stretch' style={styles.image} source={{ uri: 'http://i.imgur.com/IHBqC0R.png' }}>
          <ActivityIndicatorIOS style={styles.activity} />
        </Image>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  image: {
    flex: 1
  },
  activity: {
    marginTop: 240,
    backgroundColor: 'rgba(0,0,0,0)'
  }
});

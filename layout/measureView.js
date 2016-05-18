import React from "react";

import {
  AppRegistry,
  StyleSheet,

  Alert,
  TouchableOpacity,

  ScrollView,
  View,
  Text,
} from "react-native";

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  measureBoxView = () => {
    const { $box } = this.refs;

    $box.measureInWindow((x, y, width, height) => {
      console.log("box layout:", { x, y, width, height });
    });
  }

  renderToolbar() {
    return (
      <View style={jss.toolbar}>
        <TouchableOpacity style={jss.trigger}
          onPress={this.measureBoxView}
          >
          <Text>Measure</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={jss.container}>
        <ScrollView contentContainerStyle={jss.contentContainer}>
          <View ref="$box" style={[jss.box,jss.redBox]}/>

          <View style={jss.box}/>

          <View style={jss.box}/>

          <View style={jss.box}/>
        </ScrollView>

        {this.renderToolbar()}
      </View>

    );
  }
}

const jss = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },

  redBox: {
    backgroundColor: "red",
  },

  box: {
    width: 100,
    height: 100,
    marginTop: 200,
    marginBottom: 400,
    backgroundColor: "lightgray"
  },

  contentContainer: {
    alignItems: 'center',
  },

  toolbar: {
    position: 'absolute',
    bottom: 0,
    right: 0,

    flexDirection: 'row',
  },

  trigger: {
    padding: 10,
    marginLeft: 10,

    backgroundColor: 'lightgray',
  },
});

AppRegistry.registerComponent('SampleApp', () => App);

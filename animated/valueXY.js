import React from "react";

import {
  AppRegistry,
  StyleSheet,

  Animated,

  TouchableOpacity,

  View,
  Text,
} from "react-native";

import Easing from "Easing";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.animated = {
      position: new Animated.ValueXY({x: 0, y: 0}),
    };
  }

  animatePosition = () => {
    const { position } = this.animated;

    const animateLeft = Animated.timing(position, {
      toValue: {
        x: 300,
        y: 500,
      },
      duration: 300,
    }).start();
  }

  reset = () => {
    const { position } = this.animated;
    position.setValue({x: 0, y: 0});
  }

  renderToolbar() {
    return (
      <View style={jss.toolbar}>
        <TouchableOpacity style={jss.animateTrigger}
          onPress={this.animatePosition}
          >
          <Text>Animate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={jss.animateTrigger}
          onPress={this.reset}
          >
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { position } = this.animated;

    return (
      <View style={jss.container}>
        <Animated.View style={[
            jss.box,
            {
              transform: position.getTranslateTransform()
            }
          ]}
          />

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

  box: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 100,
    height: 100,
    backgroundColor: "red"
  },

  toolbar: {
    position: 'absolute',
    bottom: 0,
    right: 0,

    flexDirection: 'row',
  },

  animateTrigger: {
    padding: 10,
    marginLeft: 10,

    backgroundColor: 'lightgray',
  },
});

AppRegistry.registerComponent('SampleApp', () => App);

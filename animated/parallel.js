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
      left: new Animated.Value(0),
      top: new Animated.Value(0),
    }
  }

  animatePosition = () => {
    const { left, top } = this.animated;

    const animateLeft = Animated.timing(left, {
      toValue: 300,
      duration: 300,
    });

    const animateTop = Animated.timing(top, {
      toValue: 500,
      duration: 300,
    });

    Animated.parallel([animateLeft, animateTop])
      .start();
  }

  reset = () => {
    const { left, top } = this.animated;

    left.setValue(0);
    top.setValue(0);
  }

  onBoxLayout = (e) => {
    const { layout } = e.nativeEvent;
    console.log("box layout", layout);
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
    const { left, top } = this.animated;

    return (
      <View style={jss.container}>
        <Animated.View style={[
            jss.box,
            {
              transform: [
                {translateX: left},
                {translateY: top},
              ]
            }
          ]}
          onLayout={this.onBoxLayout}
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

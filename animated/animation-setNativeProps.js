import React from "react";

import {
  AppRegistry,
  StyleSheet,

  Animated,

  TouchableOpacity,

  View,
  Text,
} from "react-native";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.animated = {
      left: 0,
    };
  }

  fastUpdateView() {
    this.refs.box.setNativeProps({
      style: {left: this.animated.left }
    });
  }

  animateLeft = () => {
    if (this.animated.left >= 300) {
      return;
    }

    const dx = 16;
    this.animated.left += dx
    requestAnimationFrame(this.animateLeft);

    this.fastUpdateView();
  }

  reset = () => {
    this.animated.left = 0;
    this.fastUpdateView();
  }

  busywork() {
    let n = 100000000;
    while(n > 0) {
      n--;
    }
  }

  renderToolbar() {
    return (
      <View style={jss.toolbar}>
        <TouchableOpacity style={jss.animateTrigger}
          onPress={this.animateLeft}
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
    const { left } = this.animated;
    console.log("render");

    this.busywork();

    return (
      <View style={jss.container}>
        <View ref="box" style={[jss.box, {left}]}/>

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

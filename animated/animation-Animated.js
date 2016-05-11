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

import { DeviceEventEmitter } from 'react-native';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this._animated = {
      left: new Animated.Value(0)
    }

    this.state = {};
  }

  animateLeft = () => {
    const { left } = this._animated;

    Animated.timing(left, {
      toValue: 300,
      duration: 300,
      easing: Easing.linear,
    }).start();
  }

  reset = () => {
    const { left } = this._animated;

    left.setValue(0);
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
    const { left } = this._animated;



    return (
      <View style={[
        jss.container,
        ]}>

        <Animated.View style={[jss.box, {left}]}/>

        {/*
        <Animated.View style={[jss.box, {
          backgroundColor: 'blue',
          top: left,
        }]}/>
        */}


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

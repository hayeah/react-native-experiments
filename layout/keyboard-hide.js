import React from "react";

import {
  AppRegistry,
  StyleSheet,
  Platform,

  LayoutAnimation,

  View,
  TextInput,
} from "react-native";

import { DeviceEventEmitter } from 'react-native';

// https://github.com/Andr3wHur5t/react-native-keyboard-spacer/blob/master/KeyboardSpacer.js

// See: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02#.6nuhkkhnw
// keyboardWillShow doesn't work on Android.

const animationType = Platform.OS === "ios" ? LayoutAnimation.Types.keyboard : LayoutAnimation.Types.easeInEaseOut;
const keyboardEase = LayoutAnimation.create(250, animationType, LayoutAnimation.Properties.scaleXY)

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isKeyboardShown: false,
      keyboardHeight: 0,
    };
  }

  componentDidMount() {
    if (Platform.OS == "android") {
        this._listeners = [
            DeviceEventEmitter.addListener('keyboardDidShow', this.keyboardWillShow),
            DeviceEventEmitter.addListener('keyboardDidHide', this.keyboardWillHide)
        ];
    } else {
        this._listeners = [
            DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow),
            DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide)
        ];
    }
    // DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow)
    // DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide)
  }

  keyboardWillShow = (e) => {
    console.log("keyboard show");
    const keyboardHeight = e.endCoordinates.height;

    LayoutAnimation.configureNext(keyboardEase);

    // LayoutAnimation.easeInEaseOut();

    this.setState({ isKeyboardShown: true, keyboardHeight });
  }

  keyboardWillHide = (e) => {
    console.log("keyboard hide");

    LayoutAnimation.configureNext(keyboardEase);

    // LayoutAnimation.easeInEaseOut();

    this.setState({ isKeyboardShown: false, keyboardHeight: 0 });
  }

  render() {
    const { keyboardHeight } = this.state;

    return (
      <View style={[
        jss.container,
        { bottom: keyboardHeight },
        ]}>
        <TextInput style={jss.input}/>

        <View style={jss.bottomRightCorner}/>
      </View>
    );
  }
}

const jss = StyleSheet.create({
  container: {
    // flex: 1,
    // alignSelf: 'stretch',
    position: 'absolute',
    top: 0, bottom: 0,
    left: 0, right: 0,

    justifyContent: 'center',
  },

  input: {
    height: 60,
    paddingLeft: 15,
    // flex: 1,
    backgroundColor: "lightgray"
  },

  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
});

AppRegistry.registerComponent('SampleApp', () => App);

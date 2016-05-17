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
      opacity: new Animated.Value(1)
    };

    this.state = {
      isBoxHidden: false,
    };


  }

  animateFadeout = () => {
    const { opacity } = this.animated;

    Animated.spring(opacity, {
      toValue: 0,
    }).start(() => {
      this.setState({isBoxHidden: true});
    });
  }

  reset = () => {
    const { opacity } = this.animated;
    opacity.setValue(1);
    this.setState({isBoxHidden: false});
  }

  renderToolbar() {
    return (
      <View style={jss.toolbar}>
        <TouchableOpacity style={jss.animateTrigger}
          onPress={this.animateFadeout}
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
    const { opacity } = this.animated;
    const { isBoxHidden } = this.state;

    return (
      <View style={jss.container}>
        { !isBoxHidden &&

          <Animated.View style={[
              jss.box,
              { opacity }
            ]}/>
        }


        {this.renderToolbar()}
      </View>
    );
  }
}

const jss = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',

    alignItems: 'center',
    justifyContent: 'center',

  },

  box: {
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

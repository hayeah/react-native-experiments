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
      top: new Animated.Value(0)
    };

    this.state = {
      isBoxHidden: false,
    };

    this.animating = {
      hidingBox: false,
    };
  }

  animateFadeout = () => {
    const { top } = this.animated;

    Animated.spring(top, {
      toValue: 500,
    }).start(({finished}) => {
      if (finished) {
        this.setState({isBoxHidden: true});
      }
    });
  }

  animateFadein = () => {
    const { top } = this.animated;

    this.setState({isBoxHidden: false});

    Animated.spring(top, {
      toValue: 0,
    }).start();
  }

  toggleBoxHidden = () => {
    if (this.animating.hidingBox) {
      this.animating.hidingBox = false;
      this.animateFadein();
    } else {
      this.animating.hidingBox = true;
      this.animateFadeout();
    }
  }

  reset = () => {
    const { top } = this.animated;
    opacity.setValue(0);
    this.setState({isBoxHidden: false});
  }

  renderToolbar() {
    return (
      <View style={jss.toolbar}>
        <TouchableOpacity style={jss.animateTrigger}
          onPress={this.toggleBoxHidden}
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
    const { top } = this.animated;
    const { isBoxHidden } = this.state;

    return (
      <View style={jss.container}>
        { !isBoxHidden &&

          <Animated.View style={[
              jss.box,
              { transform: [{ translateY: top}] }
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

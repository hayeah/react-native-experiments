import React from "react";

import {
  AppRegistry,
  StyleSheet,
  Platform,

  Dimensions,
  Animated,

  View,
  Text,
  TouchableOpacity,
} from "react-native";



import { Surface, Path, Shape } from "ReactNativeART";

const windowSize = Dimensions.get("window");

export class App extends React.Component {
  constructor(props) {
    super(props);

    const opacity = new Animated.Value(0);

    this._animationTick = 0;
    this._animationValues = [];
    opacity.addListener(e => {
      this._animationTick++;
      this._animationValues.push(e.value);
      console.log("animation tick", this._animationTick, e);
    });

    this._animated = {
      opacity,
    };

    this.state = {
      animationValues: [],
    };

    this._busy = false;
  }

  toggleBusy = () => {
    if(this._busy === true) {
      this._busy = false;
      return;
    }

    this._busy = true;

    const busyLoop = () => {
      requestAnimationFrame(() => {
        let n = 10000000 * 3;
        while(n > 0) {
          // console.log("busy busy busy");
          n--;
        }

        if(this._busy === true) {
          busyLoop();
        }
      });
    }

    busyLoop();
  }

  componentWillUnmount() {
    this._busy = false;
  }

  doSpring = () => {
    const { opacity } = this._animated;

    // Go back to 0
    opacity.setValue(0);
    this._animationTick = 0;
    this._animationValues = [];

    // Spring to 1
    Animated.spring(opacity, {
      toValue: windowSize.width - 100,
    }).start(() => {
      console.log("spring finished");
      this.setState({ animationValues: this._animationValues });
    });
  }

  componentDidMount() {
  }

  render() {
    const { animationValues } = this.state;
    const line = Path().moveTo(0,0);

    if(animationValues) {
      const dx = windowSize.width / animationValues.length;

      let x = 0;
      animationValues.forEach(v => {
        const y = v;
        line.lineTo(x, y);
        x += dx;
      });
    }

    return (
      <View style={[
        jss.container,
        ]}>

        <View style={jss.contentContainer}>
          <TouchableOpacity onPress={this.doSpring}>
            <Text style={jss.buttonLabel}>spring</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.toggleBusy}>
            <Text style={jss.buttonLabel}>toggle busy</Text>
          </TouchableOpacity>

          <Animated.View style={[
            jss.box,
            { left: this._animated.opacity },
            ]}/>
        </View>


        <View style={jss.canvas}>
          <Surface height={windowSize.height/2} width={windowSize.width}>
            <Shape d={line} stroke="#000"/>
          </Surface>

          <View style={jss.graphStats}>
            <Text>{animationValues.length} data points</Text>
          </View>


        </View>
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
  },

  box: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 100,
    height: 100,

    backgroundColor: 'red',
  },

  buttonLabel: {
    padding: 10,
    color: 'blue',
  },

  contentContainer: {
    flex: 1,
    paddingTop: 20,
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },

  canvas: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  graphStats: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 5,
  },
});

AppRegistry.registerComponent('SampleApp', () => App);

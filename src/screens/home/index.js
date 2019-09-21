import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import MQTTClient from './mqtt';
import { LinearGradient } from 'expo'
import IconStandBy from "../../assets/standby.png";
import IconTriangle from "../../assets/triangulo.png";
import IconCircle from "../../assets/circulo.png";
import IconZigZag from "../../assets/zigzag.png";
import IconLight from "../../assets/luz.png";
import IconSquare from "../../assets/cuadrado.png";
import IconLogo from "../../assets/logo.png";
import {
  OPTIONS,
  SCREENS,
  NUMBER_OF_COLUMNS
} from "../../config/constants";
import { colors, commonStyles } from "../../config/styles";

const images = [
  IconStandBy,
  IconTriangle,
  IconCircle,
  IconZigZag,
  IconLight,
  IconSquare
];
const options = [
  OPTIONS.STANDBY,
  OPTIONS.TRIANGLE,
  OPTIONS.CIRCLE,
  OPTIONS.ZIGZAG,
  OPTIONS.LIGHT,
  OPTIONS.SQUARE
];
const optionsValues = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8
];

export default class Home extends Component {
  static navigationOptions = {
    title: SCREENS.HOME,
    headerLeft: null
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      visible: false
    };
  }

  componentDidMount() {
    let items = Array.apply(null, Array(6)).map((v, i) => {
      return {
        id: i,
        src: images[i],
        option: options[i],
        optionValue: optionsValues[i]
      };
    });
    this.setState({
      dataSource: items
    });
  }

  _onBluetoothPressed() {
    this.setState({ visible: true })
  }


  _onOptionPressed = async value => {
    MQTTClient([value[0]]);
    ToastAndroid.show(value[1], ToastAndroid.SHORT);
  };

  render() {
    const spinner = this.state.isLoading ? (
      <ActivityIndicator size="large" />
    ) : null;

    return (
      <LinearGradient
        colors={['#FEC485', '#D3EF8B']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                onPress={() => this._onOptionPressed([item.optionValue, item.option])}
              >
                <Image style={styles.imageThumbnail} source={item.src} />
                <Text style={styles.optionText}>
                  {item.option}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          numColumns={NUMBER_OF_COLUMNS}
          keyExtractor={(item, index) => index}
        />
        <Image
          style={{ width: 100, height: 100, alignSelf: "center" }}
          source={IconLogo}
        >
        </Image>
        <Text style={styles.optionText}>Tracker</Text>
        {spinner}
      </LinearGradient>


    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {
    alignItems: "center",
    backgroundColor: colors.purewhite,
    justifyContent: "center",
    height: "80%",
    width: "100%"
  },
  buttonContainer: commonStyles.buttonContainer,
  buttonText: commonStyles.buttonText,
  mainContainer: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    paddingTop: 30
  },
  optionContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
    paddingTop: 10
  },
  imageThumbnail: {
    alignItems: "center",
    borderColor: colors.black,
    borderRadius: 8,
    borderWidth: 5,
    height: 100,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 100
  },
  optionText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  }
});

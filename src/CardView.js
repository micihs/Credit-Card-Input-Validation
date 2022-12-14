import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ImageBackground, Image, Text, StyleSheet, Platform } from "react-native";

import defaultIcons from "../assets/icons";
import FlipCard from "react-native-flip-card";

const BASE_SIZE = {width: 300, height: 190};

export default class CardView extends Component {
    static propTypes = {
        focused: PropTypes.string,
    
        brand: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
        expiry: PropTypes.string,
        cvc: PropTypes.string,
        placeholder: PropTypes.object,
    
        scale: PropTypes.number,
        fontFamily: PropTypes.string,
        imageFront: PropTypes.number,
        imageBack: PropTypes.number,
        customIcons: PropTypes.object,
    };

    static defaultProps = {
        name: "",
        placeholder: {
          number: "•••• •••• •••• ••••",
          name: "FULL NAME",
          expiry: "••/••",
          cvc: "•••",
        },
        scale: 1,
        fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
        imageFront: require("../assets/card-front.png"),
        imageBack: require("../assets/card-back.png"),
    };

    render() {
        const { focused,
          brand, name, number, expiry, cvc, customIcons,
          placeholder, imageFront, imageBack, scale, fontFamily } = this.props;
    
        const Icons = { ...defaultIcons, ...customIcons };
        const isAmex = brand === "amex";
        const shouldFlip = !isAmex && focused === "cvc";
    
        const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale };
        const transform = { transform: [
          { scale },
          { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
        ] };
    
        return (
          <View style={[styles.cardContainer, containerSize]}>
            <FlipCard style={{ borderWidth: 0 }}
              flipHorizontal
              flipVertical={false}
              friction={10}
              perspective={2000}
              clickable={false}
              flip={shouldFlip}>
              <ImageBackground style={[BASE_SIZE, styles.cardFace, transform]}
                source={imageFront}>
                  <Image style={[styles.icon]}
                    source={Icons[brand]} />
                  <Text style={[styles.baseText, { fontFamily }, styles.number, !number && styles.placeholder, focused === "number" && styles.focused]}>
                    { !number ? placeholder.number : number }
                  </Text>
                  <Text style={[styles.baseText, { fontFamily }, styles.name, !name && styles.placeholder, focused === "name" && styles.focused]}
                    numberOfLines={1}>
                    { !name ? placeholder.name : name.toUpperCase() }
                  </Text>
                  <Text style={[styles.baseText, { fontFamily }, styles.expiryLabel, styles.placeholder, focused === "expiry" && styles.focused]}>
                    MONTH/YEAR
                  </Text>
                  <Text style={[styles.baseText, { fontFamily }, styles.expiry, !expiry && styles.placeholder, focused === "expiry" && styles.focused]}>
                    { !expiry ? placeholder.expiry : expiry }
                  </Text>
                  { isAmex &&
                      <Text style={[styles.baseText, { fontFamily }, styles.amexCVC, !cvc && styles.placeholder, focused === "cvc" && styles.focused]}>
                        { !cvc ? placeholder.cvc : cvc }
                      </Text> }
              </ImageBackground>
              <ImageBackground style={[BASE_SIZE, styles.cardFace, transform]}
                source={imageBack}>
                  <Text style={[styles.baseText, styles.cvc, !cvc && styles.placeholder, focused === "cvc" && styles.focused]}>
                    { !cvc ? placeholder.cvc : cvc }
                  </Text>
              </ImageBackground>
            </FlipCard>
          </View>
        );
    }
    
};



const styles = StyleSheet.create({
    cardContainer: {},
    cardFace: {},
    icon: {
      position: "absolute",
      top: 15,
      right: 15,
      width: 60,
      height: 40,
      resizeMode: "contain",
    },
    baseText: {
      color: "rgba(255, 255, 255, 0.8)",
      backgroundColor: "transparent",
    },
    placeholder: {
      color: "rgba(255, 255, 255, 0.5)",
    },
    focused: {
      fontWeight: "bold",
      color: "rgba(255, 255, 255, 1)",
    },
    number: {
      fontSize: 21,
      position: "absolute",
      top: 95,
      left: 28,
    },
    name: {
      fontSize: 16,
      position: "absolute",
      bottom: 20,
      left: 25,
      right: 100,
    },
    expiryLabel: {
      fontSize: 9,
      position: "absolute",
      bottom: 40,
      left: 218,
    },
    expiry: {
      fontSize: 16,
      position: "absolute",
      bottom: 20,
      left: 220,
    },
    amexCVC: {
      fontSize: 16,
      position: "absolute",
      top: 73,
      right: 30,
    },
    cvc: {
      fontSize: 16,
      position: "absolute",
      top: 80,
      right: 30,
    },
});
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import LottieView from 'lottie-react-native';

function HowToPlayScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <Background>
        {/* Header Section */}
        <Header title="Play" navigation={navigation} />

        {/* Cloud-like Design */}
        <View style={styles.cloud}>
          <FastImage source={require('../assets/images/cloud2.png')} style={styles.cloudImage} resizeMode="contain" >
            <Text style={styles.cloudText}>Let's Play!</Text>
          </FastImage>
        </View>

        {/* Center Content Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { columnGap: 15, paddingLeft: 10, }]} onPress={() => navigation.navigate('LetsLearnScreen')}>
            <LottieView autoPlay loop={false} source={require('../assets/lottie/learn.json')} style={{ width: 50, height: 50 }} />
            <Text style={styles.buttonText}>Let's Learn </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: common.color.secondary, columnGap: 0, paddingLeft: 0, }]} onPress={() => navigation.navigate('WackWordArtScreen')}>
            <LottieView autoPlay loop={false} source={require('../assets/lottie/spin.json')} style={{ width: 50, height: 50 }} />
            <Text style={styles.buttonText}>Wackey Word Wheel </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FillInTheBlankScreen')}>
            <LottieView autoPlay loop={false} source={require('../assets/lottie/fillTheBlank.json')} style={{ width: 50, height: 50 }} />
            <Text style={styles.buttonText}>Fill in the blank </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: common.color.secondary }]} onPress={() => navigation.navigate('MakeYourOwnScreen')}>
            <LottieView autoPlay loop={false} source={require('../assets/lottie/makeOwn.json')} style={{ width: 60, height: 70 }} />
            <Text style={styles.buttonText}>Make Your Own </Text>
          </TouchableOpacity>
        </View>
        <FastImage source={require("../assets/images/zebra_left.png")} style={styles.zebraImage} />
      </Background>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cloud: {
    paddingVertical: 20,
    marginBottom: 10,
  },
  cloudImage: {
    width: 320,
    height: 180,
    resizeMode: 'contain',
    zIndex: 1,
    alignSelf:'flex-end'

  },
  cloudText: {
    fontSize: 17,
    fontFamily: common.font.primary,
    width: '50%',
    textAlign: 'center',
    color: common.color.secondary,
    position: 'absolute',
    top: 50,
    left: 85,
  },

  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    width: '65%',
    height: 50,
    backgroundColor: common.color.primary,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    ...common.style.border
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: common.font.primary,
  },
  zebraImage: {
    position: 'absolute',
    left: -10,
    bottom: "50%",
    width: 150,
    height: 180,
    transform: [{ rotate: "45deg" }, { scaleX: -1 }],
  },
});

export default HowToPlayScreen;

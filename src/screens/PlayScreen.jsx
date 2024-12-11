import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';

function PlayScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Section */}
      <Header title="Play" navigation={navigation} secondIcon="emoji-objects" secondIconPress={() => navigation.navigate('HowToPlayScreen')} />

      <Background>
        <View style={styles.centerContent}>
          <View style={styles.cloud}>
            <FastImage
              source={require('../assets/images/cloud1.png')} // Replace with your cloud image
              style={styles.cloudImage}
              resizeMode="contain"
            >
              <Text style={styles.cloudText}> let's play!</Text>
            </FastImage>
          </View>

          <View style={styles.contentWrapper}>

            {/* Buttons */}
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LetsLearnScreen')}>
                <Text style={styles.buttonText}> Let's Learn </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('WackWordArtScreen')}>
                <Text style={styles.buttonText}> Wackey Word Wheel </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FillInTheBlankScreen')}>
                <Text style={styles.buttonText}> ― Fill in the blank </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MakeYourOwnScreen')}>
                <Text style={styles.buttonText}> ✍🏻 Make Your Own </Text>
              </TouchableOpacity>
            </View>

            {/* Zebra Image */}
            <FastImage
              source={common.Zebra} // Replace with your zebra image
              style={styles.zebraImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Background>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Center content styles
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cloud: {
    padding: 20,
    marginBottom: 10,
  },
  cloudImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    left: 70,
    alignSelf: 'flex-start',
    transform: [{ rotateY: '180deg' }]
  },
  cloudText: {
    fontSize: 19,
    width: '50%',
    textAlign: 'center',
    color: common.color.secondary,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left: 55,
    transform: [{ rotateY: '180deg' }]
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonColumn: {
    flex: 1,
  },
  button: {
    width: '65%',
    height: 50,
    backgroundColor: common.color.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  button1: {
    width: '65%',
    height: 50,
    backgroundColor: common.color.secondary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  zebraImage: {
    width: 280,
    height: 280,
    position: 'absolute',
    left: -80,
    bottom: 20,
    transform: [{ rotateY: '180deg' }]
  }
});

export default PlayScreen
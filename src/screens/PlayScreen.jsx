import Icon from 'react-native-vector-icons/MaterialIcons';

import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function PlayScreen({ navigation }) {
  const insets= useSafeAreaInsets();
  return (
    <View style={[styles.container,{ paddingTop: insets.top}]}>
    <ImageBackground source={require('../assets/images/bg1.png')} style={styles.backgroundImage}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
          <Icon name="arrow-back" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Play </Text>
        <TouchableOpacity onPress={() => navigation.navigate('HowToPlayScreen')}>
        <Icon name="emoji-objects" size={40} color="#f18927" style={styles.bulbIcon} />
        </TouchableOpacity>
      </View>

      {/* Center Content Section */}
      <View style={styles.centerContent}>
        {/* Cloud-like Design */}
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
            source={require('../assets/images/zebraY.png')} // Replace with your zebra image
            style={styles.zebraImage}
            resizeMode="contain"
          />
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#f18927',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#04acb8',
    fontWeight: 'bold',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: '#d8d6d6',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    letterSpacing: 1,
  },
  bulbIcon: {
    marginLeft: 5,
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
  cloudContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cloudImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    left:70,
    alignSelf: 'flex-start',
    transform:[{rotateY:'180deg'}]
  },
  cloudText: {
    fontSize: 19,
    width: '50%',
    textAlign: 'center',
    color: '#058c96',
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left: 55,
    transform:[{rotateY:'180deg'}]
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonColumn: {
    flex: 1,
    // marginRight: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    width: '65%',
    height: 50,
    backgroundColor: '#f18927',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  button1: {
    width: '65%',
    height: 50,
    backgroundColor: '#04acb8',
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
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  zebraImage: {
    width: 280,
    height: 280,
    position: 'absolute',
    left: -80,
    bottom: 20,
    transform:[{rotateY:'180deg'}]
  },
  // Advertisement section styles
  adContainer: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  adText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 5,
  },
  adImage: {
    width: 300,
    height: 60,
  },
});

export default PlayScreen
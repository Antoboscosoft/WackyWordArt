// import Icon from '@react-native-vector-icons/material-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
// import { Text, View } from 'react-native-reanimated/lib/typescript/Animated'

function PlayScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Play </Text>
        <Icon name="emoji-objects" size={35} color="#FF69B4" style={styles.bulbIcon} />
      </View>

      {/* Center Content Section */}
      <View style={styles.centerContent}>
        {/* Cloud-like Design */}
        <View style={styles.cloud}>
          <FastImage
            source={require('../assets/images/Cloud.png')} // Replace with your cloud image
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WackWordArtScreen')}>
              <Text style={styles.buttonText}> Wackey Word Wheel </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FillInTheBlankScreen')}>
              <Text style={styles.buttonText}> ― Fill in the blank </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MakeYourOwnScreen')}>
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

      {/* Advertisement Section */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement</Text>
        <FastImage
          source={{ uri: 'https://via.placeholder.com/300x100' }} // Replace with your ad image or SDK
          style={styles.adImage}
          resizeMode="contain"
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeedd',
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    marginBottom: 20,
  },
  cloudContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cloudImage: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
    right: 10,
    alignSelf: 'flex-start',
  },
  cloudText: {
    fontSize: 16,
    width: '50%',
    textAlign: 'center',
    color: '#555',
    fontWeight: 'bold',
    position: 'absolute',
    top: 70,
    left: 75
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
    backgroundColor: '#3b9a67',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zebraImage: {
    width: 280,
    height: 280,
    position: 'absolute',
    left: -80,
    bottom: 20,
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
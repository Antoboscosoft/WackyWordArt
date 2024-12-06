import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
// import { Text, View } from 'react-native-reanimated/lib/typescript/Animated'
import Toast from 'react-native-simple-toast';
import PageIcon from 'react-native-vector-icons/SimpleLineIcons';


function GameScreen({ navigation }) {

  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => setScore(score + 1);

  const click = () => {
    Toast.showWithGravity('Click on zebra to increase your count', Toast.SHORT, Toast.BOTTOM);

  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <PageIcon name="menu" size={28} color="#3b5a9a" />
            {/* <Icon name="arrow-back" size={24} color="#333" /> */}
          </View>
          {/* <PageIcon name="arrow-left" size={24} color="#FF69B4" /> */}
        </TouchableOpacity>
        <Text style={styles.headerText}>
          How to Play
          {/* <Icon name="emoji-objects" size={22} color="#FF69B4" style={styles.bulbIcon} /> */}
        </Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      {/* Center Content Section */}
      <View style={styles.centerContent}>
        {/* Cloud-like Design */}
        <View style={styles.cloud}>
        <FastImage
          source={require('../images/Cloud.png')}
          style={styles.cloudImage}
          resizeMode="contain"
        />
          <Text style={styles.cloudText}>CLick on the game to learn how to play!</Text>
        </View>

        {/* Four Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> 🕮 Let's Learn </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Wackey Word Wheel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> ― Fill in the blank </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}> ✍🏻 Make Your Own </Text>
          </TouchableOpacity>
        </View>


        {/* Zebra Image */}
        <FastImage
          source={require('../images/zebrabg.png')}
          style={styles.zebraImage}
          resizeMode="contain"
        />
      </View>

      {/* Advertisement section */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Advertisement</Text>
        {/* Placeholder for an ad image or component */}
        <FastImage
          style={styles.adImage}
          source={{ uri: 'https://via.placeholder.com/300x100' }} // Replace with your ad image or SDK component
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeedd', //'#fff',
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffeedd', //'#f2f2f2',
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddd', //'#f2f2f2',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
  },
  bulbIcon: {
    marginLeft: 5,
  },

  // Center content styles
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
  },
  cloud: {
    width: '80%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  cloudImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,

    // width: 280,
    //     height: 250,
    //     resizeMode: 'contain',
    //     position: 'absolute',
    //     marginLeft: 10,
    //     right: -50
  },
  cloudText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#3b9a67',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zebraImage: {
    width: 180,
    height: 180,
    position: 'absolute',
    right: 10,
    bottom: 20,
  },

  // Advertisement styles
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
    color: '#de0000',
    marginBottom: 5,
  },
  adImage: {
    width: 300,
    height: 45,
  },
})


export default GameScreen
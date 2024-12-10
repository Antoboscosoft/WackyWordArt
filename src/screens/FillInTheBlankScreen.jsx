import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function FillInTheBlankScreen({ navigation }) {

  const [place, setPlace] = useState('');
  const [adjective, setAdjective] = useState('');
  const [friendOrPet, setFriendOrPet] = useState('');
  const [noun, setNoun] = useState('');
  const [verb, setVerb] = useState('');
  const [thing, setThing] = useState('');
  const [weatherAdjective, setWeatherAdjective] = useState('');
  const insets= useSafeAreaInsets();
  return (
    <View style={[styles.container,{ paddingTop: insets.top}]}>
      <ImageBackground source={require('../assets/images/bg1.png')} style={styles.backgroundImage}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Fill in the Blank </Text>
        <Ionicons name="arrow-back" size={24} color="white" style={styles.bulbIcon} />
      </View>

      {/* Center Content Section */}
      <View style={styles.content}>
        <View style={styles.sentenceRow}>
          {/* Buttons */}
          <Text style={styles.sentenceText}>On a sunny afternoon, I walked to the</Text>
          <TextInput
            style={styles.input}
            placeholder="place"
            placeholderTextColor={'#fdd0a7'}
            value={place}
            onChangeText={setPlace}
          />
          <Text style={styles.sentenceText}> with my </Text>
          <TextInput
            style={styles.input}
            placeholder="adjective"
            placeholderTextColor={'#fdd0a7'}
            value={adjective}
            onChangeText={setAdjective}
          />
          <Text style={styles.sentenceText}> </Text>
          <TextInput style={styles.input} placeholder="friend or pet" placeholderTextColor={'#fdd0a7'} value={friendOrPet} onChangeText={setFriendOrPet}
          />
          <Text style={styles.sentenceText}> , carrying a </Text>
          <TextInput
            style={styles.input}
            placeholder="noun"
            placeholderTextColor={'#fdd0a7'}
            value={noun}
            onChangeText={setNoun}
          />
          <Text style={styles.sentenceText}> , and we decided to </Text>
          <TextInput
            style={styles.input}
            placeholder="verb"
            placeholderTextColor={'#fdd0a7'}
            value={verb}
            onChangeText={setVerb}
          />
          <Text style={styles.sentenceText}> near the </Text>
          <TextInput
            style={styles.input}
            placeholder="thing"
            placeholderTextColor={'#fdd0a7'}
            value={thing}
            onChangeText={setThing}
          />
          <Text style={styles.sentenceText}> , enjoying the </Text>
          <TextInput
            style={styles.input}
            placeholder="adjective"
            placeholderTextColor={'#fdd0a7'}
            value={weatherAdjective}
            onChangeText={setWeatherAdjective}
          />
          <Text style={styles.sentenceText}> weather. </Text>
        </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default FillInTheBlankScreen


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
  bulbIcon: {
    marginLeft: 10,
    opacity:0
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

  // Content styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  sentenceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#04acb8',
    marginRight: 5,
  },
  input: {
      borderBottomWidth: 1,
    borderColor: '#f18927',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#f18927',
    minWidth: 10,
    maxWidth: 120,
    textAlign: 'left',
  }
});


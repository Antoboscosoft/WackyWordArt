import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';

function FillInTheBlankScreen({ navigation }) {
  const [value, setValue] = useState(null);

  const [place, setPlace] = useState('');
  const [adjective, setAdjective] = useState('');
  const [friendOrPet, setFriendOrPet] = useState('');
  const [noun, setNoun] = useState('');
  const [verb, setVerb] = useState('');
  const [thing, setThing] = useState('');
  const [weatherAdjective, setWeatherAdjective] = useState('');

  const data = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Fill in the Blank </Text>
      </View>

      {/* Center Content Section */}
      <View style={styles.content}>
        <View style={styles.sentenceRow}>
          {/* Buttons */}
          <Text style={styles.sentenceText}>
            On a sunny afternoon, I walked to the
          </Text>
          <TextInput
            style={styles.input}
            placeholder="place"
            placeholderTextColor={'#ccc'}
            value={place}
            onChangeText={setPlace}
          />
          <Text style={styles.sentenceText}> with my </Text>
          <TextInput
            style={styles.input}
            placeholder="adjective"
            placeholderTextColor={'#ccc'}
            value={adjective}
            onChangeText={setAdjective}
          />
          <Text style={styles.sentenceText}> </Text>
          <TextInput
            style={styles.input}
            placeholder="friend or pet"
            placeholderTextColor={'#ccc'}
            value={friendOrPet}
            onChangeText={setFriendOrPet}
          />
          <Text style={styles.sentenceText}> , carrying a </Text>
          <TextInput
            style={styles.input}
            placeholder="noun"
            placeholderTextColor={'#ccc'}
            value={noun}
            onChangeText={setNoun}
          />
          <Text style={styles.sentenceText}> , and we decided to </Text>
          <TextInput
            style={styles.input}
            placeholder="verb"
            placeholderTextColor={'#ccc'}
            value={verb}
            onChangeText={setVerb}
          />
          <Text style={styles.sentenceText}> near the </Text>
          <TextInput
            style={styles.input}
            placeholder="thing"
            placeholderTextColor={'#ccc'}
            value={thing}
            onChangeText={setThing}
          />
          <Text style={styles.sentenceText}> , enjoying the </Text>
          <TextInput
            style={styles.input}
            placeholder="adjective"
            placeholderTextColor={'#ccc'}
            value={weatherAdjective}
            onChangeText={setWeatherAdjective}
          />
          <Text style={styles.sentenceText}> weather. </Text>
        </View>

        {/* On a sunny afternoon, I walked to the ____________(palce) with 
              my _________[adjective] ___________[friend or pet], carrying a ________[noun], and we decided to _______[verb]
              near the _________[thing], enjoying the [adjective] weather.  */}
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

export default FillInTheBlankScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeedd',
  },

  // Header styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    gap: 100,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Content styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  sentenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  input: {
      borderBottomWidth: 1,
    borderColor: '#bbb',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
    minWidth: 10,
    maxWidth: 120,
    textAlign: 'left',
  },
  dropdown: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: '#aaa',
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
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


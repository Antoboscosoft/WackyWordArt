import React from 'react'
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';

function FillInTheBlankScreen({ navigation }) {

  const [place, setPlace] = useState('');
  const [adjective, setAdjective] = useState('');
  const [friendOrPet, setFriendOrPet] = useState('');
  const [noun, setNoun] = useState('');
  const [verb, setVerb] = useState('');
  const [thing, setThing] = useState('');
  const [weatherAdjective, setWeatherAdjective] = useState('');
  return (
    <View style={styles.container}>
      <Background>
        {/* Header Section */}
      <Header title="Fill in the Blank" navigation={navigation} />
        {/* Center Content Section */}
        <View style={styles.content}>
          <View style={styles.sentenceRow}>
            {/* Buttons */}
            <Text style={styles.sentenceText}>On a sunny afternoon, I walked to the
            <TextInput
              style={styles.input}
              placeholder="place"
              placeholderTextColor={'#fdd0a7'}
              value={place}
              onChangeText={setPlace}
            />
            with my 
            <TextInput
              style={styles.input}
              placeholder="adjective"
              placeholderTextColor={'#fdd0a7'}
              value={adjective}
              onChangeText={setAdjective}
            />
            <TextInput style={styles.input} placeholder="friend or pet" placeholderTextColor={'#fdd0a7'} value={friendOrPet} onChangeText={setFriendOrPet}
            />
             , carrying a 
            <TextInput
              style={styles.input}
              placeholder="noun"
              placeholderTextColor={'#fdd0a7'}
              value={noun}
              onChangeText={setNoun}
            />
             , and we decided to 
            <TextInput
              style={styles.input}
              placeholder="verb"
              placeholderTextColor={'#fdd0a7'}
              value={verb}
              onChangeText={setVerb}
            />
             near the 
            <TextInput
              style={styles.input}
              placeholder="thing"
              placeholderTextColor={'#fdd0a7'}
              value={thing}
              onChangeText={setThing}
            />
             , enjoying the 
            <TextInput
              style={styles.input}
              placeholder="adjective"
              placeholderTextColor={'#fdd0a7'}
              value={weatherAdjective}
              onChangeText={setWeatherAdjective}
            />
             weather. </Text>
          </View>
        </View>
      </Background>
    </View>
  )
}

export default FillInTheBlankScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    columnGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  sentenceText: {
    fontSize: common.style.phraseSize,
    color: common.color.secondary,
    fontFamily: common.font.primary,
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: common.color.primary,
    fontSize: 20,
    fontFamily: common.font.primary,
    color: common.color.primary,
    // minWidth: 50,
    // maxWidth: 1000,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: -20
  }
});


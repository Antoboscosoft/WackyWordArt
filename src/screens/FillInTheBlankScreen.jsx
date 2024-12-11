import React from 'react'
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header Section */}
      <Header title="Fill in the Blank" navigation={navigation} />

      <Background>
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
      </Background>
    </View>
  )
}

export default FillInTheBlankScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: common.color.secondary,
    marginRight: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: common.color.primary,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    color: common.color.primary,
    minWidth: 10,
    maxWidth: 120,
    textAlign: 'left',
  }
});


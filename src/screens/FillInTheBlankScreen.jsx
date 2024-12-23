import React, { useEffect, useRef } from 'react'
import { Animated, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import { FadeAnime } from '../components/Animations';
import { useIsFocused } from '@react-navigation/native';

function FillInTheBlankScreen({ navigation }) {

  const [place, setPlace] = useState('');
  const [adjective, setAdjective] = useState('');
  const [friendOrPet, setFriendOrPet] = useState('');
  const [noun, setNoun] = useState('');
  const [verb, setVerb] = useState('');
  const [thing, setThing] = useState('');
  const [weatherAdjective, setWeatherAdjective] = useState('');
  const isFocused=useIsFocused();
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if(isFocused){
      scaleValue.setValue(0);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(); 
    }
  }, [isFocused]);

  const placeHolderColor= "'#cdcdcd'";
  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          {/* Header Section */}
          <Header title="Fill in the Blank" navigation={navigation} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
            {/* Center Content Section */}
            <View style={styles.content}>
              <View style={styles.sentenceRow}>
                {/* Buttons */}
                <Text style={styles.sentenceText}>On a sunny afternoon, I walked to the
                  <TextInput
                    style={styles.input}
                    placeholder="place"
                    placeholderTextColor={placeHolderColor}
                    value={place}
                    onChangeText={setPlace}
                  />
                  with my
                  <TextInput
                    style={styles.input}
                    placeholder="adjective"
                    placeholderTextColor={placeHolderColor}
                    value={adjective}
                    onChangeText={setAdjective}
                  />
                  <TextInput style={styles.input} placeholder="friend or pet" placeholderTextColor={placeHolderColor} value={friendOrPet} onChangeText={setFriendOrPet}
                  />
                  , carrying a
                  <TextInput
                    style={styles.input}
                    placeholder="noun"
                    placeholderTextColor={placeHolderColor}
                    value={noun}
                    onChangeText={setNoun}
                  />
                  , and we decided to
                  <TextInput
                    style={styles.input}
                    placeholder="verb"
                    placeholderTextColor={placeHolderColor}
                    value={verb}
                    onChangeText={setVerb}
                  />
                  near the
                  <TextInput
                    style={styles.input}
                    placeholder="thing"
                    placeholderTextColor={placeHolderColor}
                    value={thing}
                    onChangeText={setThing}
                  />
                  , enjoying the
                  <TextInput
                    style={styles.input}
                    placeholder="adjective"
                    placeholderTextColor={placeHolderColor}
                    value={weatherAdjective}
                    onChangeText={setWeatherAdjective}
                  />
                  weather. </Text>
              </View>
            </View>
          </ScrollView>
        </Background>
        <Animated.Image source={require('../assets/images/fill.png')} style={[styles.zebraImage,{transform: [{ scale: scaleValue }]}]} resizeMode='contain' />
      </FadeAnime>
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
    marginBottom: 50
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
    // color: common.color.secondary,
    fontFamily: common.font.primary,
    marginHorizontal: 20,
    letterSpacing: 1,
    lineHeight: 35
  },
  input: {
    borderBottomWidth: 1,
    borderColor: common.color.primary,
    fontSize: 18,
    fontFamily: common.font.primary,
    color: common.color.primary,
    // minWidth: 50,
    // maxWidth: 1000,
    // textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: -20
  },
  zebraImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 220,
    resizeMode: 'contain',
  },
});


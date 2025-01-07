import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Button, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
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
  const isFocused = useIsFocused();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [submittedSentence, setSubmittedSentence] = useState();
  const [isEditing, setIsEditing] = useState(true);

  const isValue = place.trim() !== '' || adjective.trim() !== '' || friendOrPet.trim() !== '' || noun.trim() !== '' || verb.trim() !== '' || thing.trim() !== '' || weatherAdjective.trim() !== '';

  useEffect(() => {
    if (isFocused) {
      scaleValue.setValue(0);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  const placeHolderColor = "'#cdcdcd'";

  const handleSubmit = useCallback(() => {
    // Helper function to format values
    const formatValue = (value) => 
    // {
    //   return value && value.trim() !== '' ? `<span style="text-decoration: underline;">${value}</span>` : '________';
    // };
    (value && value.trim() !== '' ? value : '________')
    // const sentence = `On a sunny afternoon, I walked to the ${place} with my ${adjective} friend or pet, carrying a ${noun}, and we decided to ${verb} ${thing}. It was a ${weatherAdjective} day.`;
    const sentence = `On a sunny afternoon, I walked to the ${formatValue(place)} with my ${formatValue(adjective)} ${formatValue(friendOrPet)}, carrying a ${formatValue(noun)}, and we decided to ${formatValue(verb)} near the ${formatValue(thing)}, enjoying the ${formatValue(weatherAdjective)} weather.`;
    // navigation.navigate('ResultScreen', { sentence });
    setSubmittedSentence(sentence);
    setIsEditing(false);
  }, [place, adjective, friendOrPet, noun, verb, thing, weatherAdjective]);

  const handleClear = () => {
    setPlace('');
    setAdjective('');
    setFriendOrPet('');
    setNoun('');
    setVerb('');
    setThing('');
    setWeatherAdjective('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmittedSentence('');
  };

  const getInputWidth = (text, placeholder) => {
    const baseWidth = 120; // Minimum width for the input field
    const widthPerCharacter = 12; // Width added per character in the text
    const placeholderLength = placeholder ? placeholder.length : 0;
    const textLength = text.length;

    // Calculate width based on the text length or placeholder length
    const calculatedWidth = Math.max(baseWidth, Math.max(textLength, placeholderLength) * widthPerCharacter);

    // limit the maximum width to avoid overlay wide inputs 
    const maxWidth = 250; // Set your desired maximum width
    return Math.min(calculatedWidth, maxWidth);
  };

  const renderSentence = (sentence) => {
    const words = sentence.split('');
    return words.map((word, index) => {
      // check if the word is a underlined placeholder or an entered word
      const isUnderlined = word !== '________';
      return (
        <Text key={index} style={{ textDecorationLine: isUnderlined ? 'underline' : 'none' }}>
          {word}
        </Text>
      )
    })
  };


  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            {/* Header Section */}
            <Header title="Fill in the Blank" navigation={navigation} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>

              {/* Center Content Section */}
              <View style={styles.content}>
                {isEditing &&
                  <View style={[styles.sentenceRow, styles.topLeftBorder]}>
                    <Text style={styles.sentenceText}>On a sunny afternoon, I walked to the </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(place, 'place') }]}
                      placeholder="place"
                      placeholderTextColor={placeHolderColor}
                      value={place}
                      onChangeText={setPlace}
                    />
                    <Text style={styles.sentenceText}> with my </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(adjective, 'adjective') }]}
                      placeholder="adjective"
                      placeholderTextColor={placeHolderColor}
                      value={adjective}
                      onChangeText={setAdjective}
                    />
                    <Text style={styles.sentenceText}>, </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(friendOrPet, 'friend or pet') }]}
                      placeholder="friend or pet"
                      placeholderTextColor={placeHolderColor}
                      value={friendOrPet}
                      onChangeText={setFriendOrPet}
                    />
                    <Text style={styles.sentenceText}>, carrying a </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(noun, 'noun') }]}
                      placeholder="noun"
                      placeholderTextColor={placeHolderColor}
                      value={noun}
                      onChangeText={setNoun}
                    />
                    <Text style={styles.sentenceText}>, and we decided to </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(verb, 'verb') }]}
                      placeholder="verb"
                      placeholderTextColor={placeHolderColor}
                      value={verb}
                      onChangeText={setVerb}
                    />
                    <Text style={styles.sentenceText}> near the </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(thing, 'thing') }]}
                      placeholder="thing"
                      placeholderTextColor={placeHolderColor}
                      value={thing}
                      onChangeText={setThing}
                    />
                    <Text style={styles.sentenceText}>, enjoying the </Text>
                    <TextInput
                      style={[styles.input, { width: getInputWidth(weatherAdjective, 'weatherAdjective') }]}
                      placeholder="adjective"
                      placeholderTextColor={placeHolderColor}
                      value={weatherAdjective}
                      onChangeText={setWeatherAdjective}
                    />
                    <Text style={styles.sentenceText}> weather. </Text>
                  </View>
                }
                {!isEditing &&
                  <View style={[styles.resultContainer, styles.topLeftBorder]}>
                    <Text style={styles.resultText}>
                    {submittedSentence}
                      {/* {renderSentence(submittedSentence)} */}
                      {/* <span dangerouslySetInnerHTML={{ __html: submittedSentence }} /> */}
                    </Text>
                    <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                }

                {isEditing && (
                  <View style={styles.buttonContainer} >
                    <TouchableOpacity style={[styles.clearButton, { opacity: isValue ? 1 : 0.5 }]} disabled={!isValue} onPress={handleClear} >
                      <Text style={styles.clearButtonText}> Clear </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {isEditing && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} >
                      <Text style={styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Background>
        <Animated.Image
          source={require('../assets/images/fill.png')}
          style={[styles.zebraImage, { transform: [{ scale: scaleValue }] }]}
          resizeMode='contain' />
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
    paddingVertical: 50,
    // marginBottom: 50
  },
  sentenceRow: {
    // columnGap: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    // justifyContent: 'flex-start',
    // width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sentenceText: {
    // textOverflow: 'clip',
    fontSize: common.style.phraseSize,
    // color: common.color.secondary,
    fontFamily: common.font.primary,
    // marginHorizontal: 20,
    // letterSpacing: 1,
    lineHeight: 30,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: common.color.primary,
    fontSize: 18,
    fontFamily: common.font.primary,
    color: common.color.primary,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    // minWidth: 50,
    // maxWidth: 100,
    // width: 100,
    // textAlign: 'center',
    // flexShrink: 1,
    // paddingVertical: -20
  },
  zebraImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 220,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: -12,
    left: 88,
    backgroundColor: common.color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    position: 'absolute',
    top: -10,
    right: 100,
    backgroundColor: common.color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderTopLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    // // marginTop: 20,
    // padding: 15,
    // // margin: 10,
    // // backgroundColor: '#f9f9f9',
    // backgroundColor: '#fff',
    // borderRadius: 10,
    // // position: 'relative',
    // flexWrap: 'wrap',
    // alignItems: 'flex-start',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 5,

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  topLeftBorder: {
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: common.color.primary,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  resultText: {
    // fontSize: 16,
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
    // color: common.color.primary,
    marginBottom: 15,
    lineHeight: 30,
  },
  editButton: {
    position: 'absolute',
    bottom: -50,
    // right: 'auto',
    // middle: 'auto',
    // left: 10,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',

    // bottom: -48,
    // right: 8,
    // alignItems: 'center',
    // alignContent: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
    backgroundColor: common.color.primary,
    paddingVertical: 10, // Vertical padding for better touch area
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


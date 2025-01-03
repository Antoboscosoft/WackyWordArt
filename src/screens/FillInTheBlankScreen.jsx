import React, { useEffect, useRef, useState } from 'react'
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
  const isFocused=useIsFocused();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [submittedSentence, setSubmittedSentence] = useState();
  const [isEditing, setIsEditing] = useState(true);

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

  const handleSubmit = () => {
    // const sentence = `On a sunny afternoon, I walked to the ${place} with my ${adjective} friend or pet, carrying a ${noun}, and we decided to ${verb} ${thing}. It was a ${weatherAdjective} day.`;
    const sentence = `On a sunny afternoon, I walked to the ${place} with my ${adjective} ${friendOrPet}, carrying a ${noun}, and we decided to ${verb} near the ${thing}, enjoying the ${weatherAdjective} weather.`;
    // navigation.navigate('ResultScreen', { sentence });
    setSubmittedSentence(sentence);
    setIsEditing(false);
  };

  const handleEdit = () => {
    // setSubmittedSentence(null);
    setIsEditing(true);
  };


  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
          {/* Header Section */}
          <Header title="Fill in the Blank" navigation={navigation} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
            
            {/* Top Right Edit Button */}
            {!isEditing && (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            )}
            
            {/* Center Content Section */}
            <View style={styles.content}>
            {isEditing ? (
              <View style={styles.sentenceRow}>
                {/* Buttons */}
                <Text style={styles.sentenceText}>On a sunny afternoon, I walked to the </Text>
                  {/* <View style={{ flexDirection: 'row' }}> */}
                  <TextInput
                    style={styles.input}
                    placeholder="place"
                    // placeholderTextColor={placeHolderColor}
                    value={place}
                    onChangeText={setPlace}
                  />
                  {/* </View> */}
                  <Text style={styles.sentenceText}> with my </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="adjective"
                    // placeholderTextColor={placeHolderColor}
                    value={adjective}
                    onChangeText={setAdjective}
                  />
                  <TextInput 
                    style={styles.input} 
                    placeholder="friend or pet" 
                    // placeholderTextColor={placeHolderColor} 
                    value={friendOrPet} 
                    onChangeText={setFriendOrPet}
                  />
                  <Text style={styles.sentenceText}>, carrying a </Text>
                  {/* <Text style={styles.sentenceText}> carrying a </Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder="noun"
                    // placeholderTextColor={placeHolderColor}
                    value={noun}
                    onChangeText={setNoun}
                  />
                  {/* <Text>,</Text> */}
                  <Text style={styles.sentenceText}>, and we decided to </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="verb"
                    // placeholderTextColor={placeHolderColor}
                    value={verb}
                    onChangeText={setVerb}
                  />
                  <Text style={styles.sentenceText}> near the </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="thing"
                    // placeholderTextColor={placeHolderColor}
                    value={thing}
                    onChangeText={setThing}
                  />
                  {/* <Text style={styles.sentenceText}>,</Text> */}
                  <Text style={styles.sentenceText}>, enjoying the </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="adjective"
                    // placeholderTextColor={placeHolderColor}
                    value={weatherAdjective}
                    onChangeText={setWeatherAdjective}
                  />
                 <Text style={styles.sentenceText}> weather. </Text>
              </View>
            ) : (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{submittedSentence}</Text>
                <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}

            {isEditing && (
              <View style={styles.buttonContainer}>
                <Button title='Submit' onPress={handleSubmit} color={common.color.primary}/>
              </View>
            )}
              {/* {submittedSentence ? (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>{submittedSentence}</Text>
                  </View>
              ) : null} */}

            </View>
          </ScrollView>
         </KeyboardAvoidingView>
        </Background>
        <Animated.Image 
          source={require('../assets/images/fill.png')} 
          style={[styles.zebraImage,{transform: [{ scale: scaleValue }]}]} 
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
    minWidth: 50,
    maxWidth: 100,
    // textAlign: 'center',
    flexShrink: 1,
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
  resultContainer: {
    marginTop: 20,
    padding:15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    fontFamily: common.font.primary,
    color: common.color.primary,
    lineHeight: 30,
  },
   editButton: {
    // position: 'absolute',
    // top: 20,
    // right: 20,
    // zIndex: 10,
    // backgroundColor: common.color.primary,
    // padding: 10,
    // borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
    marginBottom: 50,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sentenceText: {
    fontSize: 18,
    fontFamily: common.font.primary,
    marginHorizontal: 5,
    letterSpacing: 1,
    lineHeight: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: common.color.primary,
    fontSize: 18,
    fontFamily: common.font.primary,
    color: common.color.primary,
    minWidth: 50,
    paddingHorizontal: 5,
  },
  zebraImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 220,
  },
  buttonContainer: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  resultText: {
    fontSize: 18,
    fontFamily: common.font.primary,
    color: common.color.primary,
    lineHeight: 30,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: common.color.primary,
    padding: 10,
    borderRadius: 5,
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


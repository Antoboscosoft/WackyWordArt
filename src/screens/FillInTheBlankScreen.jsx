import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Button, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import { common, Loader } from '../utills/Utils';
import { FadeAnime } from '../components/Animations';
import { useIsFocused } from '@react-navigation/native';
import { getService } from '../APIServices/services';

function FillInTheBlankScreen({ navigation }) {
  const isFocused = useIsFocused();
  const scaleValue = useRef(new Animated.Value(0)).current;
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input,setInput]=useState([]);
  const [answer,setAnswer]=useState([]);

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

  const handleSubmit=()=>{
    setIsEditing(false)
  }

  const handleClear = () => {
    setAnswer(input)
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  // const getInputWidth = (text, placeholder) => {
  //   const baseWidth = 120; // Minimum width for the input field
  //   const widthPerCharacter = 12; // Width added per character in the text
  //   const placeholderLength = placeholder ? placeholder.length : 0;
  //   const textLength = text.length;

  //   // Calculate width based on the text length or placeholder length
  //   const calculatedWidth = Math.max(baseWidth, Math.max(textLength, placeholderLength) * widthPerCharacter);

  //   // limit the maximum width to avoid overlay wide inputs 
  //   const maxWidth = 250; // Set your desired maximum width
  //   return Math.min(calculatedWidth, maxWidth);
  // };

const getText = () => {
    setIsLoading(true);
    getService('/fillblank').then(response => {        
        if (response.status === true) {
          console.log(response?.data?.sentence); 
          setInput(response?.data?.sentence?.match(/\{[^}]*\}|\S+|\s+/g));
          setAnswer(response?.data?.sentence?.match(/\{[^}]*\}|\S+|\s+/g));         
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  };
 useEffect(() => {
    if (isFocused) {
      getText();
    }
  }, [isFocused]);
  const handleInput = (val,item,index) => {
    var ans=[...answer];
    ans[index]=val?val:item;
    setAnswer(ans);
  }

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}>
            {/* Header Section */}
            <Header title="Fill in the Blank" navigation={navigation} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
              {isLoading ? (<Loader/>) : (
              <View style={styles.content}>
                {isEditing &&
                  <View style={[styles.sentenceRow, styles.topLeftBorder]}>
                    {
                      input?.map((item, index) => (
                        item?.includes("{") ?
                          <TextInput
                            key={index}
                            // style={[styles.input, { width: getInputWidth(place, 'place') }]}
                            style={styles.input}
                            placeholder={item}
                            placeholderTextColor={common.color.primary}
                            value={answer[index]?.includes("{") ?null:answer[index]}
                            onChangeText={(val)=>handleInput(val,item,index)}
                          /> 
                          :
                          <Text key={index} style={styles.sentenceText}>{item}</Text>
                      ))
                    }
                  </View>
                }
                {!isEditing &&
                  <View style={[styles.resultContainer, styles.topLeftBorder]}>
                    {
                      answer?.map((item,index)=>(
                        item?.includes("{") ?
                        <Text key={index}>________</Text>:
                        <Text style={styles.resultText} key={index}>{item}</Text>
                      ))
                    }
                    <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                }

                {isEditing && (
                  <View style={styles.buttonContainer} >
                    <TouchableOpacity style={[styles.clearButton, { opacity: !arraysAreEqual(input,answer) ? 1 : 0.5 }]} disabled={arraysAreEqual(input,answer)} onPress={handleClear} >
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
              )}
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
  },
  sentenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
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
    borderRadius: 10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
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
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
    marginBottom: 15,
    lineHeight: 30,
  },
  editButton: {
    position: 'absolute',
    bottom: -50,
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',

    backgroundColor: common.color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


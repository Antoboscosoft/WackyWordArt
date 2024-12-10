import React from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'


import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function MakeYourownScreen({ navigation }) {
  const insets= useSafeAreaInsets();

  const [text, setText] = useState('');

  return (
    <View style={[styles.container,{ paddingTop: insets.top}]}>
      <ImageBackground source={require('../assets/images/bg1.png')} style={styles.backgroundImage}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <View style={styles.circle}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}> Make Your Own </Text>
          <View />
        </View>

        {/* Center Content Section */}
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Begin to create your own senetence here "
            value={text}
            onChangeText={setText}
            multiline
            textAlignVertical="top"
          />
        </View>
        <FastImage source={require('../assets/images/zebraY.png')} style={{position: 'absolute', bottom: 200, width: 300, height: 300}} />
      </ImageBackground>
    </View>
  )
}

export default MakeYourownScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    letterSpacing: 1,
  },

  // Content styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  input: {
    width: '100%',
    minHeight: 70,
    maxHeight: 300,
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffffe6',
    marginTop: 50
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});


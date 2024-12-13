import React from 'react'
import {View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';

function MakeYourownScreen({ navigation }) {

  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Background>
{/* Header Section */}
<Header title="Make Your Own" navigation={navigation} />
        {/* Center Content Section */}
        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="Begin to create your own senetence here... "
            value={text}
            onChangeText={setText}
            multiline
            numberOfLines={10}
            textAlignVertical="top"
            placeholderTextColor={common.color.secondary}
          />
        </View>
        <FastImage source={common.Zebra} style={{ position: 'absolute', left: 100, bottom: 200, width: 300, height: 300 }} />
      </Background>
    </View>
  )
}

export default MakeYourownScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    minHeight: 150,
    maxHeight: 500,
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 20,
    fontFamily: common.font.primary,
    color: "#333",
    backgroundColor: '#ffffffe6',
    marginTop: 50,
    zIndex: 1
  },
});


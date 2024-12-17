import React from 'react'
import { ScrollView, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import { FadeAnime } from '../components/Animations';

function MakeYourownScreen({ navigation }) {

  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          {/* Header Section */}
          <Header title="Make Your Own" navigation={navigation} />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
            {/* Center Content Section */}
            <View style={styles.content}>
              <TextInput
                style={styles.input}
                placeholder="Begin to create your own senetence here... "
                value={text}
                onChangeText={setText}
                multiline
                // numberOfLines={10}
                textAlignVertical="top"
                placeholderTextColor={'#097e868f'}
              />
            </View>
          </ScrollView>
        </Background>
        <FastImage source={require('../assets/images/makeOwn.png')} style={styles.zebraImage} resizeMode='contain' />
      </FadeAnime>
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
    fontSize: 17,
    fontFamily: common.font.primary,
    color: "#006c21",
    backgroundColor: '#ffffffe6',
    marginTop: 50,
    zIndex: 1,
    lineHeight: 35
  },
  zebraImage: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
});


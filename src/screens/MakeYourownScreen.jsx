import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


import Ionicons from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native';

function MakeYourownScreen({ navigation }) {
  const [text, setText] = useState('');


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Make Your Own </Text>
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

export default MakeYourownScreen


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
  input: {
    width: '100%',
    
    // height: 40,
    // backgroundColor: '#fff',
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // paddingHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // fontSize: 16,
    // color: '#333',
    minHeight: 70,
    maxHeight: 300,
    // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
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


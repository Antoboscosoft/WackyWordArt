import React, { useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

function LetsLearnScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState(null);

  const data = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ImageBackground source={require('../assets/images/bg1.png')} style={styles.backgroundImage}>

        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.circle}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}> Let's Learn  </Text>
          <View />
        </View>

        {/* Center Content Section */}
        <View style={styles.content}>
          <View style={styles.sentenceRow}>
            {/* Buttons */}
            <Text style={styles.sentenceText}>I would like to eat a</Text>
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select a fruit"
              value={value}
              onChange={(item) => setValue(item.value)}
              style={styles.dropdown}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              containerStyle={styles.dropdownContainer}
            // inputSearchStyle={styles.inputSearch}
            />
          </View>
          <FastImage source={require('../assets/images/zebraY.png')} style={{ width: 300, height: 300, marginTop: 50 }} />
        </View>
      </ImageBackground>
    </View>
  )
}


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
    marginTop: 200,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    rowGap: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: '#ffffffdb',
    borderRadius: 8,
    padding: 15,
  },
  sentenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    width: 150,
    borderBottomWidth: 1,
    borderColor: '#f18927',
    paddingHorizontal: 10,
  },
  placeholder: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#aaa',
    textAlign: 'center',
  },
  selectedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f18927',
    textAlign: 'center',
  },
  dropdownContainer: {
    borderRadius: 8,
    marginTop: -35,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});


export default LetsLearnScreen
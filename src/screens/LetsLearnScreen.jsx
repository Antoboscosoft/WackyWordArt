import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';

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
      {/* Header Section */}
      <Header title="Let's Learn" navigation={navigation} />
      <Background>
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
          <FastImage source={common.Zebra} style={{ width: 300, height: 300, marginTop: 50 }} />
        </View>
      </Background>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderColor: common.color.primary,
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
    color: common.color.primary,
    textAlign: 'center',
  },
  dropdownContainer: {
    borderRadius: 8,
    marginTop: -35,
  },
});


export default LetsLearnScreen
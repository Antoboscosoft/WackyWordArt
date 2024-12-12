import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import DropDownPicker from 'react-native-dropdown-picker';

function LetsLearnScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);
  return (
    <View style={styles.container}>
      <Background>
        {/* Header Section */}
      <Header title="Let's Learn" navigation={navigation} />
        {/* Center Content Section */}
        <View style={styles.content}>
          <View style={styles.sentenceRow}>
            {/* Buttons */}
            <Text style={styles.sentenceText}>I would like to eat a </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              multiple={false}
              maxHeight={300}
              containerStyle={styles.containerStyle}
              dropDownContainerStyle={styles.dropdownContainer}
              style={styles.dropdown}
              selectedItemLabelStyle={{ color: common.color.primary }}
              labelStyle={{ color: common.color.primary }}
              placeholder="Select a fruit"
              placeholderStyle={{ fontSize: 16 }}
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
    borderWidth:0,
    backgroundColor:"transparent",
    borderBottomWidth: 1,
    borderColor: common.color.primary,
  },
  dropdownContainer: {
    borderColor: common.color.primary,
  },
  containerStyle:{
    borderRadius: 8,
    width: 200
  }
});


export default LetsLearnScreen
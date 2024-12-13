import React, { useState,useRef, useEffect } from 'react'
import { StyleSheet, Text, View,  Animated} from 'react-native'
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';

function LetsLearnScreen({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);
  const animationValue = useRef(new Animated.Value(0)).current;
  const positionValue = useRef(new Animated.Value(50)).current;

  const handlePress = () => {
    animationValue.setValue(0);
    positionValue.setValue(50);
    Animated.parallel([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(positionValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // const getText = () => {
  //   console.log('get text');
  //   axios({
  //     method: 'GET',
  //     url: 'http://192.168.1.148:8000/ai/generatetext'
  //   }).then((response) => {
  //     console.log(response);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }
  // useEffect(() => {
  //   getText()
  // },[])
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
            {
              value ? value.label.split('').map((char, index) => <Animated.Text key={index} style={[styles.answer,{opacity: animationValue,transform: [{ translateX: positionValue }]}]}>{char}</Animated.Text>) : 
              <View style={{ width: 150,height: 50,borderBottomWidth: 1,borderColor: common.color.secondary }}></View>
            }
            {/* <DropDownPicker
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
            /> */}
          </View>
          <View style={styles.listContainer}>
         {
          items.map((item, index) => (
            <Text key={index} style={styles.listLabel} onPress={() => {handlePress();setValue(item)}}>{item.label}</Text>
          ))
         }
          </View>
          {
            value && (value.label==="Apple" ?
            <Animated.Image source={require('../assets/images/apple.jpeg')} style={[styles.ansImg,{opacity: animationValue,transform: [{ translateY: positionValue }]}]} /> :
            value && value.label==="Banana" ?
            <Animated.Image source={require('../assets/images/banana.jpeg')} style={[styles.ansImg,{opacity: animationValue,transform: [{ translateY: positionValue }]}]}  /> :
            value && value.label==="Orange" ?
            <Animated.Image source={require('../assets/images/orange.jpeg')} style={[styles.ansImg,{opacity: animationValue,transform: [{ translateY: positionValue }]}]}  /> :"")
          }
          {/* <FastImage source={common.Zebra} style={{ width: 300, height: 300, marginTop: 50 }} /> */}
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
    marginTop: 50,
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
    padding: 50,
  },
  sentenceText: {
    fontSize: 30,
    // fontWeight: 'bold',
    // color: '#333',
    fontFamily: common.font.primary,
    color: common.color.secondary,
    textAlign: 'center'
  },
  listContainer:{
    flexDirection: 'row',
    columnGap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5
  },
  listLabel:{
    fontSize: 30,
    color:"white",
    fontFamily: common.font.primary,
    backgroundColor: common.color.secondary,
    textAlign: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
  },
  answer:{
    color:"white",
    fontSize: 30,
    fontFamily: common.font.primary,
    backgroundColor: common.color.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginTop:15
  },
  ansImg: {
    width: 300,
    height: 300,
    marginTop: 50,
    borderRadius: 15,
    borderColor:"white",
    borderWidth: 10,
  }
  // dropdown: {
  //   borderWidth:0,
  //   backgroundColor:"transparent",
  //   borderBottomWidth: 1,
  //   borderColor: common.color.primary,
  // },
  // dropdownContainer: {
  //   borderColor: common.color.primary,
  // },
  // containerStyle:{
  //   borderRadius: 8,
  //   width: 200
  // }
});


export default LetsLearnScreen
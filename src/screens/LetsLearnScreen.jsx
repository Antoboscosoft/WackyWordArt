import React, { useState,useRef, useEffect } from 'react'
import { StyleSheet, Text, View,  Animated,Alert, ScrollView} from 'react-native'
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { FadeAnime } from '../components/Animations';
import LottieView from 'lottie-react-native';

function LetsLearnScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [value, setValue] = useState();
  // var ques="The  {adjective}  pirate  quickly  {verb}  across the deck."
  // "fearless", "clumsy", "drunken",  "stumbled", "scurried", "leaped"
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [items, setItems] = useState([]);
  const [question,setQuestion] = useState()
  // const [count,setCount]=useState(1)
  const [image,setImage] = useState()
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

  const getText = () => {
    setItems([])
    setQuestion()
    setImage()
    setValue()
    setIsLoading(true)
    axios({
      method: 'GET',
      url: 'http://172.105.54.28:8000/ai/generatetext',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if(response.data.status===true){
        setQuestion(response?.data?.data?.phrase?.split(' '))        
        setItems(response?.data?.data?.options)
      }
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setIsLoading(false)
    })
  }
  const getImage = (data) => {
    setIsLoading1(true)
    axios({
      method: 'POST',
      url:'http://172.105.54.28:8000/ai/generateimage',
      headers: {
        'Content-Type': 'application/json',
      },
      // data: { "prompt": data }
      data: { "prompt": question.join(" ").replace(/{.*?}/, data)}
    }).then((response) => {
      if(response.data.status===true){
        setImage(response.data.image)
      }
      else{
        setIsLoading1(false)
        Alert.alert('Error',"Failed to generate image")
      }      
    }).catch((error) => {
      setIsLoading1(false)
      Alert.alert('Error',"Failed to generate image")
      console.log(error);
    })
  }
  const handleClick=(item)=>{
    setValue(item.trimStart())
    handlePress();
    getImage(item.trimStart())
    // var answer=[...value]
    // answer.push({"value":item.trimStart(),"added":false})
    // var ques=[...question]
    // for(let i=0;i<ques.length;i++){
    //   if(ques[i].includes('{')){
    //     if(answer.length >= count && answer[count-1].added===false){
    //       ques[i]=answer[count-1]?.value
    //       answer[count-1].added=true
    //       setCount(count+1)
    //     }
    //   }
    // }      
    // setQuestion(ques)
    // setValue(answer)
    // handlePress();
    // if(!ques?.some((item) => item.includes('{'))){
    // getImage(ques.join(" "))
    // }
  }
  useEffect(() => {
    if(isFocused){
      getText()
    }
  },[isFocused])
  
  return (
    <View style={styles.container}>
      <FadeAnime>
      <Background>
        {/* Header Section */}
      <Header title="Let's Learn" navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ zIndex: 1 }}>
        {/* Center Content Section */}
        {
          isLoading ? 
          <View>
            <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={[styles.loading,{ width: 100, height: 100 }]}/>
            </View>:
        <View style={styles.content}>
          <View style={styles.sentenceRow}>
            {/* Buttons */}
            {/* <Text style={styles.sentenceText}>{question?.map((word, index) =>(value?.length>0 && value?.find(item => word===item?.value)) ? <Animated.Text key={index} style={[styles.answer,{opacity: animationValue,transform: [{ translateX: positionValue }]}]}>{word}</Animated.Text>: <Text key={index} style={(question?.length>0 && word?.includes('{')) ? styles.sentenceTextHighlight : ''}>{word} </Text>)} </Text> */}
            <Text style={styles.sentenceText}>{question?.map((word, index) =><Text key={index} style={(question?.length>0 && word?.includes('{')) ? styles.sentenceTextHighlight : ''}>{word} </Text>)} </Text>
            <View style={{flexDirection: 'row',flexWrap: 'wrap',alignItems: 'center',justifyContent: 'center'}}>
            {
              value && value.split('').map((char, index) =><Animated.Text key={index} style={[styles.answer,{opacity: animationValue,transform: [{ translateX: positionValue }]}]}>{char}</Animated.Text>)
            }
            </View>
          </View>
          <View style={styles.listContainer}>
         {
          items.map((item, index) => (
            <Text key={index} style={styles.listLabel} onPress={() => {handleClick(item)}}>{item}</Text>
          ))
         }
          </View>
          {
            (!image && value )?
            <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={[styles.loading,{ width: 100, height: 100 }]}/>:
            image &&
            <View style={{ width: "60%", height: "40%", marginTop: 50}}>
            <FastImage source={{uri:image}} style={styles.ansImg} onLoadEnd={() => setIsLoading1(false)} onError={() => setIsLoading1(false)} />
            {isLoading1 && <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')}  style={{position:"absolute", top:'30%', left:'30%',width: 100, height: 100, zIndex: 1}} />}
          </View>
          }
        </View>
        }
        </ScrollView>
      </Background>
      </FadeAnime>
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
    padding: 20,
  },
  sentenceText: {
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
    color: common.color.secondary,
    textAlign: 'center'
  },
  sentenceTextHighlight:{
    color: common.color.primary,
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
    fontSize: common.style.phraseSize,
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
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
    backgroundColor: common.color.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginTop:15
  },
  ansImg: {
    width: "100%",
    height: "100%",
    // marginTop: 50,
    borderRadius: 15,
    borderColor:"white",
    borderWidth: 10,
  },
  loading:{
    height:50,
    width:50,
    alignSelf: 'center',
    marginTop: 50
  }
});


export default LetsLearnScreen
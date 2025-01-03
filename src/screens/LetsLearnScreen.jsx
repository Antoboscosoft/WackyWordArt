import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Header from '../components/Header';
import Background from '../components/Background';
import {common} from '../utills/Utils';
import {useIsFocused} from '@react-navigation/native';
import {FadeAnime} from '../components/Animations';
import LottieView from 'lottie-react-native';
import {ContextProvider} from '../navigations/MainNavigator';
import { getService ,postService} from '../APIServices/services';

function LetsLearnScreen({navigation}) {
  const isFocused = useIsFocused();
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [items, setItems] = useState([]);
  const [question, setQuestion] = useState();
  const [image, setImage] = useState({value:null,error:false});
  const {RewardedAd, rewardedAd, isAdLoaded, setDisplayAd } = useContext(ContextProvider);

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
    setItems([]);
    setQuestion();
    setImage({value:null,error:false});
    setValue();
    setIsLoading(true);
    getService('/generatetext').then(response => {        
        if (response.status === true) {
          setQuestion(response?.data?.phrase?.split(' '));
          setItems(response?.data?.options);
        }
      }).catch(error => {
        console.log(error);
      }).finally(() => {
        setIsLoading(false);
      });
  };
  const getImage = data => {
    setImage({value:null,error:false})
    setIsLoading1(true);
    let val={prompt: question.join(' ').replace(/{.*?}/, data)}
    postService("/generateimage",val).then(response => {
        if (response.status === true) {
          setImage({value:response.image,error:false})
        } else {
          setImage({value:null,error:true})
          // setDisplayAd(false);
          setIsLoading1(false);
          // Alert.alert('Error', 'Failed to generate image');
        }
      }).catch(error => {
        setImage({value:null,error:true})
        // setDisplayAd(false);
        setIsLoading1(false);
        // Alert.alert('Error', 'Failed to generate image');
        console.log(error);
      });
  };
  const handleClick = item => {
    setValue(item.trimStart());
    handlePress();
  };
  const generateImg = () => {
    // setDisplayAd(true);
    if (RewardedAd.isLoaded) {
      RewardedAd.show();
      getImage(value);
    } else {
      Alert.alert("Ad not loaded");
    }
  };
  
  // Show error message after ad closed
  useEffect(() => {
    if(isFocused && !RewardedAd.isOpened &&image.error){
        Alert.alert('Error', 'Failed to generate image');
    }
  }, [RewardedAd.isOpened, image.error]);
  

  useEffect(() => {
    if (isFocused) {
      getText();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FadeAnime>
        <Background>
          {/* Header Section */}
          <Header title="Let's Learn" navigation={navigation} />
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 15}} style={{zIndex: 1}}>
            {/* Center Content Section */}
            {isLoading ? (
              <View>
                <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={[styles.loading, {width: 100, height: 100}]}/>
              </View>
            ) : (
              <View style={styles.content}>
                <View style={styles.sentenceRow}>
                  <Text style={styles.sentenceText}>
                    {question?.map((word, index) => (
                      <Text key={index} style={ question?.length > 0 && word?.includes('{') ? styles.sentenceTextHighlight  : '' }>
                        {word}{' '}
                      </Text>
                    ))}{' '}
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {value && value.split('').map((char, index) => (
                        <Animated.Text  key={index} style={[ styles.answer, { opacity: animationValue, transform: [{translateX: positionValue}], },]}>
                          {char}
                        </Animated.Text>
                      ))}
                  </View>
                </View>
                <View style={styles.listContainer}>
                  {!value ? (items.map((item, index) => (
                      <Text key={index} style={styles.listLabel} onPress={() => handleClick(item)}>
                        {item}
                      </Text>
                    ))
                  ) : image?.value ? null : (
                    <View>
                      <TouchableOpacity   style={styles.button} onPress={() => {isLoading1 ? null: generateImg();}}>
                        <Text style={styles.buttonText}>
                          {isLoading1 ? 'Generating Image' : 'Generate Image'}
                        </Text>
                      </TouchableOpacity>
                      {isLoading1 ? (
                        <View>
                          <Text style={styles.wait}>Please wait...</Text>
                        </View>
                      ) : null}
                    </View>
                  )}
                </View>
                {(!image?.value && !image?.error && value && isLoading1) ? (
                  <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')} style={[styles.loading, {width: 100, height: 100}]} />
                ) : ( image?.value && (
                    <View style={{width: '60%', height: '40%', marginTop: 50}}>
                      <Image source={{uri: image?.value}} style={styles.ansImg}
                        onLoadEnd={() => {
                          setIsLoading1(false)
                          // setDisplayAd(false);
                        }}
                        onError={() => {
                          setIsLoading1(false)
                          // setDisplayAd(false);
                        }}
                      />
                      {isLoading1 && (
                        <LottieView autoPlay loop={true} source={require('../assets/lottie/textLoading.json')}
                          style={{ position: 'absolute',top: '30%', left: '30%',  width: 100,  height: 100, zIndex: 1, }}
                        />
                      )}
                    </View>
                  )
                )}
              </View>
            )}
          </ScrollView>
        </Background>
      </FadeAnime>
    </View>
  );
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
    color: 'black',
    textAlign: 'center',
  },
  sentenceTextHighlight: {
    color: common.color.primary,
  },
  cancelButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff0000', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: -16,
    top: -10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flexDirection: 'row',
    columnGap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
  },
  listLabel: {
    fontSize: common.style.phraseSize,
    color: 'white',
    fontFamily: common.font.primary,
    backgroundColor: common.color.secondary,
    textAlign: 'center',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  answer: {
    color: 'white',
    fontSize: common.style.phraseSize,
    fontFamily: common.font.primary,
    backgroundColor: common.color.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
    marginTop: 15,
  },
  ansImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 10,
  },
  loading: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    marginTop: 50,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: common.color.secondary,
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...common.style.border,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: common.font.primary,
    paddingHorizontal: 5,
  },
  wait: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: common.font.primary,
    textShadowRadius: 5,
    textShadowOffset: {width: 2, height: 1},
  },
});

export default LetsLearnScreen;

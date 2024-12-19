import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Animated} from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import useMusicPlayer, { common } from '../utills/Utils';
import LottieView from 'lottie-react-native';
import { FadeAnime } from '../components/Animations';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ContextProvider } from '../navigations/MainNavigator';

function PlayScreen({ navigation }) {
  const isFocused = useIsFocused();

  const usePlayMusic = useMusicPlayer();
  const { playMusic, stopMusic } = usePlayMusic;

  const { musicController, setMusicControler } = useContext(ContextProvider);

  console.log("musicController", musicController, setMusicControler);


  // Use `useFocusEffect` to handle screen focus and blur events
  useFocusEffect(
    useCallback(() => {
      // Start music when the screen is focused
      musicController == true &&
        playMusic("sakura_girl");
      // Stop music when the screen is unfocused
      // return () => {
      //   stopMusic();
      // };
    }, [musicController, isFocused])  // Dependencies are left empty to ensure the effect is not re-triggered unnecessarily
  );
 const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(30)).current; 
    useEffect(() => {
        if(isFocused){
        fadeAnim.setValue(0);
        translateY.setValue(30);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
    }
      }, [fadeAnim, translateY,isFocused]);
    const buttonInfo=[
        {title: "Let's Learn",lottieSource: require('../assets/lottie/learn.json'),navigateTo: 'LetsLearnScreen',style: { textShadowColor: common.color.secondary }},
        {title: "Wacky Word Wheel",lottieSource: require('../assets/lottie/spin.json'),navigateTo: 'WackWordArtScreen', style: { backgroundColor: common.color.secondary, columnGap: 0, paddingLeft: 0 }},
        {title: "Fill in the Blank",lottieSource: require('../assets/lottie/fillTheBlank.json'), navigateTo: 'FillInTheBlankScreen',style: { textShadowColor: common.color.secondary }},
        {title: "Make Your Own", lottieSource: require('../assets/lottie/makeOwn.json'), navigateTo: 'MakeYourOwnScreen', style: { backgroundColor: common.color.secondary, paddingLeft: 0 }}
    ]
      const animations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
      ];
      useEffect(() => {
        if(isFocused){
        animations.forEach(animation => animation.setValue(0));
        Animated.stagger(300,
          animations.map(animation =>
            Animated.timing(animation, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            })
          )
        ).start();
    }
      }, [isFocused]);
  return (
    isFocused &&
    <View style={styles.container}>
      <Background>
        <FadeAnime>
          {/* Header Section */}
          <Header title="Play" navigation={navigation} secondIcon="emoji-objects" secondIconPress={() => navigation.navigate('HowToPlayScreen')} />
          <ScrollView>
            <Animated.Image source={require("../assets/images/play.png")} style={[styles.cloudImage,{opacity: fadeAnim,transform: [{ translateY }]}]} resizeMode='contain' />
            {/* Center Content Section */}
            {buttonInfo.map((button, index) => (
              <Animated.View key={index} style={[styles.buttonContainer,{opacity: animations[index],transform: [{translateY: animations[index].interpolate({inputRange: [0, 1],outputRange: [20, 0]})}],width: '100%'}]}>
              <TouchableOpacity style={[styles.button, button.style]} onPress={() => {navigation.navigate(button.navigateTo);stopMusic();}}>
                  <LottieView autoPlay loop={false} source={button.lottieSource} style={{ width: 50, height: 50 }}/>
                  <Text style={[styles.buttonText]}>{button.title}</Text>
              </TouchableOpacity>
              </Animated.View>
          ))}
          </ScrollView>
        </FadeAnime>
      </Background>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cloudImage: {
    width: 400,
    height: 300,
    zIndex: 1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '65%',
    height: 50,
    backgroundColor: common.color.primary,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 5,
    ...common.style.border
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: common.font.primary,
    textShadowColor: "#d70297be",
    textShadowRadius: 5,
    textShadowOffset: { width: 2, height: 1 },
  },
});

export default PlayScreen;

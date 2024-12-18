import React, { useCallback, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
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



  return (
    isFocused &&
    <View style={styles.container}>
      <Background>
        <FadeAnime>
          {/* Header Section */}
          <Header title="Play" navigation={navigation} secondIcon="emoji-objects" secondIconPress={() => navigation.navigate('HowToPlayScreen')} />
          <ScrollView>
            <FastImage source={require("../assets/images/play.png")} style={styles.cloudImage} resizeMode='contain' />
            {/* Center Content Section */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { columnGap: 15 }]} onPress={() => { navigation.navigate('LetsLearnScreen'); stopMusic() }}>
                <LottieView autoPlay loop={false} source={require('../assets/lottie/learn.json')} style={{ width: 50, height: 50 }} />
                <Text style={[styles.buttonText, { textShadowColor: common.color.secondary }]}>Let's Learn </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: common.color.secondary, paddingLeft: 0 }]} onPress={() => { navigation.navigate('WackWordArtScreen'); stopMusic() }}>
                <LottieView autoPlay loop={false} source={require('../assets/lottie/spin.json')} style={{ width: 50, height: 50 }} />
                <Text style={styles.buttonText}>Wackey Word Wheel </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('FillInTheBlankScreen'); stopMusic() }}>
                <LottieView autoPlay loop={false} source={require('../assets/lottie/fillTheBlank.json')} style={{ width: 50, height: 50 }} />
                <Text style={[styles.buttonText, { textShadowColor: common.color.secondary }]}>Fill in the Blank </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, { backgroundColor: common.color.secondary, paddingLeft: 0 }]} onPress={() => { navigation.navigate('MakeYourOwnScreen'); stopMusic() }}>
                <LottieView autoPlay loop={false} source={require('../assets/lottie/makeOwn.json')} style={{ width: 60, height: 70 }} />
                <Text style={styles.buttonText}>Make Your Own </Text>
              </TouchableOpacity>
            </View>
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

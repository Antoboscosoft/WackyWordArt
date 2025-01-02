import React, { useState, useEffect, createContext } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import HomeScreen from '../screens/HomeScreen';
import PlayScreen from '../screens/PlayScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HowToPlayScreen from '../screens/HowToPlayScreens';
import LetsLearnScreen from '../screens/LetsLearnScreen';
import WackyWordWheelScreen from '../screens/WackyWordWheelScreen';
import FillInTheBlankScreen from '../screens/FillInTheBlankScreen';
import MakeYourownScreen from '../screens/MakeYourownScreen';

import { common } from '../utills/Utils';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProgressScreen from '../screens/ProgressScreen';
import { BannerAd, BannerAdSize,RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

export const ContextProvider = createContext(null);

const Stack = createNativeStackNavigator();

function MainNavigator() {

  const [isLoading, setIsLoading] = useState(true);
  const [adBanner, setAdBanner] = useState(false);

  const [musicController, setMusicControler] = useState(null);
  const [displayFooter,setDisplayFooter]=useState(true)
  const [rewardedAd, setRewardedAd] = useState(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [displayAd, setDisplayAd] = useState();


  useEffect(() => {
    StatusBar.setHidden(true);
    Platform.OS === 'android' && StatusBar.setTranslucent(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // setTimeout(() => {
    //   setAdBanner(true);
    // }, 3200)
  }, []);

  useEffect(() => {
    const ad = RewardedAd.createForAdRequest("ca-app-pub-3940256099942544/5224354917", {
      keywords: ['fashion', 'clothing'],
    });

    const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setIsAdLoaded(true);
      setRewardedAd(ad);
    });

    const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, reward => {
      setDisplayAd(false)
      console.log('User earned reward of ', reward);
    });

    // Start loading the ad
    ad.load();

    // Cleanup listeners on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [isAdLoaded===false]);

  return (
    <View style={styles.container}>
      <NavigationContainer theme={DarkTheme}>
        <ContextProvider.Provider value={{ musicController, setMusicControler,displayFooter,setDisplayFooter,rewardedAd, setRewardedAd,isAdLoaded, setIsAdLoaded,displayAd, setDisplayAd }}>
          <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            animation: 'fade',
            navigationBarHidden: true
          }}>
            <Stack.Screen name='Home' component={isLoading ? SplashScreen : HomeScreen} />
            <Stack.Screen name='HowToPlayScreen' component={HowToPlayScreen} />
            <Stack.Screen name='PlayScreen' component={PlayScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />

            <Stack.Screen name='LetsLearnScreen' component={LetsLearnScreen} />
            <Stack.Screen name='WackWordArtScreen' component={WackyWordWheelScreen} />
            <Stack.Screen name='FillInTheBlankScreen' component={FillInTheBlankScreen} />
            <Stack.Screen name='MakeYourOwnScreen' component={MakeYourownScreen} />

            <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
            <Stack.Screen name='ProgressScreen' component={ProgressScreen} />
          </Stack.Navigator>
        </ContextProvider.Provider>
      </NavigationContainer>
      {(isLoading === false && displayFooter) && <View style={[adBanner ? styles.adContainer : null, { borderTopWidth: adBanner ? 3 : 0, borderColor: common.color.primary }]}>
        <FastImage style={styles.adImage} resizeMode="cover" source={require('../assets/images/ads.png')} />
        <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId="ca-app-pub-3940256099942544/9214589741"
        onAdLoaded={() => {
          setAdBanner(true)
        }}
          onAdFailedToLoad={error => {
            console.error('Advert failed to load: ', error);
          }} />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  // Advertisement styles
  adContainer: {
    width: '100%',
    // height: 80,
    borderTopWidth: 3,
    borderColor: common.color.primary
  },
  // adImage: {
  //   width: '100%',
  //   height: '100%',
  // },
})

export default MainNavigator
import React, { useState, useEffect, createContext, useRef } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

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
import { BannerAd, BannerAdSize, useRewardedAd } from 'react-native-google-mobile-ads';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ContextProvider = createContext(null);

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const [adBanner, setAdBanner] = useState(false);

  const [musicController, setMusicControler] = useState(null);
  // const [rewardedAd, setRewardedAd] = useState(null);
  // const [isAdLoaded, setIsAdLoaded] = useState(false);
  // const [displayAd, setDisplayAd] = useState();

  const [isNetworkConnected, setIsNetworkConnected] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const RewardedAd = useRewardedAd("ca-app-pub-3940256099942544/5224354917");

  useEffect(() => {
    StatusBar.setHidden(true);
    Platform.OS === 'android' && StatusBar.setTranslucent(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

  }, []);

  useEffect(() => {   
    const interval = setInterval(() => {
      RewardedAd.isLoaded === false && RewardedAd.load();
    }, 5000);

    if(RewardedAd.isLoaded){
      clearInterval(interval);
    }else{
      RewardedAd.load();
    }

    return () => clearInterval(interval);


  }, [RewardedAd.isLoaded, isNetworkConnected]);
  
  // For network alert message
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  // Hide network error when connected
  useEffect(() => {
    if (isNetworkConnected){
      setTimeout(() => {
        setShowNetwork(false);
      }, 2000);
    }
  }, [isNetworkConnected]);

  // Network error
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setIsNetworkConnected(true);
        fadeOut();        
      } else {
        setIsNetworkConnected(false);
        setShowNetwork(true);  //To show network error msg
        fadeIn();
      }
    });

    return () => {
      // Unsubscribe
      unsubscribe();
    }
  }, [])

  const networkBackground= isNetworkConnected ? "#0eb638" : "#da0808"

  return (
    <View style={styles.container}>
      {isLoading === false && showNetwork && <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: insets.top + insets.top / 2, padding: 8, zIndex: 1, backgroundColor: networkBackground, opacity: fadeAnim }}>
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{isNetworkConnected ? 'You are connected to the internet' : 'Check your internet connection'}</Text>
      </Animated.View>}
      <NavigationContainer theme={DarkTheme}>
        <ContextProvider.Provider value={{musicController, setMusicControler, RewardedAd}}>
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
      {isLoading === false && <View style={[adBanner ? styles.adContainer : null, { borderTopWidth: adBanner ? 3 : 0, borderColor: common.color.primary }]}>
        {/* <FastImage style={styles.adImage} resizeMode="cover" source={require('../assets/images/ads.png')} /> */}
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
    borderTopWidth: 3,
    borderColor: common.color.primary,
    backgroundColor: "#fbfef7e9"
  },
})

export default MainNavigator
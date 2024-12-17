import React, { useState, useEffect } from 'react';
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

const Stack = createNativeStackNavigator();

function MainNavigator() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StatusBar.setHidden(true);
    Platform.OS === 'android' && StatusBar.setTranslucent(true);


    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false,
          animation: 'fade',
          navigationBarHidden: true
        }}>
          <Stack.Screen name='Home' component={ isLoading ? SplashScreen : HomeScreen } />
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
      </NavigationContainer>
      {isLoading === false && <View style={styles.adContainer}>
        <FastImage style={styles.adImage} resizeMode="cover" source={require('../assets/images/ads.png')} />
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
    height: 80,
    borderTopWidth: 3,
    borderColor: common.color.primary
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
})

export default MainNavigator
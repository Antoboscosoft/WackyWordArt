import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import PlayScreen from '../screens/PlayScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TutorialScreen from '../screens/TutorialScreen';
import HowToPlayScreen from '../screens/HowToPlayScreens';
import LetsLearnScreen from '../screens/LetsLearnScreen';
import WackyWordWheelScreen from '../screens/WackyWordWheelScreen';
import FillInTheBlankScreen from '../screens/FillInTheBlankScreen';
import MakeYourownScreen from '../screens/MakeYourownScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useState } from 'react';
import { StatusBar, View } from 'react-native';
import FastImage from 'react-native-fast-image';


const Splash = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FastImage source={require('../assets/images/splash.png')} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function MainNavigator() {
 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    StatusBar.setHidden(true);
    StatusBar.setTranslucent(true);

    
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false,
        animation: 'fade',
        navigationBarHidden:true
      }}>
        <Stack.Screen name='Home' component={isLoading ? Splash : HomeScreen} />
        <Stack.Screen name='Game' component={GameScreen} />
        <Stack.Screen name='HowToPlayScreen' component={HowToPlayScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='Progress' component={PlayScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="TutorialScreen" component={TutorialScreen} />
        <Stack.Screen name='LetsLearnScreen' component={LetsLearnScreen} />
        <Stack.Screen name='WackWordArtScreen' component={WackyWordWheelScreen} />
        <Stack.Screen name='FillInTheBlankScreen' component={FillInTheBlankScreen} />
        <Stack.Screen name='MakeYourOwnScreen' component={MakeYourownScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
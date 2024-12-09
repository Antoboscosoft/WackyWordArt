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

const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
            headerShown: false,
            animationEnabled: false,
            }}>
            <Stack.Screen name='Home' component={HomeScreen} />
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
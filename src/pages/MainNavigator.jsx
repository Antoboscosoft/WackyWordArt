import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../asserts/components/HomeScreen';
import GameScreen from '../asserts/components/GameScreen';
import PlayScreen from '../asserts/screens/PlayScreen';
import SettingsScreen from '../asserts/components/SettingsScreen';
import ProfileScreen from '../asserts/components/ProfileScreen';
import { State } from 'react-native-gesture-handler';
import TutorialScreen from '../asserts/components/TutorialScreen';
import HowToPlayScreen from '../asserts/screens/HowToPlayScreens';

const Drawer = createStackNavigator();
const Stack = createStackNavigator();


// function ProfileScreen() {
//     return (
//         <View style={styles.screenContainer}>
//             <Text style={styles.screenText}>Profile Screen</Text>
//         </View>  
//     );
// }

// function SettingScreen() {
//     return (
//         <View style={styles.screenContainer}>
//             <Text style={styles.screenText}>Setting Screen</Text>
//         </View>  
//     );
// }


// export default function MainNavigator() {
//     return (
//         <NavigationContainer>
//             <Drawer.Navigator
//                 screenOptions={{
//                     headerShown: false,
//                     drawerStyle: { backgroundColor: '#ffeedd', width: 250 },
//                     drawerActiveTintColor: '#3b5a9a',
//                     DrawerInactiveTintColor: '#000',
//                     drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' },
//                 }}>
//                 <Drawer.Screen 
//                     name="Home" 
//                     component={HomeScreen}
//                     options={{ 
//                         drawerIcon: ({ color }) => <Icon name="home" size={24} color={color} /> 
//                     }} />
//                 <Drawer.Screen 
//                     name="Game" 
//                     component={GameScreen}
//                     options={{
//                         drawerIcon: ({ color }) => <Icon name="gamepad" size={24} color={color} />
//                     }} />
//                 <Drawer.Screen
//                      name="Progress" 
//                      component={ProfileScreen}
//                      options={{ 
//                          drawerIcon: ({ color }) => <Icon name="person" size={24} color={color} />
//                      }} />
//                 <Drawer.Screen
//                      name="Settings"
//                      component={SettingsScreen} 
//                      options={{
//                          drawerIcon: ({ color }) => <Icon name="settings" size={24} color={color} />
//                      }} />
//             </Drawer.Navigator>
//         </NavigationContainer>
//     );
// } 


const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3b5a9a',
    },
});


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
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
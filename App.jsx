import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainNavigator from './src/navigations/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App
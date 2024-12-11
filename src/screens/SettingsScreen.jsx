import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Background from '../components/Background';

function SettingsScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Header title="Settings" navigation={navigation} />
            <Background>

            </Background>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
})

export default SettingsScreen
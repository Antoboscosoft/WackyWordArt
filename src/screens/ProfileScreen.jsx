import React from 'react'
import { StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';

function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Background>
            <Header title="Profile" navigation={navigation} />
            </Background>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ProfileScreen
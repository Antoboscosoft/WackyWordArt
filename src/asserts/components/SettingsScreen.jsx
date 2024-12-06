import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffefdd',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3b5a9a',
    },
})

export default SettingsScreen
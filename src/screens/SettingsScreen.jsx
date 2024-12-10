import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SettingsScreen({navigation}) {
    const insets= useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <View style={styles.circle}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>Settings Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffefdd',
    },
    backButton: {
        padding: 10
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3b5a9a',
        textAlign: 'center',
    },
})

export default SettingsScreen
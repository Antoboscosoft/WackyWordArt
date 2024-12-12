import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'

function Background({ children, style }) {
    return (
        <ImageBackground source={require('../assets/images/splash.jpeg')} style={[styles.backgroundImage, { ...style }]}>
            <View style={styles.container} >
                {children}
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0304065e',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
})

export default Background